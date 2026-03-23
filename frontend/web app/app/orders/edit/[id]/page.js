"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { ordersData } from "../../../../data/orders";
import { productsData } from "../../../../data/product";

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  // Keep a copy of initial data to track changes
  const [initialData, setInitialData] = useState(null);

  const [formData, setFormData] = useState({
    status: "Σε εκκρεμότητα",
    delivery: {
      firstName: "",
      lastName: "",
      city: "",
      address: "",
      streetNumber: "",
      postalCode: "",
      phone: ""
    },
    items: []
  });

  useEffect(() => {
    if (params.id) {
      const orderToEdit = ordersData.find(o => o.id === params.id);
      
      if (orderToEdit) {
        const defaultDelivery = orderToEdit.delivery || {
          firstName: "Πελάτης",
          lastName: orderToEdit.username || "",
          city: "Αθήνα",
          address: "Ερμού",
          streetNumber: "15",
          postalCode: "10563",
          phone: "6900000000"
        };
        const defaultItems = orderToEdit.items || [];

        // Store initial state
        setInitialData({
          delivery: defaultDelivery,
          items: defaultItems
        });

        setFormData({
          status: orderToEdit.status || "Σε εκκρεμότητα",
          delivery: defaultDelivery,
          items: defaultItems
        });
      }
    }
  }, [params.id]);

  // Guard clause for non-admin users
  if (!user || user.role !== "admin") {
    return (
      <div className="orders-container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Δεν έχετε δικαίωμα πρόσβασης.</h2>
        <Link href="/" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", marginTop: "20px", textDecoration: "none" }}>Επιστροφή</Link>
      </div>
    );
  }

  const handleDeliveryChange = (e) => {
    setFormData({
      ...formData,
      delivery: { ...formData.delivery, [e.target.name]: e.target.value }
    });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: "", quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const product = productsData.find(p => p.title.toLowerCase() === (item.title || "").trim().toLowerCase());
      const price = product ? product.price : 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate products before saving
    const hasInvalidProducts = formData.items.some(item => 
      !productsData.some(p => p.title.toLowerCase() === (item.title || "").trim().toLowerCase())
    );

    if (hasInvalidProducts) {
      alert("Προσοχή! Ένα ή περισσότερα προϊόντα δεν βρέθηκαν στη βάση δεδομένων. Διορθώστε τα πεδία με το κόκκινο χρώμα.");
      return; 
    }

    // Check for stock availability
    const hasStockIssues = formData.items.some(item => {
      const product = productsData.find(p => p.title.toLowerCase() === (item.title || "").trim().toLowerCase());
      return product && item.quantity > product.quantity;
    });

    if (hasStockIssues) {
      alert("Προσοχή! Η ποσότητα κάποιου προϊόντος υπερβαίνει το διαθέσιμο απόθεμα. Παρακαλώ μειώστε την ποσότητα στο κόκκινο πεδίο.");
      return;
    }

    // Compare current data with initial data using JSON stringify
    const deliveryChanged = JSON.stringify(initialData.delivery) !== JSON.stringify(formData.delivery);
    const itemsChanged = JSON.stringify(initialData.items) !== JSON.stringify(formData.items);

    let finalStatus = formData.status;
    let statusMessage = "";

    // Revert status to pending if delivery or items changed
    if (deliveryChanged || itemsChanged) {
      finalStatus = "Σε εκκρεμότητα";
      statusMessage = "\n\nΛόγω αλλαγών στα προϊόντα ή στα στοιχεία παράδοσης, η κατάσταση της παραγγελίας επέστρεψε σε 'Σε εκκρεμότητα'.";
    }

    const finalTotal = calculateTotal();
    
    // Final payload to be saved
    const finalOrderToSave = {
      ...formData,
      status: finalStatus,
      total: finalTotal
    };

    console.log("Αποθηκεύτηκαν οι αλλαγές:", finalOrderToSave);
    
    alert(`Η παραγγελία ενημερώθηκε με επιτυχία!\nΝέο Σύνολο: €${finalTotal.toFixed(2)}${statusMessage}`);
    
    router.push("/orders"); 
  };

  return (
    <div className="admin-form-container">
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <Link href="/orders">ΠΑΡΑΓΓΕΛΙΕΣ</Link> - <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
        </p>
        <h1 className="main-title">Επεξεργασία Παραγγελίας {params.id}</h1>
      </div>

      <div className="admin-form-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="vertical-form-layout">
            
            <h3 className="section-title">Κατάσταση Παραγγελίας</h3>
            <div className="admin-input-group" style={{ marginBottom: '30px' }}>
              <select name="status" value={formData.status} onChange={handleStatusChange} style={{ fontWeight: 'bold' }}>
                <option value="Σε εκκρεμότητα">Σε εκκρεμότητα</option>
                <option value="Επιβεβαιωμένη">Επιβεβαιωμένη</option>
                <option value="Σε επεξεργασία">Σε επεξεργασία</option>
                <option value="Αποστάλθηκε">Αποστάλθηκε</option>
                <option value="Παραδόθηκε">Παραδόθηκε</option>
                <option value="Ακυρώθηκε">Ακυρώθηκε</option>
                <option value="Απέτυχε">Απέτυχε</option>
              </select>
              <p className="help-text">Αν κάνετε αλλαγές στα προϊόντα ή τη διεύθυνση, η κατάσταση θα επιστρέψει αυτόματα σε "Σε εκκρεμότητα".</p>
            </div>

            <h3 className="section-title">Στοιχεία παραγγελίας</h3>
            
            <div className="form-row-2">
              <div className="admin-input-group">
                <input type="text" name="firstName" value={formData.delivery.firstName} onChange={handleDeliveryChange} placeholder="Όνομα" />
              </div>
              <div className="admin-input-group">
                <input type="text" name="lastName" value={formData.delivery.lastName} onChange={handleDeliveryChange} placeholder="Επώνυμο" />
              </div>
            </div>

            <div className="admin-input-group">
              <input type="text" name="city" value={formData.delivery.city} onChange={handleDeliveryChange} placeholder="Πόλη" />
            </div>

            <div className="form-row-2">
              <div className="admin-input-group">
                <input type="text" name="address" value={formData.delivery.address} onChange={handleDeliveryChange} placeholder="Διεύθυνση" />
              </div>
              <div className="admin-input-group">
                <input type="text" name="streetNumber" value={formData.delivery.streetNumber} onChange={handleDeliveryChange} placeholder="Οδός και Αριθμός" />
              </div>
            </div>

            <div className="form-row-2">
              <div className="admin-input-group">
                <input type="text" name="postalCode" value={formData.delivery.postalCode} onChange={handleDeliveryChange} placeholder="Τ.Κ." />
              </div>
              <div className="admin-input-group">
                <input type="text" name="phone" value={formData.delivery.phone} onChange={handleDeliveryChange} placeholder="Τηλέφωνο (Κινητό)" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '15px', borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#111' }}>Προϊόντα Παραγγελίας</h3>
              <button type="button" onClick={handleAddItem} style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className="fa-solid fa-plus"></i> Νέο Προϊόν
              </button>
            </div>

            <datalist id="available-products">
              {productsData.map(p => (
                <option key={p.id} value={p.title} />
              ))}
            </datalist>

            {formData.items.map((item, index) => {
              // Find matching product in database
              const matchedProduct = productsData.find(p => p.title.toLowerCase() === (item.title || "").trim().toLowerCase());
              
              // Validation and stock checks
              const isValidProduct = item.title === "" || !!matchedProduct;
              const maxStock = matchedProduct ? matchedProduct.quantity : 0;
              const isStockExceeded = matchedProduct && item.quantity > maxStock;
              
              return (
                <div key={index} style={{ 
                  display: 'flex', 
                  gap: '15px', 
                  alignItems: 'center', 
                  marginBottom: '15px', 
                  background: (isValidProduct && !isStockExceeded) ? '#fafafa' : '#fef2f2', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  border: '1px solid', 
                  borderColor: (isValidProduct && !isStockExceeded) ? '#eaeaea' : '#ef4444' 
                }}>
                  
                  <div className="admin-input-group" style={{ marginBottom: 0, flex: 2 }}>
                    <label style={{ fontSize: '12px', color: isValidProduct ? '#666' : '#ef4444' }}>
                      {isValidProduct ? "Όνομα Προϊόντος" : "Το προϊόν δεν βρέθηκε!"}
                    </label>
                    <input 
                      type="text" 
                      list="available-products" 
                      value={item.title} 
                      onChange={(e) => handleItemChange(index, "title", e.target.value)} 
                      placeholder="π.χ. Nike Air Zoom" 
                      style={{ 
                        borderColor: isValidProduct ? '#ddd' : '#ef4444',
                        backgroundColor: isValidProduct ? '#fafafa' : '#fff'
                      }}
                    />
                  </div>
                  
                  <div className="admin-input-group" style={{ marginBottom: 0, width: '100px' }}>
                    <label style={{ fontSize: '12px', color: isStockExceeded ? '#ef4444' : '#666' }}>
                      {isStockExceeded ? `Max: ${maxStock}` : "Ποσότητα"}
                    </label>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity} 
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)} 
                      style={{
                        borderColor: isStockExceeded ? '#ef4444' : '#ddd',
                        backgroundColor: isStockExceeded ? '#fef2f2' : '#fff',
                        color: isStockExceeded ? '#ef4444' : 'inherit'
                      }}
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={() => handleRemoveItem(index)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', marginTop: '15px', transition: 'transform 0.2s' }}
                    title="Αφαίρεση Προϊόντος"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', marginTop: '10px' }}>
               <span style={{ fontSize: '16px', color: '#555', fontWeight: 'bold' }}>Υπολογισμένο Σύνολο:</span>
               <span style={{ fontSize: '22px', color: '#f59e0b', fontWeight: '900' }}>€ {calculateTotal().toFixed(2)}</span>
            </div>

            {formData.items.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', padding: '20px' }}>Δεν υπάρχουν προϊόντα στην παραγγελία.</p>
            )}

          </div>

          <div className="admin-form-actions">
            <button type="button" className="cancel-btn" onClick={() => router.push("/orders")}>Ακύρωση</button>
            <button type="submit" className="save-btn"><i className="fa-solid fa-floppy-disk"></i> Αποθήκευση Παραγγελίας</button>
          </div>

        </form>
      </div>
    </div>
  );
}