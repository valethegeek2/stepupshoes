"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ordersData } from "../../data/orders";

export default function OrdersPage() {
  const router = useRouter(); 
  const { user } = useAuth();
  
  const [ordersList, setOrdersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Initialize mock data
  useEffect(() => {
    setOrdersList(ordersData);
  }, []);

  // Guard clause for unauthenticated users
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

  // Handle order cancellation (Customer only)
  const handleCancelOrder = (orderId, currentStatus) => {
    const allowedStatuses = ["Σε εκκρεμότητα", "Επιβεβαιωμένη"];
    
    if (allowedStatuses.includes(currentStatus)) {
      if (window.confirm("Είστε σίγουροι ότι θέλετε να ακυρώσετε αυτή την παραγγελία;")) {
        setOrdersList(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: "Ακυρώθηκε" } : order
        ));
      }
    } else {
      alert("Δεν μπορεί να ακυρωθεί η παραγγελία στο στάδιο που βρίσκεται.");
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'Παραδόθηκε') return 'bg-success'; 
    if (status === 'Ακυρώθηκε' || status === 'Απέτυχε') return 'bg-danger'; 
    return 'bg-warning'; 
  };

  // Filter orders based on user role
  let displayOrders = user.role === "admin" 
    ? ordersList 
    : ordersList.filter(order => order.username === user.username);

  // Apply search filter
  if (searchTerm) {
    displayOrders = displayOrders.filter(order => {
      const matchId = order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUsername = user.role === "admin" && order.username.toLowerCase().includes(searchTerm.toLowerCase());
      return matchId || matchUsername;
    });
  }

  // Pagination logic
  const totalPages = Math.ceil(displayOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = displayOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="orders-container">
      
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <span>ΠΑΡΑΓΓΕΛΙΕΣ</span>
        </p>
        <h1 className="main-title">ΠΑΡΑΓΓΕΛΙΕΣ</h1>
      </div>

      <div className="orders-table-card">
        
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

        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                {user.role === "admin" && <th>CUSTOMER</th>}
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ITEMS</th>
                <th>PAYMENT METHOD</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-bold">{order.id}</td>
                    
                    {user.role === "admin" && (
                      <td className="fw-bold" style={{ color: "#111" }}>{order.username}</td>
                    )}

                    <td className="text-gray">{order.date}</td>
                    <td className="fw-bold">€ {order.total.toFixed(2)}</td>
                    
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    
                    <td className="text-gray">{order.items.length} items</td>
                    <td className="text-gray">{order.paymentMethod}</td>
                    
                    <td>
                      {user.role === "admin" ? (
                        <button 
                          className="edit-order-btn"
                          onClick={() => router.push(`/orders/edit/${order.id}`)}
                        >
                          <i className="fa-solid fa-pen"></i> Edit
                        </button>
                      ) : (
                        <button 
                          className="cancel-order-btn"
                          onClick={() => handleCancelOrder(order.id, order.status)}
                          title="Ακύρωση Παραγγελίας"
                        >
                          <i className="fa-solid fa-xmark"></i> Cancel
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={user.role === "admin" ? "8" : "7"} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    Δεν βρέθηκαν παραγγελίες.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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