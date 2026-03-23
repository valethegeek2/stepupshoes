"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Configuration, AuthControllerApi } from '@/backend/generated';
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter(); // Για να αλλάζουμε σελίδα

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const config = new Configuration({ basePath: 'http://localhost:8080' });
      const authApi = new AuthControllerApi(config);

      const requestOpts = await authApi.loginRequestOpts({
        loginRequestDTO: {
          username,
          password,
        }
      });

      const rawResponse = await authApi.request(requestOpts);
      const data = await rawResponse.json();

      if (data.accessToken) {
        localStorage.setItem('jwt', data.accessToken);
        // login(username);
        login(username, data.accessToken);
        router.push('/');
        // router.back();
      } else {
        setError("Λάθος Username ή Password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Λάθος Username ή Password!");
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault(); // Σταματάει το refresh της σελίδας
  //   const success = login(username, password);
    
  //   if (success) {
  //     router.push("/"); // Αν μπει σωστά, πάει στην Αρχική!
  //   } else {
  //     setError("Λάθος Username ή Password!");
  //   }
  // };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <Link href="/" className="auth-logo">
          Sportwear<span className="dot">.</span>
        </Link>

        {/* Συνδέουμε τη φόρμα με τη συνάρτησή μας */}
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