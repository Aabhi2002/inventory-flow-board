
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Toys",
  "Health & Beauty"
];

export const initialProducts: Product[] = [
  { id: "1", name: "Laptop Pro", category: "Electronics", price: 1299.99, stock: 8 },
  { id: "2", name: "Wireless Headphones", category: "Electronics", price: 149.99, stock: 24 },
  { id: "3", name: "Smart Watch", category: "Electronics", price: 249.99, stock: 15 },
  { id: "4", name: "Cotton T-shirt", category: "Clothing", price: 19.99, stock: 100 },
  { id: "5", name: "Denim Jeans", category: "Clothing", price: 49.99, stock: 45 },
  { id: "6", name: "Winter Jacket", category: "Clothing", price: 89.99, stock: 12 },
  { id: "7", name: "Coffee Machine", category: "Home & Kitchen", price: 79.99, stock: 7 },
  { id: "8", name: "Blender", category: "Home & Kitchen", price: 39.99, stock: 18 },
  { id: "9", name: "Basketball", category: "Sports", price: 29.99, stock: 22 },
  { id: "10", name: "Yoga Mat", category: "Sports", price: 24.99, stock: 30 },
  { id: "11", name: "Novel Collection", category: "Books", price: 59.99, stock: 5 },
  { id: "12", name: "Programming Guide", category: "Books", price: 34.99, stock: 14 },
  { id: "13", name: "Action Figure", category: "Toys", price: 14.99, stock: 25 },
  { id: "14", name: "Board Game", category: "Toys", price: 24.99, stock: 9 },
  { id: "15", name: "Face Cream", category: "Health & Beauty", price: 18.99, stock: 32 },
  { id: "16", name: "Electric Toothbrush", category: "Health & Beauty", price: 49.99, stock: 11 },
  { id: "17", name: "Smartphone", category: "Electronics", price: 899.99, stock: 16 },
  { id: "18", name: "Dress Shirt", category: "Clothing", price: 34.99, stock: 28 },
  { id: "19", name: "Cooking Pot Set", category: "Home & Kitchen", price: 129.99, stock: 6 },
  { id: "20", name: "Tennis Racket", category: "Sports", price: 59.99, stock: 13 },
  { id: "21", name: "Science Fiction Book", category: "Books", price: 19.99, stock: 20 },
  { id: "22", name: "Building Blocks", category: "Toys", price: 29.99, stock: 27 },
  { id: "23", name: "Shampoo", category: "Health & Beauty", price: 9.99, stock: 40 },
  { id: "24", name: "Tablet", category: "Electronics", price: 399.99, stock: 10 },
];
