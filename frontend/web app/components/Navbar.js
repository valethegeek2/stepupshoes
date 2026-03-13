"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Μια μικρή συνάρτηση για να κλείνει το μενού όταν πατάμε ένα link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="nav">
      <div className="nav-left">
        {/* Κάνοντας κλικ στο Logo θα πηγαίνει στην Αρχική (/) */}
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
        <i className="fa-regular fa-heart"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <p>Sign In</p>
        <button className="sign-up-btn">Sign Up</button>
      </div>

      {/* Mega Menu */}
      <div className={`mega-menu-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mega-menu-sidebar">
            
            {/* ================= ΑΝΔΡΙΚΑ ================= */}
            <li className="mega-menu-item">
                <Link href="/products/mens" className="mega-menu-link" onClick={closeMenu}>
                  ΑΝΔΡΙΚΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΑΝΔΡΙΚΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li>
                            <Link href="/products/mens/shoes" onClick={closeMenu}>Παπούτσια</Link>
                        </li>
                        <li>
                            <Link href="/products/mens/clothing" onClick={closeMenu}>Ρούχα</Link>
                        </li>
                        <li>
                            <Link href="/products/mens/accessories" onClick={closeMenu}>Αξεσουάρ</Link>
                        </li>
                        <li>
                            <Link href="/products/mens/brands" onClick={closeMenu}>Brands</Link>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ================= ΓΥΝΑΙΚΕΙΑ ================= */}
            <li className="mega-menu-item">
                <Link href="/products/womens" className="mega-menu-link" onClick={closeMenu}>
                  ΓΥΝΑΙΚΕΙΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΓΥΝΑΙΚΕΙΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li>
                            <Link href="/products/womens/shoes" onClick={closeMenu}>Παπούτσια</Link>
                        </li>
                        <li>
                            <Link href="/products/womens/clothing" onClick={closeMenu}>Ρούχα</Link>
                        </li>
                        <li>
                            <Link href="/products/womens/accessories" onClick={closeMenu}>Αξεσουάρ</Link>
                        </li>
                        <li>
                            <Link href="/products/womens/brands" onClick={closeMenu}>Brands</Link>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ================= ΠΑΙΔΙΚΑ ================= */}
            <li className="mega-menu-item">
                <Link href="/products/kids" className="mega-menu-link" onClick={closeMenu}>
                  ΠΑΙΔΙΚΑ <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <div className="mega-menu-subpanel">
                    <h3 className="subpanel-title">ΠΑΙΔΙΚΑ <i className="fa-solid fa-chevron-right"></i></h3>
                    <ul className="subpanel-list">
                        <li>
                            <Link href="/products/kids/shoes" onClick={closeMenu}>Αγόρι παπούτσια</Link>
                        </li>
                        <li>
                            <Link href="/products/kids/clothing" onClick={closeMenu}>Αγόρι ρούχα</Link>
                        </li>
                        <li>
                            <Link href="/products/kids/accessories" onClick={closeMenu}>Αγόρι αξεσουάρ</Link>
                        </li>
                        <li>
                            <Link href="/products/kids/shoes" onClick={closeMenu}>Κορίτσι παπούτσια</Link>
                        </li>
                        <li>
                            <Link href="/products/kids/clothing" onClick={closeMenu}>Κορίτσι ρούχα</Link>
                        </li>
                    </ul>
                </div>
            </li>

            {/* ================= ΑΞΕΣΟΥΑΡ ================= */}
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