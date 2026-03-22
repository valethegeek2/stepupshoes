import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "../context/CartContext";
// 1. Φέρνουμε τον AuthProvider
import { AuthProvider } from "../context/AuthContext"; 

export const metadata = {
  title: "Sportwear",
  description: "E-commerce sportswear store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {/* 2. Τον βάζουμε πρώτο-πρώτο */}
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}