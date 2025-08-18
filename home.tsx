import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { FilterBar } from "@/components/filter-bar";
import { StatsBar } from "@/components/stats-bar";
import { ProductList } from "@/components/product-list";
import { Sidebar } from "@/components/sidebar";
import { AddProductModal } from "@/components/add-product-modal";
import { useI18n } from "@/lib/i18n";
import type { FilterState, ViewMode } from "@/types";

export default function Home() {
  const { language } = useI18n();
  const [filters, setFilters] = useState<FilterState>({});
  const [viewMode, setViewMode] = useState<ViewMode['mode']>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  // Set initial language direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm: searchTerm || undefined }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm={filters.searchTerm || ""}
        onSearchChange={handleSearchChange}
        onAddProduct={() => setShowAddModal(true)}
      />
      
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StatsBar />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductList filters={filters} />
          </div>
          
          <div>
            <Sidebar />
          </div>
        </div>
      </main>

      <AddProductModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
}
