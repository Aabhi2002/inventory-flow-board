
import React from "react";
import { useProducts } from "@/context/ProductContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit, FileText } from "lucide-react";

interface ProductDetailProps {
  productId: string;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetail({ productId, open, onClose }: ProductDetailProps) {
  const { products } = useProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return null;
  
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const stockStatus = product.stock === 0 
    ? "Out of Stock" 
    : product.stock < 10 
      ? "Low Stock" 
      : "In Stock";
      
  const stockStatusClass = product.stock === 0 
    ? "text-red-500" 
    : product.stock < 10 
      ? "text-amber-500" 
      : "text-green-500";

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Product Details
          </SheetTitle>
          <SheetDescription>
            View detailed information about this product.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>ID: {product.id.substring(0, 8)}...</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">Category</h3>
              <p className="text-base">{product.category}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Price</h3>
              <p className="text-base">${product.price.toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Stock</h3>
              <p className="text-base flex items-center gap-2">
                {product.stock} units
                <span className={`font-medium ${stockStatusClass}`}>
                  ({stockStatus})
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Stock Value</h3>
              <p className="text-base">${(product.price * product.stock).toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">SKU</h3>
              <p className="text-base">SKU-{product.id.substring(0, 6).toUpperCase()}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Last Updated</h3>
              <p className="text-base text-muted-foreground">{lastUpdated}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full" variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
