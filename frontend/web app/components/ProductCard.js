"use client"; 
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { cart, removeFromCart } = useCart();

  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); 

    toggleWishlist(product);

    // Αφαιρείται αθόρυβα από το καλάθι χωρίς κανένα alert!
    if (!isWishlisted && isInCart) {
      removeFromCart(product.id);
    }
  };

  const fullStars = Math.floor(product.rating || 5);
  const hasHalfStar = (product.rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="product-card">
      <div className="img-placeholder" style={{ position: 'relative' }}>
        
        <i 
          className={`card-heart ${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}
          style={{ color: isWishlisted ? '#f00' : '' }}
          onClick={handleWishlistClick}
        ></i>

        <Link href={`/product/${product.id}`}>
          <img src={product.productImage || "https://via.placeholder.com/300"} alt={product.name} />
        </Link>
      </div>
      
      <div className="product-info">
        <Link href={`/product/${product.id}`} className="product-title">
          {product.name}
        </Link>
        <div className="product-rating">
          {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
          {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
          {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="fa-regular fa-star"></i>)}
          <span>({product.reviews || 0})</span>
        </div>
        
        <p className="product-price">
          € {Number(product.basePrice).toFixed(2)}
        </p>
      </div>
    </div>
  );
}