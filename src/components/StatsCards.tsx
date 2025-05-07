import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/context/ProductContext";
import { Database, Import, Undo, Search } from "lucide-react";

export default function StatsCards() {
  const { products } = useProducts();
  
  // Calculate total inventory value
  const totalInventoryValue = products.reduce(
    (total, product) => total + (product.price * product.stock),
    0
  );
  
  // Count low stock items
  const lowStockCount = products.filter(p => p.stock < 10).length;
  
  // Count out of stock items
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  
  // Calculate total products
  const totalProducts = products.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Combined value of all products</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Import className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <Undo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowStockCount}</div>
          <p className="text-xs text-muted-foreground">Less than 10 units available</p>
        </CardContent>
      </Card>
      
      <Card className="bg-card transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          <Search className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{outOfStockCount}</div>
          <p className="text-xs text-muted-foreground">Products needing restock</p>
        </CardContent>
      </Card>
    </div>
  );
}
