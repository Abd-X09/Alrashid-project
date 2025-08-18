import { ShoppingBasket, Globe, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStats } from "@/hooks/use-stats";
import { useI18n } from "@/lib/i18n";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export function StatsBar() {
  const { data: stats, isLoading } = useStats();
  const { t, language } = useI18n();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mx-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass-card animate-pulse rounded-2xl">
            <CardContent className="p-6">
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === 'ar' ? ar : enUS,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mx-4">
      <Card className="glass-card rounded-2xl hover-lift">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" data-testid="stats-total-products-label">
                {t('stats.total.products')}
              </p>
              <p className="text-3xl font-bold gradient-text" data-testid="stats-total-products-value">
                {stats?.totalProducts?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <ShoppingBasket className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" data-testid="stats-regions-label">
                {t('stats.regions.covered')}
              </p>
              <p className="text-2xl font-bold text-gray-900" data-testid="stats-regions-value">
                {stats?.totalRegions || 0}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Globe className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" data-testid="stats-last-update-label">
                {t('stats.last.update')}
              </p>
              <p className="text-lg font-bold text-gray-900" data-testid="stats-last-update-value">
                {stats?.lastUpdate ? formatLastUpdate(stats.lastUpdate) : t('time.hour.ago')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-full">
              <Clock className="h-5 w-5 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" data-testid="stats-accuracy-label">
                {t('stats.accuracy')}
              </p>
              <p className="text-2xl font-bold text-secondary" data-testid="stats-accuracy-value">
                {stats?.averageAccuracy ? `${stats.averageAccuracy}%` : '0%'}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <CheckCircle className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
