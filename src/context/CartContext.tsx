import { createContext, useContext, useState} from "react";
import type { Product } from "@/types/product";

//define tipe data dan value utk isi context
interface CartContextType {
  cart: Product[];
  isUpdating: boolean;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, delta: number) => Promise<void>;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // array dari product type
  const [cart, setCart] = useState<Product[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // defaine product type utk parameter product
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = async (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id 
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } 
          : item
      )
    );
    
    setIsUpdating(true);
    await new Promise((res) => setTimeout(res, 500));
    setIsUpdating(false);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, isUpdating }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};