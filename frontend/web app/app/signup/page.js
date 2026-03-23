"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Configuration, AuthControllerApi } from '@/backend/generated';
// Εισάγουμε τα δεδομένα των χρηστών για τον έλεγχο
import { usersData } from "../../data/users";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" 
  });

  const [errors, setErrors] = useState({});

  // --- Ο "ΖΩΝΤΑΝΟΣ" ΕΛΕΓΧΟΣ ---
  useEffect(() => {
    const newErrors = {};

    // 1. Έλεγχος Username
    if (formData.username.trim() !== "") {
      const usernameExists = usersData.find(
        u => u.username.toLowerCase() === formData.username.trim().toLowerCase()
      );
      if (usernameExists) {
        newErrors.username = "This username already exists.";
      }
    }

    // 2. Έλεγχος Email (ΚΑΙ για το @gmail.com ΚΑΙ για το αν υπάρχει ήδη)
    if (formData.email.trim() !== "") {
      const emailValue = formData.email.trim().toLowerCase();
      
      // Πρώτα ελέγχουμε αν τελειώνει σε @gmail.com
      if (!emailValue.endsWith("@gmail.com")) {
        newErrors.email = "Email must end with @gmail.com.";
      } else {
        // Αν είναι σωστό gmail, ελέγχουμε αν είναι πιασμένο
        const emailExists = usersData.find(
          u => u.email.toLowerCase() === emailValue
        );
        if (emailExists) {
          newErrors.email = "This email is already in use.";
        }
      }
    }

    // 3. Έλεγχος Κωδικών (Αν δεν ταιριάζουν)
    if (formData.confirmPassword !== "" && formData.password !== formData.confirmPassword) {
      newErrors.passwordMismatch = "Passwords do not match.";
    }

    setErrors(newErrors);
  }, [formData.username, formData.email, formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.checked ? "admin" : "user" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors in red before continuing.");
      return;
    }

    try {
      const config = new Configuration({ basePath: 'http://localhost:8080' });
      const authApi = new AuthControllerApi(config);

      const requestOpts = await authApi.registerRequestOpts({
        registerRequestDTO: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: "null",
          lastName: "null",
          address: "null",
          city: "null",
          postalCode: "null",
          phoneNumber: "null",
        }
      });

      const rawResponse = await authApi.request(requestOpts);
      alert("Registration successful!");
      router.push("/signin");
    } catch (err) {
      console.error("Register error:", err);
      alert("Σφάλμα κατά την εγγραφή.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <Link href="/" className="auth-logo">
          Sportwear<span className="dot">.</span>
        </Link>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label style={{ color: errors.username ? "#ef4444" : "#333" }}>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="Choose a username" 
              required 
              value={formData.username}
              onChange={handleChange}
              style={{ 
                borderColor: errors.username ? "#ef4444" : "#ccc", 
                backgroundColor: errors.username ? "#fef2f2" : "#fff" 
              }}
            />
            {errors.username && <p style={{ color: "#ef4444", fontSize: "12px", margin: 0, fontWeight: "bold" }}>{errors.username}</p>}
          </div>

          <div className="input-group">
            <label style={{ color: errors.email ? "#ef4444" : "#333" }}>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required 
              value={formData.email}
              onChange={handleChange}
              style={{ 
                borderColor: errors.email ? "#ef4444" : "#ccc", 
                backgroundColor: errors.email ? "#fef2f2" : "#fff" 
              }}
            />
            {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", margin: 0, fontWeight: "bold" }}>{errors.email}</p>}
          </div>

          <div className="input-group">
            <label style={{ color: errors.passwordMismatch ? "#ef4444" : "#333" }}>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Create a password" 
              required 
              value={formData.password}
              onChange={handleChange}
              style={{ 
                borderColor: errors.passwordMismatch ? "#ef4444" : "#ccc", 
                backgroundColor: errors.passwordMismatch ? "#fef2f2" : "#fff" 
              }}
            />
          </div>

          <div className="input-group">
            <label style={{ color: errors.passwordMismatch ? "#ef4444" : "#333" }}>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm your password" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ 
                borderColor: errors.passwordMismatch ? "#ef4444" : "#ccc", 
                backgroundColor: errors.passwordMismatch ? "#fef2f2" : "#fff" 
              }}
            />
            {errors.passwordMismatch && <p style={{ color: "#ef4444", fontSize: "12px", margin: 0, fontWeight: "bold" }}>{errors.passwordMismatch}</p>}
          </div>

          <div className="auth-checkbox">
            <label>
              <input 
                type="checkbox" 
                name="isAdmin" 
                checked={formData.role === "admin"}
                onChange={handleRoleChange}
              />
              Admin
            </label>
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-footer-link">
          Already have an account? <Link href="/signin">Sign in</Link>
        </div>
        
      </div>
    </div>
  );
}