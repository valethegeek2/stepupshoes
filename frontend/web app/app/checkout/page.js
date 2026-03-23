"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartCount } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Υπολογισμοί όπως ακριβώς στο Cart
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.24; // Υπολογισμός ΦΠΑ 24%
  const shippingCost = subtotal > 50 ? 0 : 5.00; // Δωρεάν άνω των 50€
  const finalTotal = subtotal + tax + shippingCost;

  //const handleProceedToPayment = (e) => {
    // e.preventDefault();
    // router.push("/checkout/payment"); 
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      address: formData.address,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
    });
    router.push(`/checkout/payment?${params.toString()}`);
  };

  return (
    <div className="checkout-container">
      
      <div className="checkout-top-bar">
        <Link href="/cart" className="checkout-return-link">
          &larr; Επιστροφή στο καλάθι
        </Link>
      </div>

      <div className="checkout-layout">
        
        {/* ΑΡΙΣΤΕΡΑ: Φόρμα Στοιχείων */}
        <div className="checkout-form-section">
          <h2 className="checkout-title">Στοιχεία παραγγελίας</h2>
          

          <form className="checkout-form" onSubmit={handleProceedToPayment}>
            <div className="form-row">
              <div className="input-group">
                <input name="firstName" type="text" placeholder="Όνομα" required onChange={handleChange} />
              </div>
              <div className="input-group">
                <input name="lastName" type="text" placeholder="Επώνυμο" required onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <input name="city" type="text" placeholder="Πόλη" required onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="input-group">
                <input name="address" type="text" placeholder="Διεύθυνση" required onChange={handleChange} />
              </div>
              {/* <div className="input-group">
                <input type="text" placeholder="Οδός και Αριθμός" required />
              </div> */}
            </div>

            <div className="form-row">
              <div className="input-group">
                <input name="postalCode" type="text" placeholder="Τ.Κ." required onChange={handleChange} />
              </div>
              <div className="input-group">
                <input name="phoneNumber" type="tel" placeholder="Τηλέφωνο (Κινητό)" required onChange={handleChange} />
              </div>
            </div>

            <button type="submit" id="submit-checkout" style={{ display: "none" }}></button>
          </form>
        </div>

        {/* ΔΕΞΙΑ: Το Νέο Order Summary (ακριβώς όπως στο Cart) */}
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

            {/* Κουμπί με λουκετάκι και το πορτοκαλί σου χρώμα */}
            <button 
              className="summary-btn" 
              onClick={() => document.getElementById("submit-checkout").click()}
            >
              <i className="fa-solid fa-lock"></i> Στοιχεία πληρωμής
            </button>

            {/* Εικονίδια Ασφαλείας */}
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