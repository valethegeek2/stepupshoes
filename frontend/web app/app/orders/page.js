"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { ordersData } from "../../data/orders";

export default function OrdersPage() {
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  if (!user) {
    return (
      <div className="orders-container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Πρέπει να συνδεθείτε για να δείτε τις παραγγελίες σας.</h2>
        <Link href="/signin" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", marginTop: "20px", textDecoration: "none" }}>
          Σύνδεση
        </Link>
      </div>
    );
  }

  // 1. ΕΛΕΓΧΟΣ ΡΟΛΟΥ
  let displayOrders = user.role === "admin" 
    ? ordersData 
    : ordersData.filter(order => order.username === user.username);

  // 2. ΕΞΥΠΝΗ ΑΝΑΖΗΤΗΣΗ
  if (searchTerm) {
    displayOrders = displayOrders.filter(order => {
      const matchId = order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUsername = user.role === "admin" && order.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchId || matchUsername;
    });
  }

  // 3. Λογική Pagination (Σελιδοποίησης)
  const totalPages = Math.ceil(displayOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = displayOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="orders-container">
      
      {/* Breadcrumb & Title */}
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <span>ΠΑΡΑΓΓΕΛΙΕΣ</span>
        </p>
        <h1 className="main-title">ΠΑΡΑΓΓΕΛΙΕΣ</h1>
      </div>

      <div className="orders-table-card">
        
        {/* Search Bar */}
        <div className="table-top-bar">
          <div className="table-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder={user.role === "admin" ? "Search order ID or username..." : "Search order ID..."}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Ο Πίνακας */}
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                
                {/* ΝΕΑ ΣΤΗΛΗ: Εμφανίζεται ΜΟΝΟ στους Admins */}
                {user.role === "admin" && <th>CUSTOMER</th>}
                
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ITEMS</th>
                <th>PAYMENT METHOD</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-bold">{order.id}</td>
                    
                    {/* CUSTOMER: Εμφανίζεται ΜΟΝΟ στους Admins - Μαύρα γράμματα, χωρίς το @ */}
                    {user.role === "admin" && (
                      <td className="fw-bold" style={{ color: "#111" }}>{order.username}</td>
                    )}

                    <td className="text-gray">{order.date}</td>
                    <td className="fw-bold">€ {order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${
                        order.status === 'Ολοκληρώθηκε' ? 'bg-success' : 
                        order.status === 'Ακυρώθηκε' || order.status === 'Επιστράφηκε' ? 'bg-danger' : 'bg-warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-gray">{order.items.length} items</td>
                    <td className="text-gray">{order.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={user.role === "admin" ? "7" : "6"} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    Δεν βρέθηκαν παραγγελίες.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Σελιδοποίηση) */}
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