"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWishlist } from "../context/WishlistContext"; 
import { useCart } from "../context/CartContext.js";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
      
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search products..." />
      </div>

      <div className="nav-right">
        
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
                
                {/* ΑΦΑΙΡΕΘΗΚΕ ΤΟ MY ORDERS ΑΠΟ ΕΔΩ! */}

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

      {/* Mega Menu */}
      <div className={`mega-menu-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mega-menu-sidebar">
            <li className="mega-menu-item">
                <Link href="/products/mens" className="mega-menu-link" onClick={closeMenu}>
                  ΑΝΔΡΙΚΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΑΝΔΡΙΚΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li><Link href="/products/mens" onClick={closeMenu}>Παπούτσια</Link></li>
                        <li><Link href="/products/mens" onClick={closeMenu}>Ρούχα</Link></li>
                        <li><Link href="/products/mens" onClick={closeMenu}>Αξεσουάρ</Link></li>
                    </ul>
                </div>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/womens" className="mega-menu-link" onClick={closeMenu}>
                  ΓΥΝΑΙΚΕΙΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΓΥΝΑΙΚΕΙΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li><Link href="/products/womens" onClick={closeMenu}>Παπούτσια</Link></li>
                        <li><Link href="/products/womens" onClick={closeMenu}>Ρούχα</Link></li>
                        <li><Link href="/products/womens" onClick={closeMenu}>Αξεσουάρ</Link></li>
                    </ul>
                </div>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/kids" className="mega-menu-link" onClick={closeMenu}>
                  ΠΑΙΔΙΚΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΠΑΙΔΙΚΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li><Link href="/products/kids" onClick={closeMenu}>Αγόρι παπούτσια</Link></li>
                        <li><Link href="/products/kids" onClick={closeMenu}>Αγόρι ρούχα</Link></li>
                        <li><Link href="/products/kids" onClick={closeMenu}>Κορίτσι παπούτσια</Link></li>
                        <li><Link href="/products/kids" onClick={closeMenu}>Κορίτσι ρούχα</Link></li>
                    </ul>
                </div>
            </li>
            <li className="mega-menu-item">
                <Link href="/products/accessories" className="mega-menu-link" onClick={closeMenu}>
                  ΑΞΕΣΟΥΑΡ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΑΞΕΣΟΥΑΡ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li><Link href="/products/accessories" onClick={closeMenu}>Όργανα Γυμναστικής</Link></li>
                        <li><Link href="/products/accessories" onClick={closeMenu}>Τσάντες - Σακίδια</Link></li>
                        <li><Link href="/products/accessories" onClick={closeMenu}>Μπουκάλια | Θερμός | Shaker</Link></li>
                        <li><Link href="/products/accessories" onClick={closeMenu}>Ποδόσφαιρο | Soccer</Link></li>
                        <li><Link href="/products/accessories" onClick={closeMenu}>Μπάσκετ | Basket</Link></li>
                    </ul>
                </div>
            </li>
        </ul>
      </div>
    </div>
  );
}