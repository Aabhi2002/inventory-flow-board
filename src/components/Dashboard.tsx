
import React from "react";
import FilterPanel from "./FilterPanel";
import ProductTable from "./ProductTable";
import CategoryChart from "./CategoryChart";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import MainNav from "./MainNav";
import ProductDetail from "./ProductDetail";
import { useProducts } from "@/context/ProductContext";

export default function Dashboard() {
  const { selectedProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">Inventory Management Dashboard</h1>
          <SearchBar />
        </div>
        
        <StatsCards />
        
        {/* Filters and Product Table Section */}
        <FilterPanel />
        
        {/* Product Table */}
        <div className="md:grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
          <div></div> {/* Empty div to align with filter panel */}
          <ProductTable onProductSelect={setSelectedProduct} />
        </div>
        
        {/* Category Chart */}
        <div className="md:grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mt-6">
          <div></div> {/* Empty div to align with filter panel */}
          <CategoryChart />
        </div>

        {/* Product Detail Drawer */}
        {selectedProduct && (
          <ProductDetail 
            productId={selectedProduct} 
            open={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </div>
  );
}
