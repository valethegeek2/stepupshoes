"use client";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <Link href="/" className="auth-logo">
          Sportwear<span className="dot">.</span>
        </Link>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Choose a username" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>

          {/* --- ΝΕΟ: Checkbox για Admin --- */}
          <div className="auth-checkbox">
            <label>
              <input type="checkbox" name="isAdmin" />
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