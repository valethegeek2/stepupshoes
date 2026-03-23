"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
// --- ΝΕΟ: Εισάγουμε τα προϊόντα για να ξέρουμε το απόθεμα! ---
import { Configuration, CartControllerApi } from '@/backend/generated';

export default function CartPage() {
  const router = useRouter(); 
  const { cart, removeFromCart, updateQuantity, addToCart, clearCart, cartCount } = useCart();
  
  const { user } = useAuth();

  const [apiCart, setApiCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const token = localStorage.getItem('jwt');
  const config = new Configuration({ basePath: 'http://localhost:8080' });
  const cartApi = new CartControllerApi(config);

  const apiRemoveFromCart = async (variantId) => {
    try {
      const requestOpts = await cartApi.removeFromCartRequestOpts({ variantId });
      requestOpts.headers['Authorization'] = `Bearer ${token}`;
      await cartApi.request(requestOpts);
      removeFromCart(variantId);
      setApiCart(prev => prev.filter(item => item.variantId !== variantId));
      
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const apiUpdateQuantity = async (variantId, amount) => {
    const item = apiCart.find(i => i.variantId === variantId);
    if (!item) return;
    const newQty = item.quantity + amount;
    if (newQty <= 0) {
      await apiRemoveFromCart(variantId);
      return;
    }
    try {
      const requestOpts = await cartApi.addToCartRequestOpts({
        addToCartRequestDTO: { variantId, quantity: amount }
      });
      requestOpts.headers['Authorization'] = `Bearer ${token}`;
      await cartApi.request(requestOpts);
      if (amount > 0) {
        addToCart({ id: variantId });
      } else {
        updateQuantity(variantId, -1);
      }
      setApiCart(prev => prev.map(i => i.variantId === variantId ? { ...i, quantity: newQty, subtotal: i.price * newQty } : i));
      
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };


useEffect(() => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    setLoadingCart(false);
    return;
  }

  const fetchCart = async () => {
    try {
      const config = new Configuration({ basePath: 'http://localhost:8080' });
      const cartApi = new CartControllerApi(config);

      const requestOpts = await cartApi.getCartRequestOpts({});
      requestOpts.headers['Authorization'] = `Bearer ${token}`;

      const rawResponse = await cartApi.request(requestOpts);
      const data = await rawResponse.json();
      setApiCart(data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoadingCart(false);
    }
  };
    fetchCart();
  }, []);

  const shipping = 0;
  const taxRate = 0.24;
  const apiSubtotal = apiCart.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = apiSubtotal * taxRate;
  const total = apiSubtotal + shipping + tax;

  if (!user) {
    return (
      <div className="cart-page-container" style={{ textAlign: "center", padding: "100px 20px", minHeight: "60vh" }}>
        <h2 style={{ marginBottom: "20px" }}>Πρέπει να συνδεθείτε για να δείτε το καλάθι σας.</h2>
        <Link href="/signin" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", textDecoration: "none" }}>
          Σύνδεση
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      
      <div className="cart-header-top">
        <div>
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-count-text">{apiCart.length} items in your cart</p>
        </div>
        <Link href="/products" className="continue-shopping">
          &larr; Continue Shopping
        </Link>
      </div>

      {apiCart.length === 0 ? (
        <div className="empty-cart-msg">
          <p>Το καλάθι σας είναι άδειο.</p>
          <Link href="/products"><button className="checkout-btn" style={{marginTop: '20px'}}>Πάμε για ψώνια!</button></Link>
        </div>
      ) : (
        <div className="cart-layout">
          
          <div className="cart-left-col">
            <div className="cart-box-header">
              <h3>Cart Items</h3>
              <button className="clear-all-btn" onClick={clearCart}>
                <i className="fa-regular fa-trash-can"></i> Clear All
              </button>
            </div>

            <div className="cart-items-wrapper">
              {apiCart.map((item) => {
                return (
                  <div className="cart-item-row" key={item.variantId}>
                    <div className="cart-item-img">
                      <img src={""} alt={item.productName} />
                    </div>
                    
                    <div className="cart-item-details">
                      <div className="item-title-row">
                        <h4>{item.productName}</h4>
                        <button className="item-trash-btn" onClick={() => apiRemoveFromCart(item.variantId)}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                      <p className="item-price-each">€ {item.price.toFixed(2)} each</p>
                      <p className="item-variant-info" style={{ fontSize: '13px', color: '#888' }}>
                        {item.color} / {item.size}
                      </p>

                      <div className="item-bottom-row">
                        <div className="qty-controls">
                          <button onClick={() => apiUpdateQuantity(item.variantId, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => apiUpdateQuantity(item.variantId, 1)}>+</button>
                        </div>
                        <p className="item-total-price">€ {item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cart-right-col">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({apiCart.length} items)</span>
              <span>€ {apiSubtotal.toFixed(2)}</span>
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

            <button 
              className="checkout-btn" 
              onClick={() => router.push("/checkout")}
            >
              <i className="fa-solid fa-lock"></i> Proceed to Checkout
            </button>

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