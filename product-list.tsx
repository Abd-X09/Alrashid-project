import { useState } from "react";
import { ThumbsUp, ThumbsDown, Edit, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts, useVoteOnPrice } from "@/hooks/use-products";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import type { ProductWithPrices } from "@shared/schema";
import type { FilterState } from "@/types";

interface ProductListProps {
  filters: FilterState;
}

export function ProductList({ filters }: ProductListProps) {
  const { data: products = [], isLoading } = useProducts(filters.categoryId, filters.searchTerm);
  const { t, language } = useI18n();
  const { toast } = useToast();
  const voteOnPrice = useVoteOnPrice();

  const handleVote = async (priceId: string, isPositive: boolean) => {
    try {
      await voteOnPrice.mutateAsync({ priceId, isPositive });
      toast({
        title: isPositive ? "تم التصويت بالإيجاب" : "تم التصويت بالسلب",
        description: "شكراً لك على مساهمتك في تحسين دقة البيانات",
      });
    } catch (error) {
      toast({
        title: "خطأ في التصويت",
        description: "ربما تكون قد صوتت من قبل على هذا السعر",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const getPriceClass = (price: any, allPrices: any[]) => {
    if (!allPrices.length) return "bg-gray-50";
    
    const prices = allPrices.map(p => parseFloat(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const currentPrice = parseFloat(price.price);
    
    if (currentPrice === minPrice) return "bg-green-50";
    if (currentPrice === maxPrice) return "bg-red-50";
    return "bg-gray-50";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="glass-card animate-pulse rounded-2xl">
            <CardContent className="p-8">
              <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card className="glass-card rounded-2xl border-0">
      <CardContent className="p-8">
        <div className="border-b border-gray-200/30 pb-6 mb-8">
          <h2 className="text-2xl font-bold gradient-text">
            {language === 'ar' ? 'المنتجات الأساسية' : 'Essential Products'}
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            {language === 'ar' 
              ? 'مقارنة الأسعار من مناطق مختلفة حول العالم' 
              : 'Price comparison from different regions around the world'
            }
          </p>
        </div>

        <div className="space-y-6">
          {products.map((product: ProductWithPrices) => (
            <div key={product.id} className="glass-card rounded-xl p-6 hover-lift transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={language === 'ar' ? product.nameAr : product.nameEn}
                      className="w-16 h-16 rounded-lg object-cover"
                      data-testid={`product-image-${product.id}`}
                    />
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900" data-testid={`product-name-${product.id}`}>
                      {language === 'ar' ? product.nameAr : product.nameEn}
                    </h3>
                    <p className="text-sm text-gray-500" data-testid={`product-category-${product.id}`}>
                      {language === 'ar' ? product.category?.nameAr : product.category?.nameEn}
                    </p>
                    
                    {/* Price Comparison */}
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {product.prices.map((price) => (
                        <div
                          key={price.id}
                          className={`text-center p-2 rounded-md ${getPriceClass(price, product.prices)}`}
                          data-testid={`price-${price.id}`}
                        >
                          <p className="text-xs text-gray-600">
                            {language === 'ar' ? price.region?.nameAr : price.region?.nameEn}
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {parseFloat(price.price).toLocaleString()} {price.region?.currencySymbol}
                          </p>
                          {price.verified && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {language === 'ar' ? 'موثق' : 'Verified'}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <div className="flex">
                      {renderStars(parseFloat(product.rating || "0"))}
                    </div>
                    <span className="text-xs text-gray-500" data-testid={`product-rating-${product.id}`}>
                      {parseFloat(product.rating || "0").toFixed(1)}
                    </span>
                  </div>
                  
                  {/* Vote Buttons */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {product.prices.map((price) => (
                      <div key={price.id} className="flex space-x-1 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(price.id, true)}
                          disabled={voteOnPrice.isPending}
                          className="text-green-600 hover:text-green-700"
                          title={t('vote.accurate')}
                          data-testid={`vote-accurate-${price.id}`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(price.id, false)}
                          disabled={voteOnPrice.isPending}
                          className="text-red-600 hover:text-red-700"
                          title={t('vote.inaccurate')}
                          data-testid={`vote-inaccurate-${price.id}`}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-blue-700"
                          title={t('update.price')}
                          data-testid={`update-price-${price.id}`}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="pt-4 text-center border-t border-gray-200 mt-6">
          <Button
            variant="ghost"
            className="text-primary hover:text-blue-700 font-medium text-sm"
            data-testid="load-more-button"
          >
            {t('load.more')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
