"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
// Φέρνουμε τα προϊόντα για να κάνουμε τον έλεγχο
import { productsData } from "../../../../data/product";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // --- ΕΝΗΜΕΡΩΜΕΝΟ STATE ΜΕ CATEGORY, GENDER ΚΑΙ TAGS ---
  const [formData, setFormData] = useState({
    title: "",
    description: "", 
    price: "",
    category: "shoes", // Νέα προεπιλογή
    gender: "men",     // Νέο πεδίο
    tags: "",          // Νέο πεδίο
    brand: "",
    quantity: "",
    image: "" 
  });

  const [fileName, setFileName] = useState("Δεν επιλέχθηκε αρχείο");
  const [errors, setErrors] = useState({}); 

  // --- O ΕΛΕΓΧΟΣ ΓΙΑ ΤΑ ΔΙΠΛΟΤΥΠΑ ---
  useEffect(() => {
    const newErrors = {};

    if (formData.title.trim() !== "") {
      const titleExists = productsData.find(p => p.title.toLowerCase() === formData.title.trim().toLowerCase());
      if (titleExists) {
        newErrors.title = "Υπάρχει ήδη το Όνομα σε άλλο προϊόν";
      }
    }

    if (formData.description.trim() !== "") {
      const descExists = productsData.find(p => p.description && p.description.toLowerCase() === formData.description.trim().toLowerCase());
      if (descExists) {
        newErrors.description = "Υπάρχει ήδη η Περιγραφή σε άλλο προϊόν";
      }
    }

    setErrors(newErrors);
  }, [formData.title, formData.description]);

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

    console.log("Νέο Προϊόν προς αποθήκευση:", formData);
    alert("Το προϊόν προστέθηκε με επιτυχία!");
    router.push("/admin/products"); 
  };

  return (
    <div className="admin-form-container">
      <div className="orders-page-header">
        <p className="breadcrumb">
          <Link href="/">Αρχική</Link> - <Link href="/admin/products">ΠΡΟΪΟΝΤΑ</Link> - <span>ΠΡΟΣΘΗΚΗ ΝΕΟΥ</span>
        </p>
        <h1 className="main-title">Προσθήκη Νέου Προϊόντος</h1>
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
                placeholder="π.χ. Nike Air Zoom" 
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
                placeholder="Γράψε λίγα λόγια για το προϊόν..."
                style={{ borderColor: errors.description ? '#ef4444' : '#ddd', backgroundColor: errors.description ? '#fef2f2' : '#fafafa' }}
              ></textarea>
              {errors.description && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: 0, fontWeight: 'bold' }}>{errors.description}</p>}
            </div>

            <div className="form-row-2">
              <div className="admin-input-group">
                <label>Μάρκα (Brand) *</label>
                <input type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="π.χ. Nike, Adidas" />
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

            {/* ΝΕΑ ΓΡΑΜΜΗ ΜΕ ΦΥΛΟ ΚΑΙ ΤΙΜΗ */}
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
                <input type="number" name="price" step="0.01" required value={formData.price} onChange={handleChange} placeholder="π.χ. 49.99" />
              </div>
            </div>

            {/* ΝΕΑ ΓΡΑΜΜΗ ΜΕ ΑΠΟΘΕΜΑ ΚΑΙ TAGS */}
            <div className="form-row-2" style={{ marginTop: '20px' }}>
              <div className="admin-input-group">
                <label>Απόθεμα (Τεμάχια) *</label>
                <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} placeholder="π.χ. 15" />
              </div>
              <div className="admin-input-group">
                <label>Tags (Λέξεις-κλειδιά)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange} 
                  placeholder="π.χ. running, shoes, nike" 
                />
              </div>
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
              
              <div className="custom-file-display">
                {fileName}
              </div>

              <button 
                type="button" 
                className="select-file-btn" 
                onClick={triggerFileSelect}
              >
                <i className="fa-solid fa-folder-open"></i> Επιλογή Αρχείου...
              </button>

              <p className="help-text" style={{marginTop: '8px'}}>Επιλέξτε μια φωτογραφία από τον υπολογιστή σας.</p>
            </div>

            {formData.image && (
              <div className="image-preview" style={{ alignSelf: 'flex-start' }}>
                <img src={formData.image} alt="Preview" />
              </div>
            )}

          </div>

          <div className="admin-form-actions">
            <button type="button" className="cancel-btn" onClick={() => router.push("/admin/products")}>Ακύρωση</button>
            <button type="submit" className="save-btn"><i className="fa-solid fa-floppy-disk"></i> Αποθήκευση Προϊόντος</button>
          </div>

        </form>
      </div>
    </div>
  );
}