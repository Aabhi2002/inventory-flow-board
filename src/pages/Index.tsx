
import { ProductProvider } from "@/context/ProductContext";
import Dashboard from "@/components/Dashboard";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductProvider>
        <Dashboard />
        <SonnerToaster />
      </ProductProvider>
    </div>
  );
};

export default Index;
