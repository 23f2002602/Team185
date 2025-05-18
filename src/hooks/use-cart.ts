
"use client";

import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback } from "react";

const CART_STORAGE_KEY = "loopmartUserCart";

export function useCart() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isCartLoaded && typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          // For now, we don't handle quantity, so we just inform the user.
          // If quantity was a feature, we'd increment it here.
          toast({
            title: "Already in Cart",
            description: `${product.title} is already in your cart.`,
          });
          return prevItems;
        }
        toast({
          title: "Added to Cart",
          description: `${product.title} has been added to your cart.`,
        });
        return [...prevItems, product];
      });
    },
    [toast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((prevItems) => {
        const itemToRemove = prevItems.find(item => item.id === productId);
        if (itemToRemove) {
          toast({
            title: "Removed from Cart",
            description: `${itemToRemove.title} has been removed from your cart.`,
            variant: "destructive"
          });
        }
        return prevItems.filter((item) => item.id !== productId);
      });
    },
    [toast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  }, [toast]);
  
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  const cartCount = cartItems.length;

  return {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    cartCount,
    isCartLoaded,
    clearCart,
  };
}
