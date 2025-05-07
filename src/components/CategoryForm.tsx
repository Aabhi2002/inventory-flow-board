import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useProducts } from "@/context/ProductContext";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, onClose }) => {
  const { addCategory } = useProducts();
  const [categoryName, setCategoryName] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    addCategory(categoryName.trim());
    setCategoryName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category Name</Label>
            <Input
              id="category"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (error) setError("");
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm; 