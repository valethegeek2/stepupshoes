"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Λίστα με τις σελίδες που ΔΕΝ θέλουμε να φαίνεται το Footer
  const hideOnRoutes = ["/signin", "/signup", "/forgot-password"];
  if (hideOnRoutes.includes(pathname)) {
    return null; // Αν είμαστε σε αυτές τις σελίδες, κρύψου!
  }

  return (
    <div className="footer">
      <div className="footer-top">
          
          <div className="footer-col footer-contact-col">
              <div className="footer-logo">Sportwear<span className="dot">.</span></div>
              <div className="contact-item">
                  <i className="fa-solid fa-phone"></i>
                  <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                  <i className="fa-solid fa-envelope"></i>
                  <p>information@sportwear.com</p>
              </div>
              <div className="contact-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <p>123 Main Street, Suite 105, Anytown USA</p>
              </div>
          </div>

          <div className="footer-col">
              <h4>Links</h4>
              <p>Products List</p>
              <p>Order Tracking</p>
              <p>Products Guide</p>
              <p>Shopping Cart</p>
              <p>Tech Blog</p>
          </div>

          <div className="footer-col">
              <h4>Supports</h4>
              <p>About Us</p>
              <p>Privacy Policy</p>
              <p>Return Policy</p>
              <p>Help Centre</p>
              <p>Store Locations</p>
              <p>Careers</p>
          </div>

          <div className="footer-col">
              <h4>Categories</h4>
              <p>Men's Clothing</p>
              <p>Women's Clothing</p>
              <p>Kids & Youth</p>
              <p>Athletic Shoes</p>
              <p>Sports Equipment</p>
              <p>Accessories</p>
              <p>Sale & Offers</p>
          </div>

          <div className="footer-col payments-col">
              <h4>Payments</h4>
              <div className="payment-icons">
                  <i className="fa-brands fa-cc-visa" style={{ color: "#1a1f71" }}></i>
                  <i className="fa-brands fa-cc-mastercard" style={{ color: "#eb001b" }}></i>
                  <i className="fa-brands fa-cc-apple-pay" style={{ color: "#000" }}></i>
                  <i className="fa-brands fa-cc-paypal" style={{ color: "#003087" }}></i>
              </div>
              
              <h4 className="follow-title">Follow Us</h4>
              <p>Twitter</p>
              <p>Instagram</p>
              <p>Facebook</p>
          </div>

      </div>

      <div className="footer-bottom">
          <div className="copyright">
              <p>Copyright © 2026 Sportwear. All Rights Reserved.</p>
          </div>
          <div className="legal-links">
              <p>Privacy Policy &nbsp;|&nbsp; Terms & Condition &nbsp;|&nbsp; Sitemap</p>
          </div>
      </div>
    </div>
  );
}