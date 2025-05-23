import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import CategoryForm from "./CategoryForm";

export default function FilterPanel() {
  const { products, categories, setFilteredProducts } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...products];
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by stock availability
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategories, inStockOnly, setFilteredProducts]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  // Count products in each category
  const getCategoryCount = (category: string) => {
    return products.filter(product => product.category === category).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center md:hidden">
        <h2 className="text-2xl font-bold">Filters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={() => setIsCategoryFormOpen(true)}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Category
        </Button>
      </div>
      
      <Card className="h-fit">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-lg">Filters</h2>
              <div className="hidden md:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => setIsCategoryFormOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Category
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium flex justify-between items-center">
                <span>Categories</span>
                {selectedCategories.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-blue-500"
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="flex-1 flex justify-between items-center text-sm cursor-pointer"
                    >
                      {category}
                      <Badge variant="outline">{getCategoryCount(category)}</Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 pt-2 border-t">
              <div className="font-medium">Stock</div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="in-stock-only" className="text-sm cursor-pointer">Show in-stock products only</Label>
                <Switch 
                  id="in-stock-only" 
                  checked={inStockOnly} 
                  onCheckedChange={setInStockOnly} 
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleClearFilters}
                disabled={selectedCategories.length === 0 && !inStockOnly}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Category Form Dialog */}
      <CategoryForm 
        isOpen={isCategoryFormOpen} 
        onClose={() => setIsCategoryFormOpen(false)} 
      />
    </div>
  );
}
