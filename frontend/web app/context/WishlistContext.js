"use client";
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Συνάρτηση που βάζει ή βγάζει ένα προϊόν από τη λίστα
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id); // Αν υπάρχει, το βγάζει
      } else {
        return [...prev, product]; // Αν δεν υπάρχει, το βάζει
      }
    });
  };

  // Συνάρτηση για διαγραφή (για το κουμπί 'Αφαίρεση' στη σελίδα της Wishlist)
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Ένα μικρό "εργαλείο" για να το καλούμε εύκολα από άλλα αρχεία
export function useWishlist() {
  return useContext(WishlistContext);
}