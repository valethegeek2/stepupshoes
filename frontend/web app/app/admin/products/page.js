"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
// Εισάγουμε τα mock δεδομένα των προϊόντων σου
import { productsData as products } from "../../../data/product";

export default function AdminProductsPage() {
  const { user } = useAuth();
  
  // Φορτώνουμε τα προϊόντα στο state για να μπορούμε να τα κάνουμε delete
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Αρχικοποίηση δεδομένων (Προσθέτουμε τυχαία quantity & brand αν δεν υπάρχουν)
  useEffect(() => {
    const initializedProducts = products.map(p => ({
      ...p,
      brand: p.brand || "Sportwear",
      quantity: p.quantity !== undefined ? p.quantity : Math.floor(Math.random() * 50),
    }));
    setProductList(initializedProducts);
  }, []);

  // Έλεγχος ασφαλείας: ΜΟΝΟ admin μπαίνουν εδώ!
  if (!user || user.role !== "admin") {
    return (
      <div className="orders-container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Δεν έχετε δικαίωμα πρόσβασης σε αυτή τη σελίδα.</h2>
        <Link href="/" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", marginTop: "20px", textDecoration: "none" }}>
          Επιστροφή στην Αρχική
        </Link>
      </div>
    );
  }

  // 1. Λειτουργία Διαγραφής (Delete)
  const handleDelete = (id) => {
    if (window.confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;")) {
      setProductList(prev => prev.filter(p => p.id !== id));
    }
  };

  // 2. ΕΞΥΠΝΗ ΑΝΑΖΗΤΗΣΗ
  let displayProducts = productList;
  if (searchTerm) {
    displayProducts = displayProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.id.toString().includes(searchTerm)
    );
  }

  // 3. Λογική Pagination (Σελιδοποίησης)
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = displayProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="orders-container">
      
      {/* Breadcrumb & Title */}
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <span>ΠΡΟΪΟΝΤΑ</span>
        </p>
        <h1 className="main-title">ΠΡΟΪΟΝΤΑ</h1>
      </div>

      <div className="orders-table-card">
        
        {/* Top Bar με Search και Add Product Button */}
        <div className="table-top-bar">
          <div className="table-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search product..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button className="add-product-btn" onClick={() => alert("Εδώ θα πηγαίνει στη φόρμα νέου προϊόντος!")}>
            <i className="fa-solid fa-plus"></i> Add Product
          </button>
        </div>

        {/* Ο Πίνακας */}
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  const isOutOfStock = product.quantity === 0;

                  return (
                    <tr key={product.id}>
                      <td className="text-gray fw-bold">#{product.id}</td>
                      
                      {/* Κελί Προϊόντος με Εικόνα */}
                      <td>
                        <div className="product-cell">
                          <img src={product.image || "https://via.placeholder.com/40"} alt={product.title} />
                          <span className="fw-bold">{product.title}</span>
                        </div>
                      </td>

                      <td className="text-gray">{product.category}</td>
                      <td className="text-gray">{product.brand}</td>
                      <td className="fw-bold">{product.quantity}</td>
                      <td className="fw-bold">€ {Number(product.price).toFixed(2)}</td>
                      
                      {/* Status Badge */}
                      <td>
                        <span className={`status-badge ${isOutOfStock ? 'bg-danger' : 'bg-success'}`}>
                          {isOutOfStock ? "Out of Stock" : "In Stock"}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div className="action-btns">
                          <button className="action-btn edit-btn" title="Επεξεργασία">
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button className="action-btn delete-btn" title="Διαγραφή" onClick={() => handleDelete(product.id)}>
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    Δεν βρέθηκαν προϊόντα.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button 
              className="page-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt; Previous
            </button>
            
            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button 
                  key={index}
                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              className="page-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next &gt;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}