"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../../../context/AuthContext";
import { productsData } from "../../../../../data/product";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); 
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // Initialize form state
  const [formData, setFormData] = useState({
    title: "",
    description: "", 
    price: "",
    category: "shoes",
    gender: "men",
    tags: "",
    brand: "",
    quantity: "",
    status: "In Stock",
    image: ""
  });

  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});

  // Load existing product data on mount
  useEffect(() => {
    if (params.id) {
      const productToEdit = productsData.find(p => p.id.toString() === params.id.toString());
      
      if (productToEdit) {
        setFormData({
          title: productToEdit.title || "",
          description: productToEdit.description || "",
          price: productToEdit.price || "",
          category: productToEdit.category || "shoes",
          gender: productToEdit.gender || "men",
          tags: productToEdit.tags || "",
          brand: productToEdit.brand || "", 
          quantity: productToEdit.quantity !== undefined ? productToEdit.quantity : 15,
          status: productToEdit.status || (productToEdit.quantity === 0 ? "Out of Stock" : "In Stock"), 
          image: productToEdit.image || ""
        });
        
        if (productToEdit.image) {
          setFileName("Υπάρχουσα εικόνα προϊόντος");
        }
      }
    }
  }, [params.id]);

  // Real-time validation for duplicate products
  useEffect(() => {
    const newErrors = {};

    if (formData.title.trim() !== "") {
      const titleExists = productsData.find(p => 
        p.title.toLowerCase() === formData.title.trim().toLowerCase() && 
        p.id.toString() !== params?.id?.toString()
      );
      if (titleExists) {
        newErrors.title = "Υπάρχει ήδη το Όνομα σε άλλο προϊόν";
      }
    }

    if (formData.description.trim() !== "") {
      const descExists = productsData.find(p => 
        p.description && 
        p.description.toLowerCase() === formData.description.trim().toLowerCase() &&
        p.id.toString() !== params?.id?.toString()
      );
      if (descExists) {
        newErrors.description = "Υπάρχει ήδη η Περιγραφή σε άλλο προϊόν";
      }
    }

    setErrors(newErrors);
  }, [formData.title, formData.description, params?.id]);

  // Restrict access to admin users only
  if (!user || user.role !== "admin") {
    return (
      <div className="orders-container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Δεν έχετε δικαίωμα πρόσβασης.</h2>
        <Link href="/" className="summary-btn" style={{ display: "inline-block", width: "auto", padding: "15px 30px", marginTop: "20px", textDecoration: "none" }}>Επιστροφή</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle local image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      alert("Προσοχή! Διορθώστε τα πεδία με το κόκκινο χρώμα πριν αποθηκεύσετε.");
      return;
    }

    console.log("Αποθηκεύτηκαν οι αλλαγές:", formData);
    alert("Οι αλλαγές αποθηκεύτηκαν με επιτυχία!");
    router.push("/admin/products"); 
  };

  return (
    <div className="admin-form-container">
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <Link href="/admin/products">ΠΡΟΪΟΝΤΑ</Link> - <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
        </p>
        <h1 className="main-title">Επεξεργασία Προϊόντος #{params.id}</h1>
      </div>

      <div className="admin-form-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="vertical-form-layout">
            
            <div className="admin-input-group">
              <label style={{ color: errors.title ? '#ef4444' : '#333' }}>Όνομα Προϊόντος *</label>
              <input 
                type="text" 
                name="title" 
                required 
                value={formData.title} 
                onChange={handleChange} 
                style={{ borderColor: errors.title ? '#ef4444' : '#ddd', backgroundColor: errors.title ? '#fef2f2' : '#fafafa' }}
              />
              {errors.title && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0, fontWeight: 'bold' }}>{errors.title}</p>}
            </div>

            <div className="admin-input-group">
              <label style={{ color: errors.description ? '#ef4444' : '#333' }}>Περιγραφή</label>
              <textarea 
                name="description"
                rows="4" 
                value={formData.description}
                onChange={handleChange}
                style={{ borderColor: errors.description ? '#ef4444' : '#ddd', backgroundColor: errors.description ? '#fef2f2' : '#fafafa' }}
              ></textarea>
              {errors.description && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0, fontWeight: 'bold' }}>{errors.description}</p>}
            </div>

            <div className="form-row-2">
              <div className="admin-input-group">
                <label>Μάρκα (Brand) *</label>
                <input type="text" name="brand" required value={formData.brand} onChange={handleChange} />
              </div>
              <div className="admin-input-group">
                <label>Κατηγορία (Category) *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="shoes">Παπούτσια</option>
                  <option value="clothing">Ρούχα</option>
                  <option value="gym-equipment">Όργανα Γυμναστικής</option>
                  <option value="accessories">Αξεσουάρ</option>
                </select>
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '20px' }}>
              <div className="admin-input-group">
                <label>Φύλο (Gender) *</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="men">Ανδρικά</option>
                  <option value="women">Γυναικεία</option>
                  <option value="boy">Αγόρι</option>
                  <option value="girl">Κορίτσι</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div className="admin-input-group">
                <label>Τιμή (€) *</label>
                <input type="number" name="price" step="0.01" required value={formData.price} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '20px' }}>
              <div className="admin-input-group">
                <label>Απόθεμα (Τεμάχια) *</label>
                <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="admin-input-group">
                <label>Κατάσταση (Status) *</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group" style={{ marginTop: '20px' }}>
              <label>Tags (Λέξεις-κλειδιά)</label>
              <input 
                type="text" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="π.χ. running, shoes, nike" 
              />
            </div>

            <div className="admin-input-group" style={{ marginTop: '20px' }}>
              <label>Φωτογραφία Προϊόντος</label>
              
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
              
              <input 
                type="text" 
                readOnly 
                value={fileName || "Δεν επιλέχθηκε νέα εικόνα..."} 
                onClick={triggerFileSelect}
                style={{ cursor: 'pointer', backgroundColor: '#fafafa' }}
              />

              <button 
                type="button" 
                className="select-file-btn" 
                onClick={triggerFileSelect}
                style={{ marginTop: '10px', alignSelf: 'flex-start' }}
              >
                <i className="fa-solid fa-folder-open"></i> Αλλαγή Εικόνας...
              </button>
            </div>

            {formData.image && (
              <div className="image-preview" style={{ alignSelf: 'flex-start', marginTop: '15px' }}>
                <img src={formData.image} alt="Preview" />
              </div>
            )}

          </div>

          <div className="admin-form-actions">
            <button type="button" className="cancel-btn" onClick={() => router.push("/admin/products")}>Ακύρωση</button>
            <button type="submit" className="save-btn"><i className="fa-solid fa-floppy-disk"></i> Αποθήκευση Αλλαγών</button>
          </div>

        </form>
      </div>
    </div>
  );
}