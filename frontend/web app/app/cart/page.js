"use client";
import Link from "next/link";
// 1. Προσθέσαμε το useRouter
import { useRouter } from "next/navigation"; 
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const router = useRouter(); // 2. Το δηλώνουμε εδώ
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal } = useCart();

  // Υπολογισμοί όπως στη φωτογραφία
  const shipping = 0; // Δωρεάν
  const taxRate = 0.24; // 24% ΦΠΑ (ή ό,τι θέλεις)
  const tax = cartSubtotal * taxRate;
  const total = cartSubtotal + shipping + tax;

  return (
    <div className="cart-page-container">
      
      {/* Επικεφαλίδα */}
      <div className="cart-header-top">
        <div>
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-count-text">{cartCount} items in your cart</p>
        </div>
        <Link href="/products" className="continue-shopping">
          &larr; Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-msg">
          <p>Το καλάθι σας είναι άδειο.</p>
          <Link href="/products"><button className="checkout-btn" style={{marginTop: '20px'}}>Πάμε για ψώνια!</button></Link>
        </div>
      ) : (
        <div className="cart-layout">
          
          {/* ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ: Προϊόντα */}
          <div className="cart-left-col">
            <div className="cart-box-header">
              <h3>Cart Items</h3>
              <button className="clear-all-btn" onClick={clearCart}>
                <i className="fa-regular fa-trash-can"></i> Clear All
              </button>
            </div>

            <div className="cart-items-wrapper">
              {cart.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  {/* Εικόνα */}
                  <div className="cart-item-img">
                    <img src={item.image || ""} alt={item.title} />
                  </div>
                  
                  {/* Πληροφορίες & Ποσότητα */}
                  <div className="cart-item-details">
                    <div className="item-title-row">
                      <h4>{item.title}</h4>
                      <button className="item-trash-btn" onClick={() => removeFromCart(item.id)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                    <p className="item-price-each">€ {item.price.toFixed(2)} each</p>
                    
                    <div className="item-bottom-row">
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <p className="item-total-price">€ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ΔΕΞΙΑ ΣΤΗΛΗ: Σύνοψη (Order Summary) */}
          <div className="cart-right-col">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>€ {cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-badge">Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>€ {tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-total-row">
              <span>Total</span>
              <span>€ {total.toFixed(2)}</span>
            </div>

            {/* 3. Βάλαμε το onClick στο δικό σου κουμπί! */}
            <button 
              className="checkout-btn" 
              onClick={() => router.push("/checkout")}
            >
              <i className="fa-solid fa-lock"></i> Proceed to Checkout
            </button>

            {/* Badges Ασφαλείας */}
            <div className="trust-badges">
              <p><i className="fa-solid fa-shield-halved" style={{color: '#2bd67b'}}></i> Secure SSL checkout</p>
              <p><i className="fa-solid fa-truck-fast" style={{color: '#3b82f6'}}></i> Free returns within 30 days</p>
              <p><i className="fa-regular fa-heart" style={{color: '#d10000'}}></i> 24/7 customer support</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}