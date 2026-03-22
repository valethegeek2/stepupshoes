"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; 
import { productsData } from "../../../data/product";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export default function ProductDetailsPage() {
  const params = useParams(); 
  const productId = params?.id;

  const product = productsData.find((p) => String(p.id) === String(productId));

  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, toggleWishlist, removeFromWishlist } = useWishlist();

  const maxStock = product?.quantity !== undefined ? product.quantity : 5;
  const isOutOfStock = maxStock === 0;

  const [qty, setQty] = useState(isOutOfStock ? 0 : 1);

  useEffect(() => {
    if (isOutOfStock) {
      setQty(0);
    }
  }, [isOutOfStock]);

  if (!product) {
    return (
      <div className="pdp-container" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Το προϊόν δεν βρέθηκε!</h2>
        <Link href="/products" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Επιστροφή στα προϊόντα</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  // Σχετικά Προϊόντα
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);

  // --- Λογική προσθήκης στο Καλάθι ---
  const handleAddToCart = () => {
    if (isOutOfStock) return; 
    
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    // Αν υπήρχε στη Wishlist, το βγάζουμε αυτόματα (Αθόρυβα)
    if (isWishlisted) {
      removeFromWishlist(product.id);
    }
  };

  // --- Λογική προσθήκης στη Wishlist ---
  const handleWishlistToggle = () => {
    toggleWishlist(product);

    // Αν το προϊόν ΔΕΝ ήταν στη wishlist (άρα τώρα μπήκε) και ΕΙΝΑΙ στο καλάθι, το βγάζουμε από το καλάθι (Αθόρυβα)
    if (!isWishlisted && isInCart) {
      removeFromCart(product.id);
    }
  };

  const fullStars = Math.floor(product.rating || 5);
  const hasHalfStar = (product.rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="pdp-container">
      
      <div className="pdp-top-bar">
        <Link href={`/products/${product.category || ''}`} className="return-link">
          &larr; Return to Shop
        </Link>
      </div>

      <div className="pdp-main-layout">
        
        <div className="pdp-image-col">
          <div className="pdp-image-box">
            <img src={product.image || ""} alt={product.title || product.name} />
          </div>
        </div>

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
            {product.description || "Premium sports gear designed for top performance and comfort."}
          </p>

          <p style={{ 
            color: isOutOfStock ? '#d10000' : '#2bd67b', 
            fontWeight: 'bold', 
            marginTop: '-15px', 
            marginBottom: '20px' 
          }}>
            {isOutOfStock ? "Out of Stock" : `In Stock (${maxStock} διαθέσιμα)`}
          </p>

          <hr className="pdp-divider" />

          <div className="pdp-qty-section">
            <span className="qty-label">Quantity</span>
            <div className="qty-controls">
              <button 
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                disabled={isOutOfStock}
                style={{ 
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer', 
                  opacity: isOutOfStock ? 0.3 : 1 
                }}
              >
                -
              </button>
              
              <span>{qty}</span>
              
              <button 
                onClick={() => {
                  if (qty < maxStock) {
                    setQty(qty + 1);
                  } else {
                    alert(`Δυστυχώς, το μέγιστο διαθέσιμο απόθεμα για αυτό το προϊόν είναι ${maxStock} τεμάχια.`);
                  }
                }}
                disabled={isOutOfStock || qty >= maxStock}
                style={{ 
                  opacity: (qty >= maxStock || isOutOfStock) ? 0.3 : 1, 
                  cursor: (qty >= maxStock || isOutOfStock) ? 'not-allowed' : 'pointer' 
                }}
                title={qty >= maxStock ? "Εξαντλήθηκε το απόθεμα" : "Προσθήκη"}
              >
                +
              </button>
            </div>
          </div>

          <div className="pdp-actions">
            <button 
              className="pdp-add-cart-btn" 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{ 
                backgroundColor: isOutOfStock ? '#ccc' : '',
                color: isOutOfStock ? '#666' : '#fff',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                opacity: isOutOfStock ? 0.6 : 1
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
            
            <button 
              className="pdp-wishlist-btn" 
              onClick={handleWishlistToggle} 
              style={{ color: isWishlisted ? '#d10000' : '#666' }}
            >
              <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}></i> Add to Wishlist
            </button>
          </div>

        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="related-header">
            <h3>Related Products</h3>
            <Link href={`/products/${product.category}?gender=${product.gender}`} className="view-all-link">
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