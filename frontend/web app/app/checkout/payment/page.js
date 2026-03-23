"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, cartCount, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.24; // 24% VAT
  const shippingCost = subtotal > 50 ? 0 : 5.00;
  const finalTotal = subtotal > 0 ? subtotal + tax + shippingCost : 0;

  // Handle order submission
  const handleCompleteOrder = () => {
    alert("Η παραγγελία σας ολοκληρώθηκε με επιτυχία! Ευχαριστούμε.");
    clearCart(); 
    router.push("/"); 
  };

  return (
    <div className="checkout-container">
      
      <div className="checkout-top-bar">
        <Link href="/checkout" className="checkout-return-link">
          &larr; Επιστροφή
        </Link>
      </div>

      <div className="checkout-layout">
        
        {/* Left Column: Payment Method Selection */}
        <div className="checkout-form-section">
          <h2 className="checkout-title" style={{ marginBottom: '30px' }}>Επίλεξε τον τρόπο πληρωμής</h2>

          <div className="payment-options-list">
            
            {/* Credit/Debit Card Option */}
            <div className={`payment-option-box ${paymentMethod === "card" ? "active" : ""}`} onClick={() => setPaymentMethod("card")}>
              <div className="payment-option-header">
                <i className="fa-regular fa-credit-card"></i>
                <div>
                  <h4>Πιστωτική/χρεωστική κάρτα</h4>
                  <p>Άτοκες δόσεις με πιστωτική κάρτα</p>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="payment-card-details">
                  <h5>Νέα πιστωτική ή χρεωστική κάρτα</h5>
                  <div className="form-row">
                    <div className="input-group">
                      <input type="text" placeholder="Αριθμός κάρτας" />
                    </div>
                    <div className="input-group">
                      <input type="text" placeholder="Ημ/νία λήξης (ΜΜ/ΕΕ)" />
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '15px' }}>
                    <div className="input-group">
                      <input type="text" placeholder="Ονοματεπώνυμο" />
                    </div>
                    <div className="input-group">
                      <input type="text" placeholder="CVV" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cash on Delivery (COD) Option */}
            <div className={`payment-option-box ${paymentMethod === "cod" ? "active" : ""}`} onClick={() => setPaymentMethod("cod")}>
              <div className="payment-option-header">
                <i className="fa-solid fa-money-bill-wave"></i>
                <div>
                  <h4>Αντικαταβολή</h4>
                  <p>+3,50 € ανά αποστολή</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Order Summary */}
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

            {paymentMethod === "cod" && (
              <div className="summary-line" style={{ color: '#d10000' }}>
                <span>Έξοδα Αντικαταβολής</span>
                <span>€ 3.50</span>
              </div>
            )}

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span className="total-price">
                € {(finalTotal + (paymentMethod === "cod" ? 3.5 : 0)).toFixed(2)}
              </span>
            </div>

            <button className="summary-btn" onClick={handleCompleteOrder}>
              Ολοκλήρωση παραγγελίας
            </button>

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