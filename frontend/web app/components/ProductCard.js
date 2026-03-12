import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  // Λογική για να υπολογίζουμε πόσα γεμάτα, μισά ή άδεια αστέρια θα δείξουμε
  const fullStars = Math.floor(product.rating || 5);
  const hasHalfStar = (product.rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="product-card">
      <div className="img-placeholder">
        <i className="fa-regular fa-heart card-heart"></i>
        <img src={product.image || ""} alt={product.title} />
      </div>
      
      <div className="product-info">
        <Link href={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>
        
        <div className="product-rating">
          {/* Τυπώνουμε τα γεμάτα αστέρια */}
          {[...Array(fullStars)].map((_, i) => (
            <i key={`full-${i}`} className="fa-solid fa-star"></i>
          ))}
          {/* Τυπώνουμε το μισό αστέρι αν υπάρχει */}
          {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
          {/* Τυπώνουμε τα άδεια αστέρια */}
          {[...Array(emptyStars)].map((_, i) => (
            <i key={`empty-${i}`} className="fa-regular fa-star"></i>
          ))}
          
          <span>({product.reviews || 0})</span>
        </div>
        
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
}