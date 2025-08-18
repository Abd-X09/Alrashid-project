import { Grid3X3, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCategories, useRegions } from "@/hooks/use-stats";
import { useI18n } from "@/lib/i18n";
import type { FilterState, ViewMode } from "@/types";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  viewMode: ViewMode['mode'];
  onViewModeChange: (mode: ViewMode['mode']) => void;
}

export function FilterBar({ filters, onFiltersChange, viewMode, onViewModeChange }: FilterBarProps) {
  const { t, language } = useI18n();
  const { data: categories = [] } = useCategories();
  const { data: regions = [] } = useRegions();

  return (
    <div className="glass-card border-0 rounded-2xl mx-4 my-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
        <div className="flex flex-wrap items-center gap-6">
          {/* Categories */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Label className="text-sm font-medium text-gray-700">
              {language === 'ar' ? 'الفئة:' : 'Category:'}
            </Label>
            <Select
              value={filters.categoryId || "all"}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, categoryId: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger className="w-52 h-12 rounded-xl border-2 border-gray-200 bg-white/80" data-testid="category-filter">
                <SelectValue placeholder={t('category.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('category.all')}</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {language === 'ar' ? category.nameAr : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Regions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Label className="text-sm font-medium text-gray-700">
              {language === 'ar' ? 'المنطقة:' : 'Region:'}
            </Label>
            <Select
              value={filters.regionId || "all"}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, regionId: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger className="w-52 h-12 rounded-xl border-2 border-gray-200 bg-white/80" data-testid="region-filter">
                <SelectValue placeholder={t('region.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('region.all')}</SelectItem>
                {regions.map((region: any) => (
                  <SelectItem key={region.id} value={region.id}>
                    {language === 'ar' ? region.nameAr : region.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Label className="text-sm font-medium text-gray-700">
              {language === 'ar' ? 'النطاق السعري:' : 'Price Range:'}
            </Label>
            <div className="w-32">
              <Slider
                value={filters.priceRange || [0, 1000]}
                onValueChange={(value) => 
                  onFiltersChange({ ...filters, priceRange: value as [number, number] })
                }
                max={1000}
                step={10}
                className="w-full"
                data-testid="price-range-slider"
              />
            </div>
            <span className="text-xs text-gray-500">
              ${filters.priceRange?.[0] || 0}-${filters.priceRange?.[1] || 1000}
            </span>
          </div>

          {/* View Toggle */}
          <div className="mr-auto flex items-center space-x-2 space-x-reverse">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              data-testid="grid-view-button"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('map')}
              data-testid="map-view-button"
            >
              <Map className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              data-testid="list-view-button"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
