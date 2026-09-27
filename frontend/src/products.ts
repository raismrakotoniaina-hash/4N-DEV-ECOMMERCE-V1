// Demo catalog. Replace names, prices and images with real client products.
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  icon: string;
  image?: string;
  featured?: boolean;
};

export const products: Product[] = [
  { id: 1, name: "Smartphone Pro", price: 899000, category: "Téléphones", icon: "📱", featured: true },
  { id: 2, name: "Écouteurs Air", price: 149000, category: "Audio", icon: "🎧", featured: true },
  { id: 3, name: "Smart Watch X", price: 249000, category: "Accessoires", icon: "⌚" },
  { id: 4, name: "Laptop Pro", price: 2890000, category: "Ordinateurs", icon: "💻", featured: true },
  { id: 5, name: "Clavier RGB", price: 189000, category: "Gaming", icon: "⌨️" },
  { id: 6, name: "Souris Gaming", price: 99000, category: "Gaming", icon: "🖱️" },
];
