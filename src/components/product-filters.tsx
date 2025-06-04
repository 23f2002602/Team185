
"use client";

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import type { ProductCondition } from '@/types';
import { productCategories, productConditions, productLocations } from '@/data/mock-products';
import { FilterX } from 'lucide-react';

export interface Filters {
  category: string;
  priceMin: string;
  priceMax: string;
  condition: string;
  location: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void;
  initialFilters: Filters;
}

export function ProductFilters({ onFilterChange, initialFilters }: ProductFiltersProps) {
  const [filters, setFilters] = React.useState<Filters>(initialFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const resetFilters = () => {
    const defaultFilters: Filters = {
        category: 'All',
        priceMin: '',
        priceMax: '',
        condition: 'All',
        location: 'Any',
      };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  }

  return (
    <div className="p-4 md:p-6 bg-card border rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        <div>
          <Label htmlFor="category" className="font-headline">Category</Label>
          <Select name="category" value={filters.category} onValueChange={handleSelectChange('category')}>
            <SelectTrigger id="category" aria-label="Filter by category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div>
                <Label htmlFor="priceMin" className="font-headline">Min Price</Label>
                <Input type="number" name="priceMin" id="priceMin" placeholder="e.g., 10" value={filters.priceMin} onChange={handleInputChange} aria-label="Minimum price"/>
            </div>
            <div>
                <Label htmlFor="priceMax" className="font-headline">Max Price</Label>
                <Input type="number" name="priceMax" id="priceMax" placeholder="e.g., 100" value={filters.priceMax} onChange={handleInputChange} aria-label="Maximum price"/>
            </div>
        </div>
        
        <div>
          <Label htmlFor="condition" className="font-headline">Condition</Label>
          <Select name="condition" value={filters.condition} onValueChange={handleSelectChange('condition')}>
            <SelectTrigger id="condition" aria-label="Filter by condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {productConditions.map(cond => (
                <SelectItem key={cond} value={cond}>{cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location" className="font-headline">Location</Label>
           <Select name="location" value={filters.location} onValueChange={handleSelectChange('location')}>
            <SelectTrigger id="location" aria-label="Filter by location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {productLocations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={resetFilters} variant="outline" className="w-full xl:w-auto">
            <FilterX className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </div>
  );
}

