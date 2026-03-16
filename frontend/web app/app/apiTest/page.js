"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/api/productApi";
import { login, logout } from "@/api/authApi";
import { adminCreateProduct, getAdminProducts } from "@/api/adminApi";
import { PagedResponse } from "@/backend/BackendClasses";
import { Product } from "@/backend/BackendClasses";

export default function ApiTestPage() {
  const [data, setData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
  name: "",
  description: "",
  brand: "",
  basePrice: "",
  rating: "",
  numberOfVariants: "",
  isActive: true
});

function handleInputChange(e) {
  const { name, value } = e.target;

  setNewProduct({
    ...newProduct,
    [name]: value
  });
}

async function createNewProduct() {

  const product = new Product({
    name: newProduct.name,
    description: newProduct.description,
    brand: newProduct.brand,
    productImage: "default.png",
    tags: [],
    basePrice: parseFloat(newProduct.basePrice),
    reviews: 0,
    rating: parseFloat(newProduct.rating),
    gender: newProduct.gender,
    category: null,
    numberOfVariants: parseInt(newProduct.numberOfVariants),
    isActive: newProduct.isActive
  });

  await adminCreateProduct(product);
}

  // Highlight all code blocks after render
  useEffect(() => {
    if (window.Prism) {
      document.querySelectorAll("pre code").forEach((block) => {
        window.Prism.highlightElement(block);
      });
    }
  }, []); // run once after mount

  async function testLogin() {
    // try {
    //   const log = await login("admin", "admin123");
    //   console.log("Logged in:", log);
    // } catch (err) {
    //   setError(err.message);
    // }
    await login("admin", "admin123");
  }

  async function testLogout() {
    logout();
  }

  async function testApi() {
    try {
      const response = await getProducts();
      setData(response);
    } catch (err) {
      setError(err.message);
    }
  }

  async function adminGetProducts() {
    try {
      const response = await getAdminProducts(0, 3, "id", "asc");
      // Map each raw item to a Product instance
      const products = (response.contents || []).map(
        (item) => new Product(item)
      );

      // Wrap in PagedResponse
      const paged = new PagedResponse({
        contents: products,
        pageNumber: response.pageNumber ?? 0,
        pageSize: response.pageSize ?? 10,
        totalPages: response.totalPages ?? 1,
        totalElements: response.totalElements ?? products.length,
        lastPage: response.lastPage ?? true,
      });

      setAdminData(paged);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Axios API Test</h1>
      {/* CDN for PureCSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css"
      />
      {/* Prism.js CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism.css"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/prismjs/prism.js"
        defer
      ></script>

      {/* Custom code block styles */}
      <style jsx>{`
        .code_block {
          background: #fcfcfc;
          padding: 10px;
          border-radius: 6px;
          overflow-x: auto;
          font-family: "Fira Code", monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        .code_sample {
          border: black solid 3px;
          margin: 5px;
          padding: 5px;
        }
      `}</style>

      <div>
        <h1>Admin functions</h1>
        
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div id="Admin-Login" className="pure-g code_sample">
        <div className="pure-u-1-2">
          <h2>Admin Login</h2>
          <p>First we need to login in order to get the accessToken</p>
          <button onClick={testLogin} className="pure-button">
            Login
          </button>
        </div>

        <div className="pure-u-1-2">
          <pre className="code_block">
            <code className="language-javascript">
              {`
              import { login, logout } from "@/api/authApi";
              async function Login() {
                  await login("admin", "admin123");
              }`}
            </code>
          </pre>
        </div>
      </div>
      <div id="Admin-Get Products" className="pure-g code_sample">
        <div className="pure-u-1-2">
          <h2>Admin View Products</h2>
          <p>Now we can use the PagedResponse</p>
          <p>Most GET endpoints use this PagedResponse object</p>
          <p>Most other endpoint use the equivalent Object</p>
          <button
            onClick={adminGetProducts}
            className="pure-button pure-button-primary"
          >
            Get Products
          </button>
          {adminData && (
            <div>
              <p>
                Page {adminData.pageNumber + 1} / {adminData.totalPages} (
                {adminData.totalElements} total items)
              </p>

              {/* Display products in a simple list */}
              <div style={{ display: "grid", gap: "12px" }}>
                {adminData.contents.map((product) => (
                  <div
                    key={product.id}
                    className="code_block"
                    style={{ background: "#e6f0ff" }}
                  >
                    <h4>{product.name}</h4>
                    <p>
                      <strong>ID:</strong> {product.id}
                    </p>
                    <p>
                      <strong>Brand:</strong> {product.brand} | <strong>Category:</strong>{" "}
                      {product.category?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.basePrice} | <strong>Rating:</strong>{" "}
                      {product.rating ?? "N/A"} | <strong>Reviews:</strong>{product.reviews}
                    </p>
                    <p>
                      <strong>Gender:</strong> {product.gender} | <strong>Number Of Available Variants: </strong> {product.numberOfVariants}
                    </p>
                    <p>
                      <strong>Active:</strong> {product.isActive ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="pure-u-1-2">
          <pre className="code_block">
            <code className="language-js">
              {`
  async function adminGetProducts() {
    try {
      const response = await getAdminProducts(0, 3, "id", "asc");
      // Map each raw item to a Product instance
      const products = (response.contents || []).map(
        (item) => new Product(item)
      );

      // Wrap in PagedResponse
      const paged = new PagedResponse({
        contents: products,
        pageNumber: response.pageNumber ?? 0,
        pageSize: response.pageSize ?? 10,
        totalPages: response.totalPages ?? 1,
        totalElements: response.totalElements ?? products.length,
        lastPage: response.lastPage ?? true,
      });

      setAdminData(paged);
    } catch (err) {
      setError(err.message);
    }
  }
  // Usage:
  <div>
<p>
  Page {adminData.pageNumber + 1} / {adminData.totalPages} (
  {adminData.totalElements} total items)
</p>

{/* Display products in a simple list */}
<div style={{ display: "grid", gap: "12px" }}>
  {adminData.contents.map((product) => (
    <div
      key={product.productId}
      className="code_block"
      style={{ background: "#e6f0ff" }}
    >
      <h4>{product.name}</h4>
      <p>
        <strong>ID:</strong> {product.productId}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand} | <strong>Category:</strong>{" "}
        {product.category?.name || "N/A"}
      </p>
      <p>
        <strong>Price:</strong> {product.basePrice} | <strong>Rating:</strong>{" "}
        {product.rating ?? "N/A"}
      </p>
      <p>
        <strong>Active:</strong> {product.isActive ? "Yes" : "No"}
      </p>
    </div>
  </div>
              `}
            </code>
          </pre>
        </div>
      </div>
      <div id="Admin_Create_Product" className="pure-g code_sample">
        <div className="pure-u-1-2 code_block">
          <div className="pure-form pure-form-stacked">

            <h2>Create Product</h2>

            <label>Name</label>
            <input
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />

            <label>Description</label>
            <input
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />

            <label>Brand</label>
            <input
              name="brand"
              value={newProduct.brand}
              onChange={handleInputChange}
            />

            <label>Base Price</label>
            <input
              name="basePrice"
              type="number"
              value={newProduct.basePrice}
              onChange={handleInputChange}
            />

            <label>Rating</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              value={newProduct.rating}
              onChange={handleInputChange}
            />

            <label>Variants</label>
            <input
              name="numberOfVariants"
              type="number"
              value={newProduct.numberOfVariants}
              onChange={handleInputChange}
            />

            <label>Gender</label>
            <input
              name="gender"
              type="text"
              value={newProduct.gender}
              onChange={handleInputChange}
            />

            <br />

            <button
              className="pure-button pure-button-primary"
              onClick={createNewProduct}
            >
              Create Product
            </button>

          </div>
        </div>
        <div className="pure-u-1-2" >
        <pre className="code_block">
          <code className="language-js">
            {`
            const product = new Product({
    name: newProduct.name,
    description: newProduct.description,
    brand: newProduct.brand,
    productImage: "default.png",
    tags: [],
    basePrice: parseFloat(newProduct.basePrice),
    reviews: 0,
    rating: parseFloat(newProduct.rating),
    gender: newProduct.gender,
    category: null,
    numberOfVariants: parseInt(newProduct.numberOfVariants),
    isActive: newProduct.isActive
  });

  await adminCreateProduct(product);
            `}
          </code>
        </pre>
        </div>
      </div>
                <button onClick={testLogout} className="pure-button">
            Logout
          </button>{" "}
      
    </div>
  );
}