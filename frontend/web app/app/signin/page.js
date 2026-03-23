"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); 
    
    const success = login(username, password);
    
    if (success) {
      // Redirect to home on successful login
      router.push("/"); 
    } else {
      setError("Λάθος Username ή Password!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <Link href="/" className="auth-logo">
          Sportwear<span className="dot">.</span>
        </Link>

        <form className="auth-form" onSubmit={handleLogin}>
          
          {error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>}

          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer-link">
          Don't have an account? <Link href="/signup">Create account</Link>
        </div>
        
      </div>
    </div>
  );
}