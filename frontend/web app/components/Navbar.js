"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useWishlist } from "../context/WishlistContext"; 
import { useCart } from "../context/CartContext.js";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname(); 
  const router = useRouter(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  // Hide navbar on auth routes
  const hideOnRoutes = ["/signin", "/signup", "/forgot-password"];
  if (hideOnRoutes.includes(pathname)) {
    return null; 
  }

  const closeMenu = () => setIsMenuOpen(false);

  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.length || 0; 
  const displayWishlist = wishlistCount > 9 ? "9+" : wishlistCount;

  const { cartCount } = useCart();
  const displayCart = cartCount > 9 ? "9+" : cartCount;

  const { user, logout } = useAuth();

  // Handle product search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); 
    }
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <Link href="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <h1>Sportwear</h1>
        </Link>
        <button 
          className="products-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i> ΠΡΟΪΟΝΤΑ
        </button>
      </div>
      
      {/* Search Bar */}
      <form className="search-container" onSubmit={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="nav-right">
        
        {user && user.role === "admin" && (
          <Link href="/admin/products" className="nav-icon-wrapper" onClick={closeMenu} title="Επεξεργασία Προϊόντων">
            <i className="fa-solid fa-pen-to-square" style={{ color: "#f59e0b" }}></i>
          </Link>
        )}

        <Link href="/orders" className="nav-icon-wrapper" onClick={closeMenu} title="Οι Παραγγελίες μου">
          <i className="fa-solid fa-box-open"></i>
        </Link>

        <Link href="/wishlist" className="nav-icon-wrapper" onClick={closeMenu}>
          <i className="fa-regular fa-heart"></i>
          {wishlistCount > 0 && <span className="icon-badge">{displayWishlist}</span>}
        </Link>

        <Link href="/cart" className="nav-icon-wrapper" onClick={closeMenu}>
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="icon-badge">{displayCart}</span>}
        </Link>

        {user ? (
          <div className="user-menu-container">
            <button className="nav-icon-wrapper" style={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none' }} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <i className="fa-regular fa-user"></i>
            </button>
            
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <p className="dropdown-username">Hello, <strong>{user.username}</strong></p>
                <button 
                  className="dropdown-logout-btn" 
                  onClick={() => { 
                    logout(); 
                    setIsUserMenuOpen(false); 
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" style={{ textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '16px' }} onClick={closeMenu}>
              Sign In
            </Link>
            <Link href="/signup" className="sign-up-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }} onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Main Navigation Menu */}
      <div className={`mega-menu-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mega-menu-sidebar">
            <li className="mega-menu-item">
                <Link href="/products/shoes" className="mega-menu-link" onClick={closeMenu}>
                  ΠΑΠΟΥΤΣΙΑ
                </Link>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/clothing" className="mega-menu-link" onClick={closeMenu}>
                  ΡΟΥΧΑ
                </Link>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/gym-equipment" className="mega-menu-link" onClick={closeMenu}>
                  ΟΡΓΑΝΑ ΓΥΜΝΑΣΤΙΚΗΣ
                </Link>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/accessories" className="mega-menu-link" onClick={closeMenu}>
                  ΑΞΕΣΟΥΑΡ
                </Link>
            </li>
        </ul>
      </div>
    </div>
  );
}