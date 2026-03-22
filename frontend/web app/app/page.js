"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
// Φέρνουμε τα πραγματικά σου mock δεδομένα
import { productsData } from "../data/product";

export default function Home() {
  const [activeTab, setActiveTab] = useState("mens-products");

  // --- ΣΥΝΑΡΤΗΣΗ: Βρίσκει τα κορυφαία σε πωλήσεις (Best Sellers) ---
  // Ταξινομεί με βάση τα reviews (φθίνουσα σειρά) και παίρνει τα πρώτα `limit`
  const getBestSellers = (products, limit = 4) => {
    return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
  };

  // 1. Featured Products: Τα 4 κορυφαία από ΟΛΟ το μαγαζί
  const featuredProducts = getBestSellers(productsData, 4);

  // 2. Ανδρικά: Τα 4 κορυφαία όπου το gender είναι "men"
  const mensProducts = getBestSellers(
    productsData.filter(p => p.gender === "men"), 
    4
  );

  // 3. Γυναικεία: Τα 4 κορυφαία όπου το gender είναι "women"
  const womensProducts = getBestSellers(
    productsData.filter(p => p.gender === "women"), 
    4
  );

  // 4. Παιδικά: Τα 4 κορυφαία όπου το gender είναι "boy" ή "girl"
  const kidsProducts = getBestSellers(
    productsData.filter(p => p.gender === "boy" || p.gender === "girl"), 
    4
  );

  // 5. Παπούτσια: Τα 4 κορυφαία όπου η κατηγορία είναι "shoes"
  const featuredShoes = getBestSellers(
    productsData.filter(p => p.category === "shoes"), 
    4
  );

  return (
    <>
      <div className="hero-section">
          <img src="brand.png" alt="Sportwear" className="hero-bg-img" />
          <Link href="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
      </div>

      <div className="features-section">
          <div className="feature-box">
              <i className="fa-solid fa-headset"></i>
              <div className="feature-text">
                  <h4>Responsive</h4>
                  <p>Customer service available 24/7</p>
              </div>
          </div>
          <div className="feature-box">
              <i className="fa-solid fa-shield-halved"></i>
              <div className="feature-text">
                  <h4>Secure</h4>
                  <p>Certified marketplace since 2017</p>
              </div>
          </div>
          <div className="feature-box">
              <i className="fa-solid fa-truck-fast"></i>
              <div className="feature-text">
                  <h4>Shipping</h4>
                  <p>Free, fast, and reliable worldwide</p>
              </div>
          </div>
          <div className="feature-box">
              <i className="fa-solid fa-rotate-left"></i>
              <div className="feature-text">
                  <h4>Transparent</h4>
                  <p>Hassle-free return policy</p>
              </div>
          </div>
      </div>

      <div className="featured-products-section">
          <div className="section-header">
              <h2 className="section-title">Featured Products</h2>
              <Link href="/products" className="view-all">View All &rarr;</Link>
          </div>
          
          <div className="product-grid">
              {featuredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Categories Links (Gender) */}
      <div className="categories-section">
          <div className="category-card">
              <img src="ανδρικα.png" alt="Men" className="category-img" />
              <Link href="/products?gender=men">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="γυναικεια.png" alt="Women" className="category-img" />
              <Link href="/products?gender=women">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="αγορι.png" alt="Boys" className="category-img" />
              <Link href="/products?gender=boy">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="κοριτσι.png" alt="Girls" className="category-img" />
              <Link href="/products?gender=girl">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
      </div>

      <div className="tabbed-products-section">
          <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === 'mens-products' ? 'active' : ''}`} 
                onClick={() => setActiveTab('mens-products')}
              >
                ΑΝΔΡΙΚΑ
              </button>
              <button 
                className={`tab-btn ${activeTab === 'womens-products' ? 'active' : ''}`} 
                onClick={() => setActiveTab('womens-products')}
              >
                ΓΥΝΑΙΚΕΙΑ
              </button>
              <button 
                className={`tab-btn ${activeTab === 'kids-products' ? 'active' : ''}`} 
                onClick={() => setActiveTab('kids-products')}
              >
                ΠΑΙΔΙΚΑ
              </button>
          </div>

          <div className={`product-grid tab-content ${activeTab === 'mens-products' ? 'active-content' : ''}`}>
              {mensProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
          <div className={`product-grid tab-content ${activeTab === 'womens-products' ? 'active-content' : ''}`}>
               {womensProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
          <div className={`product-grid tab-content ${activeTab === 'kids-products' ? 'active-content' : ''}`}>
               {kidsProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Top Brands Links */}
      <div className="top-brands-wrapper">
          <h2 className="brands-title">TOP BRANDS</h2>
          
          <div className="categories-section brands-section">
              <div className="category-card">
                  <img src="adidas.jpg" alt="Brand 1" className="category-img" />
                  <Link href="/products?brand=Adidas">
                    <button className="category-btn">Shop Now</button>
                  </Link>
              </div>
              <div className="category-card">
                  <img src="nike.jpg" alt="Brand 2" className="category-img" />
                  <Link href="/products?brand=Nike">
                    <button className="category-btn">Shop Now</button>
                  </Link>
              </div>
              <div className="category-card">
                  <img src="asiscs.jpg" alt="Brand 3" className="category-img" />
                  <Link href="/products?brand=Asics">
                    <button className="category-btn">Shop Now</button>
                  </Link>
              </div>
              <div className="category-card">
                  <img src="new_balance.jpg" alt="Brand 4" className="category-img" />
                  <Link href="/products?brand=New Balance">
                    <button className="category-btn">Shop Now</button>
                  </Link>
              </div>
          </div>
      </div>

      <div className="featured-products-section">
          <div className="section-header">
              <h2 className="section-title">Shoes</h2>
              <Link href="/products/shoes" className="view-all">View All &rarr;</Link>
          </div>
          
          <div className="product-grid">
              {featuredShoes.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      <div className="all-brands-section">
          <div className="section-header">
              <h2 className="section-title">BRANDS</h2>
          </div>
          <div className="brands-banner-img">
              <img src="brands.jpg" alt="Our Brands" />
          </div>
      </div>
    </>
  );
}