"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // State για τα Tabs των προϊόντων
  const [activeTab, setActiveTab] = useState("mens-products");

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
              <a href="#" className="view-all">View All &rarr;</a>
          </div>
          
          <div className="product-grid">
              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Product 1" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Pro Running Shoes High Quality Value Buy</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                          <span>(50)</span>
                      </div>
                      <p className="product-price">$89.99</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Product 2" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Dry-Fit Training T-Shirt Breathable</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                          <span>(120)</span>
                      </div>
                      <p className="product-price">$29.99</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Product 3" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Athletic Jogger Pants For Men Ultra HD</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                          <span>(100)</span>
                      </div>
                      <p className="product-price">$45.00</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Product 4" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Waterproof Gym Bag with Flash Pocket</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                          <span>(70)</span>
                      </div>
                      <p className="product-price">$35.50</p>
                  </div>
              </div>
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
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Ανδρικά Παπούτσια Τρεξίματος</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(85)</span></div>
                      <p className="product-price">$120.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Ανδρικό Αθλητικό Μπουφάν</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><span>(42)</span></div>
                      <p className="product-price">$95.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Ανδρικά Sneakers</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><span>(110)</span></div>
                      <p className="product-price">$65.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Ανδικό Παντελόνι Φόρμας</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(24)</span></div>
                      <p className="product-price">$45.00</p>
                  </div>
              </div>
          </div>

          {/* Tab 2: Γυναικεία */}
          <div className={`product-grid tab-content ${activeTab === 'womens-products' ? 'active-content' : ''}`}>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Γυναικείο Κολάν Προπόνησης</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(60)</span></div>
                      <p className="product-price">$40.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Γυναικεία Αθλητικά Παπούτσια</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(130)</span></div>
                      <p className="product-price">$110.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Γυναικείο Αθλητικό Μπουστάκι</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i><span>(35)</span></div>
                      <p className="product-price">$25.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Γυναικεία Τσάντα Γυμναστηρίου</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(45)</span></div>
                      <p className="product-price">$55.00</p>
                  </div>
              </div>
          </div>

          {/* Tab 3: Παιδικά */}
          <div className={`product-grid tab-content ${activeTab === 'kids-products' ? 'active-content' : ''}`}>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Παιδικά Παπούτσια Μπάσκετ</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><span>(20)</span></div>
                      <p className="product-price">$60.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Παιδικό Σετ Φόρμας</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(55)</span></div>
                      <p className="product-price">$35.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Παιδικό T-Shirt Βαμβακερό</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i><span>(15)</span></div>
                      <p className="product-price">$15.00</p>
                  </div>
              </div>
              <div className="product-card">
                  <div className="img-placeholder"><i className="fa-regular fa-heart card-heart"></i><img src="" alt="" /></div>
                  <div className="product-info">
                      <h3 className="product-title">Παιδικό Μπουφάν Αντιανεμικό</h3>
                      <div className="product-rating"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><span>(32)</span></div>
                      <p className="product-price">$50.00</p>
                  </div>
              </div>
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
              <a href="#" className="view-all">View All &rarr;</a>
          </div>
          
          <div className="product-grid">
              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Running Shoes" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Nike Air Zoom Running Shoes</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                          <span>(150)</span>
                      </div>
                      <p className="product-price">$129.99</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Basketball Shoes" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Adidas Pro Basketball Shoes</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                          <span>(95)</span>
                      </div>
                      <p className="product-price">$145.00</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Trail Running Shoes" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">ASICS Trail Running Shoes</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                          <span>(80)</span>
                      </div>
                      <p className="product-price">$110.00</p>
                  </div>
              </div>

              <div className="product-card">
                  <div className="img-placeholder">
                      <i className="fa-regular fa-heart card-heart"></i>
                      <img src="" alt="Training Shoes" />
                  </div>
                  <div className="product-info">
                      <h3 className="product-title">Puma Daily Training Sneakers</h3>
                      <div className="product-rating">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                          <span>(210)</span>
                      </div>
                      <p className="product-price">$85.50</p>
                  </div>
              </div>
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