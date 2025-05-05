
import { ProductProvider } from "@/context/ProductContext";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductProvider>
        <Dashboard />
      </ProductProvider>
    </div>
  );
};

export default Index;
