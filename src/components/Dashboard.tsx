
import React from "react";
import FilterPanel from "./FilterPanel";
import ProductTable from "./ProductTable";
import CategoryChart from "./CategoryChart";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management Dashboard</h1>
      
      {/* Filters and Product Table Section */}
      <FilterPanel />
      
      {/* Product Table */}
      <div className="md:grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
        <div></div> {/* Empty div to align with filter panel */}
        <ProductTable />
      </div>
      
      {/* Category Chart */}
      <div className="md:grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mt-6">
        <div></div> {/* Empty div to align with filter panel */}
        <CategoryChart />
      </div>
    </div>
  );
}
