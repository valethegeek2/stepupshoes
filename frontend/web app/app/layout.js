import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// 1. Φέρνουμε τον Provider που φτιάξαμε
import { WishlistProvider } from "../context/WishlistContext";

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
        {/* 2. Αγκαλιάζουμε τα πάντα με τον Provider */}
        <WishlistProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}