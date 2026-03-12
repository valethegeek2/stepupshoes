"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("mens-products");

  // --- Προσωρινά Στατικά Δεδομένα για την Αρχική ---
  // (Μέχρι να συνδέσουμε τα δικά σου mock data)

  const featuredProducts = [
    { id: 1, title: "Pro Running Shoes High Quality Value Buy", price: "89.99", reviews: 50, rating: 5 },
    { id: 2, title: "Dry-Fit Training T-Shirt Breathable", price: "29.99", reviews: 120, rating: 4.5 },
    { id: 3, title: "Athletic Jogger Pants For Men Ultra HD", price: "45.00", reviews: 100, rating: 4 },
    { id: 4, title: "Waterproof Gym Bag with Flash Pocket", price: "35.50", reviews: 70, rating: 5 }
  ];

  const mensProducts = [
    { id: 5, title: "Ανδρικά Παπούτσια Τρεξίματος", price: "120.00", reviews: 85, rating: 5 },
    { id: 6, title: "Ανδρικό Αθλητικό Μπουφάν", price: "95.00", reviews: 42, rating: 4.5 },
    { id: 7, title: "Ανδρικά Sneakers", price: "65.00", reviews: 110, rating: 4 },
    { id: 8, title: "Ανδρικό Παντελόνι Φόρμας", price: "45.00", reviews: 24, rating: 5 }
  ];

  const womensProducts = [
    { id: 9, title: "Γυναικείο Κολάν Προπόνησης", price: "40.00", reviews: 60, rating: 5 },
    { id: 10, title: "Γυναικεία Αθλητικά Παπούτσια", price: "110.00", reviews: 130, rating: 5 },
    { id: 11, title: "Γυναικείο Αθλητικό Μπουστάκι", price: "25.00", reviews: 35, rating: 3.5 },
    { id: 12, title: "Γυναικεία Τσάντα Γυμναστηρίου", price: "55.00", reviews: 45, rating: 5 }
  ];

  const kidsProducts = [
    { id: 13, title: "Παιδικά Παπούτσια Μπάσκετ", price: "60.00", reviews: 20, rating: 4 },
    { id: 14, title: "Παιδικό Σετ Φόρμας", price: "35.00", reviews: 55, rating: 5 },
    { id: 15, title: "Παιδικό T-Shirt Βαμβακερό", price: "15.00", reviews: 15, rating: 3.5 },
    { id: 16, title: "Παιδικό Μπουφάν Αντιανεμικό", price: "50.00", reviews: 32, rating: 5 }
  ];

  const featuredShoes = [
    { id: 17, title: "Nike Air Zoom Running Shoes", price: "129.99", reviews: 150, rating: 5 },
    { id: 18, title: "Adidas Pro Basketball Shoes", price: "145.00", reviews: 95, rating: 4.5 },
    { id: 19, title: "ASICS Trail Running Shoes", price: "110.00", reviews: 80, rating: 4 },
    { id: 20, title: "Puma Daily Training Sneakers", price: "85.50", reviews: 210, rating: 5 }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
          <img src="brand.png" alt="Sportwear" className="hero-bg-img" />
          <Link href="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
      </div>

      {/* Features Section */}
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

      {/* Featured Products */}
      <div className="featured-products-section">
          <div className="section-header">
              <h2 className="section-title">Featured Products</h2>
              <a href="/products" className="view-all">View All &rarr;</a>
          </div>
          
          <div className="product-grid">
              {featuredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
          <div className="category-card">
              <img src="ανδρικα.png" alt="Men" className="category-img" />
              <Link href="/products">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="γυναικεια.png" alt="Women" className="category-img" />
              <Link href="/products">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="αγορι.png" alt="Boys" className="category-img" />
              <Link href="/products">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
          <div className="category-card">
              <img src="κοριτσι.png" alt="Girls" className="category-img" />
              <Link href="/products">
                <button className="category-btn">Shop Now</button>
              </Link>
          </div>
      </div>

      {/* Tabbed Products Section */}
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

          {/* Tab 1: Ανδρικά */}
          <div className={`product-grid tab-content ${activeTab === 'mens-products' ? 'active-content' : ''}`}>
              {mensProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>

          {/* Tab 2: Γυναικεία */}
          <div className={`product-grid tab-content ${activeTab === 'womens-products' ? 'active-content' : ''}`}>
               {womensProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>

          {/* Tab 3: Παιδικά */}
          <div className={`product-grid tab-content ${activeTab === 'kids-products' ? 'active-content' : ''}`}>
               {kidsProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Top Brands Section */}
      <div className="top-brands-wrapper">
          <h2 className="brands-title">TOP BRANDS</h2>
          
          <div className="categories-section brands-section">
              <div className="category-card">
                  <img src="adidas.jpg" alt="Brand 1" className="category-img" />
                  <button className="category-btn">Shop Now</button>
              </div>
              <div className="category-card">
                  <img src="nike.jpg" alt="Brand 2" className="category-img" />
                  <button className="category-btn">Shop Now</button>
              </div>
              <div className="category-card">
                  <img src="asiscs.jpg" alt="Brand 3" className="category-img" />
                  <button className="category-btn">Shop Now</button>
              </div>
              <div className="category-card">
                  <img src="new_balance.jpg" alt="Brand 4" className="category-img" />
                  <button className="category-btn">Shop Now</button>
              </div>
          </div>
      </div>

      {/* Featured Shoes */}
      <div className="featured-products-section">
          <div className="section-header">
              <h2 className="section-title">Shoes</h2>
              <a href="/products" className="view-all">View All &rarr;</a>
          </div>
          
          <div className="product-grid">
              {featuredShoes.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
              ))}
          </div>
      </div>

      {/* Brands Banner */}
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