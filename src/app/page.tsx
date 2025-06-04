
"use client";

import * as React from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProductCard } from '@/components/product-card';
import { ProductFilters, type Filters } from '@/components/product-filters';
import { AIProductSuggestions } from '@/components/ai-product-suggestions';
import { mockProducts } from '@/data/mock-products';
import type { Product } from '@/types';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const defaultFilters: Filters = {
  category: 'All',
  priceMin: '',
  priceMax: '',
  condition: 'All',
  location: 'Any',
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<Filters>(defaultFilters);
  const [browsingHistory, setBrowsingHistory] = React.useState<string[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (filters: Filters) => {
    setActiveFilters(filters);
  };

  const handleAddToHistory = (productName: string) => {
    setBrowsingHistory(prev => {
        // Avoid duplicate entries if user clicks multiple times
        if (prev.includes(productName)) return prev;
        const newHistory = [...prev, productName];
        // Keep history to a reasonable length, e.g., last 10 items
        return newHistory.slice(-10);
    });
  };

  const filteredProducts = React.useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
      const matchesCategory = activeFilters.category === 'All' || product.category === activeFilters.category;
      const matchesCondition = activeFilters.condition === 'All' || product.condition === activeFilters.condition;
      const matchesLocation = activeFilters.location === 'Any' || product.location === activeFilters.location;
      
      const priceMin = parseFloat(activeFilters.priceMin);
      const priceMax = parseFloat(activeFilters.priceMax);
      const matchesPriceMin = isNaN(priceMin) || product.price >= priceMin;
      const matchesPriceMax = isNaN(priceMax) || product.price <= priceMax;

      return matchesSearch && matchesCategory && matchesCondition && matchesLocation && matchesPriceMin && matchesPriceMax;
    });
  }, [searchQuery, activeFilters]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onSearchChange={handleSearchChange} initialSearchQuery={searchQuery} />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          {/* Hero Section Placeholder - Can be added later */}
          <section className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
              Discover Pre-Loved Treasures
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
              Find unique second-hand items at great prices. Your next find is waiting!
            </p>
          </section>
          
          <ProductFilters onFilterChange={handleFilterChange} initialFilters={activeFilters} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-semibold mb-6 font-headline">Featured Products</h2>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} onAddToHistory={handleAddToHistory} />
                  ))}
                </div>
              ) : (
                <Alert variant="default" className="bg-secondary">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-headline">No Products Found</AlertTitle>
                  <AlertDescription className="font-body">
                    Try adjusting your search or filter criteria.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <aside className="lg:col-span-1 space-y-6">
              <AIProductSuggestions browsingHistory={browsingHistory} />
              {/* Other sidebar content can go here, e.g., featured categories, promotions */}
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
