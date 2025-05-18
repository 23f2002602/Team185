<<<<<<< HEAD
=======

>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
"use client";

import { useState, useEffect, useMemo } from "react";
import type { Product, ProductCategory } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/types";
import { Search, Filter } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");

  useEffect(() => {
<<<<<<< HEAD
    // Simulate API call or data fetching
=======
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
    setProducts(MOCK_PRODUCTS);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

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

<<<<<<< HEAD
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
=======
      <div className="mb-8 p-6 bg-card rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
              <Input
                id="search"
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
                className="pl-10"
=======
                className="pl-10 py-3 text-base"
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
                aria-label="Search products by title"
              />
            </div>
          </div>
          <div>
<<<<<<< HEAD
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
              Filter by Category
            </label>
             <div className="relative">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
=======
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Filter by Category
            </label>
             <div className="relative">
               <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}
              >
<<<<<<< HEAD
                <SelectTrigger id="category" className="pl-10" aria-label="Filter products by category">
=======
                <SelectTrigger id="category" className="pl-10 py-3 text-base" aria-label="Filter products by category">
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
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
