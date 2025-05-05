
import React, { useState } from "react";
import { Bell, Menu, X, Home, Package, BarChart, Settings, FileDown, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNotificationsClick = () => {
    toast.info("No new notifications", {
      description: "You're all caught up!",
      duration: 3000,
    });
  };

  const handleImportExportClick = () => {
    toast.info("Feature coming soon", {
      description: "Import/Export functionality will be available in the next update.",
      duration: 3000,
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            InventoryPro
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNotificationsClick}
            className="relative transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          {/* Import/Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="transition-all hover:bg-primary hover:text-primary-foreground">
                Import/Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Data Management</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleImportExportClick}>
                <FileUp className="mr-2 h-4 w-4" /> Import Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleImportExportClick}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
              <Home className="mr-3 h-4 w-4" /> Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
              <Package className="mr-3 h-4 w-4" /> Products
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
              <BarChart className="mr-3 h-4 w-4" /> Reports
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
              <Settings className="mr-3 h-4 w-4" /> Settings
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
