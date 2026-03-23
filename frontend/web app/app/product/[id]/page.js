"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; 
//import { productsData } from "../../../data/product";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { Configuration, ProductControllerApi, CartControllerApi } from '@/backend/generated';

export default function ProductDetailsPage() {
  const params = useParams(); 
  const productId = params?.id;

  useEffect(() => {
    if (!productId) return;
    fetchProductData();
  }, [productId]);

  const config = new Configuration({ basePath: "http://localhost:8080" });
  const api = new ProductControllerApi(config);

  const [apiProducts, setProduct] = useState(null);
  const [related, setRelated] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  const product = apiProducts;

  const fetchProductData = async () => {
    try {
      const body = {
        // number
        id: productId,
      };
      const prod = await api.getProductById(body);
      setProduct(prod);
      const related = await api.getAllProducts1({})
      setRelated(related.contents || []);
      const varBody = {
        // number
        productId: productId,
      };

      const vars = await api.getAllProductVariantsByProductId1(varBody);
      setVariants(vars || []);
      // setMaxStock(vars.reduce(
      //   (sum, v) => sum + (v.isAvailable ? v.stock : 0), 0))
      console.log("vars");
      console.log(vars);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, toggleWishlist, removeFromWishlist } = useWishlist();

  const maxStock = variants.reduce(
    (sum, v) => sum + (v.stock || 0),
    0
  );

  const [qty, setQty] = useState(1);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const availableColors = [...new Set(variants.map(v => v.color))];
  const availableSizes = [...new Set(variants.map(v => v.size))];

  const selectedVariant = variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  );

  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false;

  useEffect(() => {
    if (maxStock === 0) {
      setQty(0);
    } else if (qty === 0) {
      setQty(1);
    }
  }, [maxStock]);

  if (loading) return <p>Loading...</p>;

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
  const relatedProducts = (related || [])
  .filter((p) =>
    p.category?.name === product.category?.name &&
    p.gender === product.gender &&
    p.id !== product.id
  )
  .slice(0, 4);

  // --- Λογική προσθήκης στο Καλάθι ---

  const handleAddToCart = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      window.location.href = '/signin';
      return;
    }
    if (!selectedVariant) {
      alert("Παρακαλώ επιλέξτε χρώμα και μέγεθος.");
      return;
    }
    if (isOutOfStock) return;

    try {
      const config = new Configuration({ basePath: 'http://localhost:8080' });
      const cartApi = new CartControllerApi(config);

      const requestOpts = await cartApi.addToCartRequestOpts({
        addToCartRequestDTO: {
          variantId: selectedVariant.id,
          quantity: qty,
        }
      });

      requestOpts.headers['Authorization'] = `Bearer ${token}`;

      const rawResponse = await cartApi.request(requestOpts);
      console.log("Cart status:", rawResponse.status);

      // Local cart update
      const cartItem = {
        id: selectedVariant.id,
        name: product.name,
        price: Number(product.basePrice) + Number(selectedVariant.priceAdjustment || 0),
        productImage: product.productImage,
        color: selectedVariant.color,
        size: selectedVariant.size,
        stock: selectedVariant.stock,
      };

      for (let i = 0; i < qty; i++) {
        addToCart(cartItem);
      }

      if (isWishlisted) {
        removeFromWishlist(product.id);
      }

    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Σφάλμα κατά την προσθήκη στο καλάθι.");
    }
  };

  // const handleAddToCart = () => {
  //   if (!selectedVariant) {
  //     alert("Παρακαλώ επιλέξτε χρώμα και μέγεθος.");
  //     return;
  //   }
  //   if (isOutOfStock) return;

  //   const cartItem = {
  //     id: selectedVariant.id,
  //     name: product.name,
  //     price: Number(product.basePrice) + Number(selectedVariant.priceAdjustment || 0),
  //     productImage: product.productImage,
  //     color: selectedVariant.color,
  //     size: selectedVariant.size,
  //     stock: selectedVariant.stock,
  //   };

  //   for (let i = 0; i < qty; i++) {
  //     addToCart(cartItem);
  //   }

  //   if (isWishlisted) {
  //     removeFromWishlist(product.id);
  //   }
  // };

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
        <Link href={`/products/${product.category?.name || ''}`} className="return-link">
          &larr; Return to Shop
        </Link>
      </div>

      <div className="pdp-main-layout">
        
        <div className="pdp-image-col">
          <div className="pdp-image-box">
            <img src={product.productImage || ""} alt={product.name} />
          </div>
        </div>

        <div className="pdp-info-col">
          <h1 className="pdp-title">{product.name}</h1>
          
          <div className="pdp-rating">
            <div className="stars">
              {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
              {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
              {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="fa-regular fa-star"></i>)}
            </div>
            <span>({product.rating || "5.0"}) &bull; {product.reviews || "0"} reviews</span>
          </div>

          <p className="pdp-price">€ {Number(product.basePrice).toFixed(2)}</p>

          <p className="pdp-description">
            {product.description || "Premium sports gear designed for top performance and comfort."}
          </p>
{/*isOutOfStock ? '#d10000' : '#2bd67b', */}
          <p style={{ 
            color: (!selectedVariant && maxStock === 0) || isOutOfStock ? '#d10000' : '#2bd67b', 
            fontWeight: 'bold', 
            marginTop: '-15px', 
            marginBottom: '20px' 
          }}>
            {/*{isOutOfStock ? "Out of Stock" : `In Stock (${maxStock} διαθέσιμα)`}*/}
            {!selectedVariant 
                ? (maxStock === 0 ? "Out of Stock" : `Διαθέσιμο απόθεμα: ${maxStock} τεμάχια`)
                : isOutOfStock 
                  ? "Out of Stock" 
                  : `In Stock (${selectedVariant.stock} διαθέσιμα)`}
          </p>

          <hr className="pdp-divider" />

          {/* Select variant section */}
          <div className="pdp-variants">
            <div className="pdp-variant-group">
              <span className="qty-label">Color</span>
              <div className="pdp-variant-options">
                {availableColors.map(color => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setSelectedSize(null); }}
                    style={{
                      padding: '6px 14px',
                      marginRight: '8px',
                      border: selectedColor === color ? '2px solid #f59e0b' : '2px solid #ccc',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: selectedColor === color ? 'bold' : 'normal',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-variant-group" style={{ marginTop: '12px' }}>
              <span className="qty-label">Size</span>
              <div className="pdp-variant-options">
                {availableSizes.map(size => {
                  const available = variants.some(
                    v => v.size === size && v.color === selectedColor && v.stock > 0
                  );
                  return (
                    <button
                      key={size}
                      onClick={() => available && setSelectedSize(size)}
                      disabled={!available}
                      style={{
                        padding: '6px 14px',
                        marginRight: '8px',
                        border: selectedSize === size ? '2px solid #f59e0b' : '2px solid #ccc',
                        borderRadius: '6px',
                        cursor: available ? 'pointer' : 'not-allowed',
                        opacity: available ? 1 : 0.4,
                        fontWeight: selectedSize === size ? 'bold' : 'normal',
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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