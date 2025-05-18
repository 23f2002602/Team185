
"use client";

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
    </div>
  );
}
