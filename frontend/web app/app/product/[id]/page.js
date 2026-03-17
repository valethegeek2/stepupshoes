"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // 1. Νέο εργαλείο για να διαβάζουμε το URL σωστά
import { productsData } from "../../../data/product";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext.js";
import { useWishlist } from "../../../context/WishlistContext";

export default function ProductDetailsPage() {
  const params = useParams(); // 2. Παίρνουμε το ID έτσι
  const productId = params?.id;

  // 3. Το κόλπο: Μετατρέπουμε και τα δύο σε String για να είμαστε 100% σίγουροι ότι θα ταιριάξουν!
  const product = productsData.find((p) => String(p.id) === String(productId));

  // States & Contexts
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // Αν κάποιος βάλει λάθος ID στο URL ή το Next.js δεν έχει προλάβει να διαβάσει το link
  if (!product) {
    return (
      <div className="pdp-container" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Το προϊόν δεν βρέθηκε!</h2>
        <Link href="/products" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Επιστροφή στα προϊόντα</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // --- Σχετικά Προϊόντα (Related Products) ---
   
  // Φιλτράρουμε ώστε να ταιριάζει ΚΑΙ η κατηγορία (category) ΚΑΙ το είδος (type)
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.type === product.type && p.id !== product.id)
    .slice(0, 4);
  // Λογική για προσθήκη πολλαπλών τεμαχίων
  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  // Αστέρια Αξιολόγησης
  const fullStars = Math.floor(product.rating || 5);
  const hasHalfStar = (product.rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="pdp-container">
      
      {/* 1. Επιστροφή / Breadcrumb */}
      <div className="pdp-top-bar">
        <Link href={`/products/${product.category || ''}`} className="return-link">
          &larr; Return to Shop
        </Link>
      </div>

      {/* 2. Κεντρικό Layout Προϊόντος */}
      <div className="pdp-main-layout">
        
        {/* Αριστερά: Εικόνα */}
        <div className="pdp-image-col">
          <div className="pdp-image-box">
            <img src={product.image || ""} alt={product.title || product.name} />
          </div>
        </div>

        {/* Δεξιά: Πληροφορίες */}
        <div className="pdp-info-col">
          <h1 className="pdp-title">{product.title || product.name}</h1>
          
          <div className="pdp-rating">
            <div className="stars">
              {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
              {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
              {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="fa-regular fa-star"></i>)}
            </div>
            <span>({product.rating || "5.0"}) &bull; {product.reviews || "0"} reviews</span>
          </div>

          <p className="pdp-price">€ {Number(product.price).toFixed(2)}</p>

          <p className="pdp-description">
            {/* Αν υπάρχει description το δείχνει, αλλιώς βγάζει ένα γενικό μήνυμα */}
            {product.description || "Premium sports gear designed for top performance and comfort."}
          </p>

          <hr className="pdp-divider" />

          {/* Επιλογή Ποσότητας */}
          <div className="pdp-qty-section">
            <span className="qty-label">Quantity</span>
            <div className="qty-controls">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Κουμπιά Action */}
          <div className="pdp-actions">
            <button className="pdp-add-cart-btn" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            
            <button 
              className="pdp-wishlist-btn" 
              onClick={() => toggleWishlist(product)}
              style={{ color: isWishlisted ? '#d10000' : '#666' }}
            >
              <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}></i> Add to Wishlist
            </button>
          </div>

        </div>
      </div>

      {/* 3. Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="related-header">
            <h3>Related Products</h3>
            <Link href={`/products/${product.category || ''}`} className="view-all-link">
              View All
            </Link>
          </div>
          <div className="related-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}