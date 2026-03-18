"use client";

import { useState, useEffect } from "react";
import { AdminControllerApi, Configuration } from "@/backend/generated";
import { PagedResponseProductDTOLong } from "@/backend/generated/models/PagedResponseProductDTOLong";

export default function TestOpenAPI() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);


  // ΑΥΤΟ ΕΙΝΑΙ ΕΝΑ ΟΛΟΚΛΗΡΩΜΕΝΟ ΠΑΡΑΔΕΙΓΜΑ
  // ΜΗΝ ΤΟ ΤΡΕΞΕΤΕ ΑΚΟΜΑ, ΔΕΝ ΛΕΙΤΟΥΡΓΕΙ

  useEffect(() => {
    async function fetchProducts() {
      try {
        // 1. LOGIN
        const loginRes = await fetch('http://localhost:8080/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: "admin", password: "admin123" })
        });

        if (!loginRes.ok) throw new Error('Login failed');

        const loginData = await loginRes.json();
        const token = loginData.accessToken; // store in local variable
        localStorage.setItem('jwt', token); // optional

        // 2. CREATE API CONFIG using token directly
        const config = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: () => localStorage.getItem('jwt', token) // use the token from login
        });

        const adminApi = new AdminControllerApi(config);

        // 3. Prepare request options
        const requestOpts = await adminApi.getAllProductsRequestOpts({
          pageNumber: 0,
          pageSize: 10,
          sortBy: 'id',
          sortOrder: 'asc'
        });

        // 4. Inject Authorization manually
        const actualToken = localStorage.getItem('jwt');
        requestOpts.headers['Authorization'] = `Bearer ${actualToken}`;

        // 5. Send request
        const rawResponse = await adminApi.request(requestOpts);
		    const response = await rawResponse.json(); // now it's your object		
        setProducts(response);

      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }

    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.contents.map(p => (
		<div key={p.id}>
        <div>{p.name} - {p.basePrice}|{p.id}</div>
		</div>
      ))}
	  <strong>{products.pageNumber}</strong>
    </div>
  );
}