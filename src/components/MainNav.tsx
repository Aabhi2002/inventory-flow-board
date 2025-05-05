
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">InventoryPro</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="font-medium transition-colors hover:text-primary">Dashboard</a>
          <a href="#" className="font-medium transition-colors hover:text-primary">Products</a>
          <a href="#" className="font-medium transition-colors hover:text-primary">Categories</a>
          <a href="#" className="font-medium transition-colors hover:text-primary">Reports</a>
          <a href="#" className="font-medium transition-colors hover:text-primary">Settings</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="sm">Import/Export</Button>
        </div>
      </div>
    </header>
  );
}
