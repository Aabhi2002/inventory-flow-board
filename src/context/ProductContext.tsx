
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, initialProducts, categories } from "../data/mockData";
import { toast } from "@/components/ui/sonner";

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProducts: (ids: string[]) => void;
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  categoryData: { name: string; count: number }[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; count: number }[]>([]);

  // Generate category data for the chart
  useEffect(() => {
    const categoryCount = categories.map(category => {
      const count = products.filter(product => product.category === category).length;
      return { name: category, count };
    });
    setCategoryData(categoryCount);
  }, [products]);

  // Add a new product
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 11),
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast.success("Product added successfully!");
  };

  // Update an existing product
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success("Product updated successfully!");
  };

  // Delete one or more products
  const deleteProducts = (ids: string[]) => {
    setProducts(prev => prev.filter(product => !ids.includes(product.id)));
    setSelectedProducts([]);
    toast.success(`${ids.length} product(s) deleted successfully!`);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        addProduct,
        updateProduct,
        deleteProducts,
        categories,
        selectedProducts,
        setSelectedProducts,
        categoryData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
