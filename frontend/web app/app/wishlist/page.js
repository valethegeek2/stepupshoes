"use client";
import Link from "next/link";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; 

// Mock data for stock validation
import { productsData } from "../../data/product";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Handle bulk adding to cart while checking stock availability
  const handleAddAllToCart = () => {
    let addedCount = 0;
    let outOfStockCount = 0;

    wishlist.forEach((item) => {
      const originalProduct = productsData.find(p => p.id === item.id);
      const isOutOfStock = originalProduct ? originalProduct.quantity === 0 : false;

      // Add to cart only if in stock
      if (!isOutOfStock) {
        addToCart(item);               
        removeFromWishlist(item.id);   
        addedCount++;
      } else {
        outOfStockCount++;
      }
    });

    if (outOfStockCount > 0) {
      alert(`Προστέθηκαν ${addedCount} προϊόντα στο καλάθι. ${outOfStockCount} προϊόντα δεν προστέθηκαν γιατί έχουν εξαντληθεί.`);
    } else if (addedCount > 0) {
      alert("Όλα τα προϊόντα προστέθηκαν στο καλάθι σας με επιτυχία!");
    }
  };

  // Guard clause for unauthenticated users
  if (!user) {
    return (
      <div className="wishlist-container" style={{ textAlign: "center", padding: "100px 20px", minHeight: "60vh" }}>
        <h2 style={{ marginBottom: "20px" }}>Πρέπει να συνδεθείτε για να δείτε τη λίστα επιθυμιών σας.</h2>
        <Link href="/signin" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", textDecoration: "none" }}>
          Σύνδεση
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">Αρχική</Link>
        <span> - </span>
        <span style={{ color: '#555' }}>WISHLIST</span>
      </div>

      <div className="wishlist-header-row">
        <h1 className="wishlist-page-title">WISHLIST</h1>
        {wishlist.length > 0 && (
          <button className="add-all-cart-btn" onClick={handleAddAllToCart}>
            ΜΕΤΑΦΟΡΑ ΟΛΩΝ ΣΤΟ ΚΑΛΑΘΙ
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <p style={{ marginTop: '30px', fontSize: '18px', color: '#555' }}>Η Wishlist σας είναι άδεια. Προσθέστε αγαπημένα προϊόντα!</p>
      ) : (
        <div className="wishlist-content">
          
          <div className="wishlist-table-header">
            <span className="col-product">Προϊόν</span>
            <span className="col-price">Τιμή</span>
          </div>

          <div className="wishlist-items-list">
            {wishlist.map((item) => {
              // Determine stock status for the current item
              const originalProduct = productsData.find(p => p.id === item.id);
              const isOutOfStock = originalProduct ? originalProduct.quantity === 0 : false;

              return (
                <div className="wishlist-item-row" key={item.id}>
                  
                  <div className="wishlist-item-left">
                    <div className="wishlist-img-box">
                      <img src={item.image || ""} alt={item.title} />
                    </div>
                    <div className="wishlist-item-info">
                      <p className="wishlist-item-brand">{item.brand || "Sportwear"}</p>
                      <Link href={`/product/${item.id}`} className="wishlist-item-name">
                        {item.title}
                      </Link>
                      
                      {/* Out of stock indicator */}
                      {isOutOfStock && (
                        <p style={{ color: '#d10000', fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>
                          Εξαντλήθηκε
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="wishlist-item-price">
                    € {Number(item.price).toFixed(2)}
                  </div>

                  <div className="wishlist-item-actions">
                    <button className="remove-item-btn" onClick={() => removeFromWishlist(item.id)}>
                      <i className="fa-regular fa-trash-can"></i> Αφαίρεση
                    </button>
                    
                    {/* Add to cart button (disabled if out of stock) */}
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => {
                        if (!isOutOfStock) {
                          addToCart(item);               
                          removeFromWishlist(item.id);   
                        }
                      }}
                      disabled={isOutOfStock}
                      style={{
                        backgroundColor: isOutOfStock ? '#ccc' : '',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        opacity: isOutOfStock ? 0.6 : 1
                      }}
                    >
                      {isOutOfStock ? "OUT OF STOCK" : "ΠΡΟΣΘΗΚΗ ΣΤΟ ΚΑΛΑΘΙ"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}