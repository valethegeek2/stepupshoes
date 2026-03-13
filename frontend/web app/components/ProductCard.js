"use client"; // Χρειάζεται πλέον επειδή έχουμε κλικ και state
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();
  if (!product) return null;

  // Ελέγχουμε αν αυτό το προϊόν είναι ήδη μέσα στη Wishlist
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const fullStars = Math.floor(product.rating || 5);
  const hasHalfStar = (product.rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="product-card">
      <div className="img-placeholder">
        {/* Αν είναι στη wishlist, βάζουμε fa-solid (γεμάτη) και κόκκινο χρώμα */}
        <i 
          className={`card-heart ${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}
          style={{ color: isWishlisted ? '#f00' : '' }}
          onClick={() => toggleWishlist(product)} // Όταν πατιέται, καλεί τη συνάρτηση μας
        ></i>
        <img src={product.image || ""} alt={product.title} />
      </div>
      
      <div className="product-info">
        <Link href={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="product-rating">
          {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
          {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
          {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="fa-regular fa-star"></i>)}
          <span>({product.reviews || 0})</span>
        </div>
        <p className="product-price">€ {product.price}</p>
      </div>
    </div>
  );
}