import { useState } from "react";
import { Search, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
}

export function Header({ searchTerm, onSearchChange, onAddProduct }: HeaderProps) {
  const { language, setLanguage, t } = useI18n();
  const [currency, setCurrency] = useState("USD");

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'الراشد' : 'Al-Rashid'}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {language === 'ar' ? 'مقارن الأسعار العالمي' : 'Global Price Comparator'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-12 h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 shadow-sm transition-all duration-200"
                data-testid="search-input"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-2 space-x-reverse h-12 px-4 rounded-xl hover:bg-gray-100 transition-colors"
              data-testid="language-toggle"
            >
              <Globe className="h-5 w-5" />
              <span className="font-medium">{t('language.toggle')}</span>
            </Button>
            
            {/* Currency Selector */}
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24 h-12 rounded-xl border-2 border-gray-200" data-testid="currency-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="SAR">SAR</SelectItem>
                <SelectItem value="AED">AED</SelectItem>
                <SelectItem value="EGP">EGP</SelectItem>
                <SelectItem value="MAD">MAD</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Product Button */}
            <Button
              onClick={onAddProduct}
              className="flex items-center space-x-2 space-x-reverse h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              data-testid="add-product-button"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">{t('add.product')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
