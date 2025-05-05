
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/context/ProductContext";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, setFilteredProducts } = useProducts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
      // Reset to show all products if search is cleared
      setFilteredProducts(products);
      return;
    }
    
    // Filter products by name, category, or price
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.category.toLowerCase().includes(term) || 
      product.price.toString().includes(term)
    );
    
    setFilteredProducts(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredProducts(products);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
      {searchTerm && (
        <Button variant="outline" type="button" onClick={handleClear}>
          Clear
        </Button>
      )}
    </form>
  );
}
