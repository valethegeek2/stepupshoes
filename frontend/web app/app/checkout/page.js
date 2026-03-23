"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartCount } = useCart();

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.24; // 24% VAT calculation
  const shippingCost = subtotal > 50 ? 0 : 5.00; // Free shipping for orders over 50€
  const finalTotal = subtotal + tax + shippingCost;

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    router.push("/checkout/payment"); 
  };

  return (
    <div className="checkout-container">
      
      <div className="checkout-top-bar">
        <Link href="/cart" className="checkout-return-link">
          &larr; Επιστροφή στο καλάθι
        </Link>
      </div>

      <div className="checkout-layout">
        
        {/* Left Column: Shipping details form */}
        <div className="checkout-form-section">
          <h2 className="checkout-title">Στοιχεία παραγγελίας</h2>
          

          <form className="checkout-form" onSubmit={handleProceedToPayment}>
            <div className="form-row">
              <div className="input-group">
                <input type="text" placeholder="Όνομα" required />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Επώνυμο" required />
              </div>
            </div>

            <div className="input-group">
              <input type="text" placeholder="Πόλη" required />
            </div>

            <div className="form-row">
              <div className="input-group">
                <input type="text" placeholder="Διεύθυνση" required />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Οδός και Αριθμός" required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <input type="text" placeholder="Τ.Κ." required />
              </div>
              <div className="input-group">
                <input type="tel" placeholder="Τηλέφωνο (Κινητό)" required />
              </div>
            </div>

            <button type="submit" id="submit-checkout" style={{ display: "none" }}></button>
          </form>
        </div>

        {/* Right Column: Order summary */}
        <div className="checkout-summary-section">
          <div className="checkout-order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-line">
              <span>Subtotal ({cartCount} items)</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-line">
              <span>Shipping</span>
              {shippingCost === 0 ? (
                <span className="free-badge">Free</span>
              ) : (
                <span>€ {shippingCost.toFixed(2)}</span>
              )}
            </div>

            <div className="summary-line">
              <span>Tax</span>
              <span>€ {tax.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span className="total-price">€ {finalTotal.toFixed(2)}</span>
            </div>

            {/* Trigger hidden submit button */}
            <button 
              className="summary-btn" 
              onClick={() => document.getElementById("submit-checkout").click()}
            >
              <i className="fa-solid fa-lock"></i> Στοιχεία πληρωμής
            </button>

            {/* Trust badges */}
            <div className="summary-features">
              <div className="feature-item">
                <i className="fa-solid fa-shield-halved" style={{ color: '#22c55e' }}></i>
                <span>Secure SSL checkout</span>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-truck-fast" style={{ color: '#3b82f6' }}></i>
                <span>Free returns within 30 days</span>
              </div>
              <div className="feature-item">
                <i className="fa-regular fa-heart" style={{ color: '#ef4444' }}></i>
                <span>24/7 customer support</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}