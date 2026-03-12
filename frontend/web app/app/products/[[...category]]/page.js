"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "../../../components/ProductCard"; // Προσοχή: Βάλαμε άλλο ένα ../ επειδή μπήκαμε σε πιο βαθύ φάκελο!
import { productsData } from "../../../data/product";

export default function ProductsPage() {
  const pathname = usePathname(); 
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- ΝΕΟ: Φιλτράρισμα Προϊόντων ανάλογα με το URL ---
  let filteredProducts = productsData;
  if (pathname.includes("/mens")) {
    filteredProducts = productsData.filter(p => p.category === "mens");
  } else if (pathname.includes("/womens")) {
    filteredProducts = productsData.filter(p => p.category === "womens");
  } else if (pathname.includes("/kids")) {
    filteredProducts = productsData.filter(p => p.category === "kids");
  } else if (pathname.includes("/accessories")) {
    filteredProducts = productsData.filter(p => p.category === "accessories");
  }

  // --- Λογική Σελιδοποίησης (Pagination) με βάση τα φιλτραρισμένα προϊόντα ---
  const PRODUCTS_PER_PAGE = 30;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const dictionary = {
    "products": "Προϊόντα",
    "mens": "Ανδρικά",
    "womens": "Γυναικεία",
    "kids": "Παιδικά",
    "shoes": "Παπούτσια",
    "clothing": "Ρούχα",
    "accessories": "Αξεσουάρ"
  };

  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  return (
    <div className="plp-container">
      
      {/* 1. Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">Αρχική</Link>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const translatedName = dictionary[segment] || segment;

          return (
            <span key={segment}>
              <span> - </span>
              {isLast ? (
                <span style={{ color: '#555' }}>{translatedName}</span>
              ) : (
                <Link href={href}>{translatedName}</Link>
              )}
            </span>
          );
        })}
      </div>

      {/* 2. Επικεφαλίδα */}
      <div className="plp-header">
        <h1 className="plp-title">
          {pathSegments.length > 1 ? dictionary[pathSegments[pathSegments.length - 1]] : "Όλα τα Προϊόντα"}
        </h1>
        <span className="plp-count">{filteredProducts.length}</span>
      </div>

      {/* 3. Layout */}
      <div className="plp-content">
        
        {/* ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ: ΦΙΛΤΡΑ */}
        <aside className="plp-sidebar">
          
          <div className="filter-group">
            <h3 className="filter-title">ΚΑΤΗΓΟΡΙΕΣ <i className="fa-solid fa-minus"></i></h3>
            <ul className="filter-list">
              {/* Αν το URL περιέχει "mens", δίνουμε την κλάση active-category */}
              <li className={pathname.includes("/mens") ? "active-category" : ""}>
                <Link href="/products/mens" style={{ textDecoration: 'none', color: 'inherit' }}>Ανδρικά</Link>
              </li>
              <li className={pathname.includes("/womens") ? "active-category" : ""}>
                <Link href="/products/womens" style={{ textDecoration: 'none', color: 'inherit' }}>Γυναικεία</Link>
              </li>
              <li className={pathname.includes("/kids") ? "active-category" : ""}>
                <Link href="/products/kids" style={{ textDecoration: 'none', color: 'inherit' }}>Παιδικά</Link>
              </li>
              <li className={pathname.includes("/accessories") ? "active-category" : ""}>
                <Link href="/products/accessories" style={{ textDecoration: 'none', color: 'inherit' }}>Αξεσουάρ</Link>
              </li>
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">ΦΥΛΟ <i className="fa-solid fa-chevron-up"></i></h3>
            <div className="filter-list">
              <label className="checkbox-item">
                <input type="checkbox" /> Ανδρικά <span className="count">(150)</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Γυναικεία <span className="count">(106)</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Αγόρι <span className="count">(25)</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Κορίτσι <span className="count">(24)</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">BRAND <i className="fa-solid fa-chevron-down"></i></h3>
            <div className="filter-list">
              <label className="checkbox-item">
                <input type="checkbox" /> Nike
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Adidas
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Asics
              </label>
              <label className="checkbox-item">
                <input type="checkbox" /> Puma
              </label>
            </div>
          </div>
        </aside>

        {/* ΔΕΞΙΑ ΣΤΗΛΗ: ΠΡΟΪΟΝΤΑ & PAGINATION */}
        <main className="plp-main">
          
          <div className="plp-toolbar">
            <select className="sort-dropdown">
              <option>Best Sellers</option>
              <option>Νέες Αφίξεις</option>
              <option>Τιμή: Αύξουσα</option>
              <option>Τιμή: Φθίνουσα</option>
            </select>
            
            <div className="pagination-container">
              <span className="pagination-text">Σελίδα</span>
              <div className="pagination-select-wrapper">
                <select 
                  className="pagination-select"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                >
                  {[...Array(totalPages)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <span className="pagination-text">από {totalPages}</span>
            </div>
          </div>

          <div className="plp-grid">
            {/* Εκτυπώνουμε τα currentProducts που είναι πλέον ΦΙΛΤΡΑΡΙΣΜΕΝΑ */}
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}