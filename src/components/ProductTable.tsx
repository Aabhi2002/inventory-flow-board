
import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Product } from "@/data/mockData";
import { ArrowUp, ArrowDown, Bell, Edit, Trash2 } from "lucide-react";
import ProductForm from "./ProductForm";

const LOW_STOCK_THRESHOLD = 10;
const PAGE_SIZE = 7;

export default function ProductTable() {
  const { filteredProducts, deleteProducts, selectedProducts, setSelectedProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBatchDeleteDialogOpen, setIsBatchDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  
  // Sort and paginate products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "name" || sortField === "category") {
      return sortDirection === "asc" 
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    } else {
      const aValue = Number(a[sortField]);
      const bValue = Number(b[sortField]);
      return sortDirection === "asc" 
        ? aValue - bValue
        : bValue - aValue;
    }
  });

  // Get current page products
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset to first page when filtered products change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  // Handle sort
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle row selection
  const handleSelectRow = (id: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(id)) {
        return prev.filter(productId => productId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle select all on current page
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentIds = currentProducts.map(product => product.id);
      setSelectedProducts(prev => {
        const existingSelected = prev.filter(id => !currentIds.includes(id));
        return [...existingSelected, ...currentIds];
      });
    } else {
      const currentIds = currentProducts.map(product => product.id);
      setSelectedProducts(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  // Check if all current page items are selected
  const areAllSelected = currentProducts.length > 0 && 
    currentProducts.every(product => selectedProducts.includes(product.id));

  // Delete a single product
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProducts([productToDelete]);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Delete multiple products
  const handleBatchDeleteConfirm = () => {
    if (selectedProducts.length > 0) {
      deleteProducts(selectedProducts);
      setIsBatchDeleteDialogOpen(false);
    }
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={areAllSelected && currentProducts.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Name
                  {sortField === "name" && (
                    sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  Category
                  {sortField === "category" && (
                    sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                <div className="flex items-center justify-end">
                  Price
                  {sortField === "price" && (
                    sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("stock")}>
                <div className="flex items-center justify-end">
                  Stock
                  {sortField === "stock" && (
                    sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectRow(product.id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {product.stock}
                      {product.stock < LOW_STOCK_THRESHOLD && (
                        <Bell className="ml-1 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setProductToDelete(product.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* Product Form Dialog */}
      {isProductFormOpen && (
        <ProductForm 
          product={editingProduct || undefined} 
          isOpen={isProductFormOpen} 
          onClose={() => {
            setIsProductFormOpen(false);
            setEditingProduct(null);
          }} 
        />
      )}
      
      {/* Single Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Batch Delete Confirmation Dialog */}
      <AlertDialog open={isBatchDeleteDialogOpen} onOpenChange={setIsBatchDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete multiple products?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedProducts.length} selected products.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBatchDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Batch Actions */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Products</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete these products?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Floating action button for batch delete */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-lg p-3 border">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {selectedProducts.length} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBatchDeleteDialogOpen(true)}
            >
              Delete Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProducts([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
