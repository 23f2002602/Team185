
"use client";

<<<<<<< HEAD
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
=======
import { useState, useEffect, useMemo } from "react";
import type { Product, ProductCategory } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Import Button
import { PRODUCT_CATEGORIES } from "@/types";
import { Search, Filter } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesSearchTerm && matchesCategory;
    });
  }, [products, searchTerm, selectedCategories]);

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(category);
      if (isSelected) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover Sustainable Finds
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground sm:mt-6">
          Browse our collection of pre-loved items and contribute to a circular economy.
        </p>
      </header>

      <div className="mb-8 p-6 bg-card rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base"
                aria-label="Search products by title"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center">
              <Filter className="h-5 w-5 text-muted-foreground mr-2" />
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2 pt-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  size="sm"
                  className="text-sm"
                  aria-pressed={selectedCategories.includes(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
>>>>>>> 23315374c4ecbe8458f38a8a8a1a48c3843132b6
    </div>
  );
}
