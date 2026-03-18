"use client";

import { productsData } from "@/data/product";
import { useState, useEffect } from "react";

export default function TestOpenAPI() {

	// FRONTEND
	// ΦΤΙΑΧΝΕΤΕ ΕΝΑ ΤΕΤΟΙΟ ΑΝΤΙΚΕΙΜΕΝΟ
	const [products, setProducts] = useState(null);

	// ΜΙΑ ΑΠΛΗ useEffect
	useEffect(() => {
    	// ΜΕΤΑ ΕΔΩ ΘΑ ΜΠΕΙ ΤΟ API CALL
		// ΕΣΕΙΣ ΓΙΑ ΤΩΡΑ ΒΑΖΕΤΕ ΚΑΤΕΥΘΕΙΑΝ ΤΑ MOCKDATA
		// ΠΡΟΣΟΧΗ ΝΑ ΕΧΟΥΝ ΤΗΝ ΙΔΙΑ ΜΟΡΦΗ ΜΕ ΑΥΤΑ ΑΠΟ ΤΟ Documentation
    	setProducts(productsData);
  	}, []);
	
	// ΑΥΤΟ ΧΡΕΙΑΖΕΤΑΙ ΓΙΑΤΙ ΜΠΟΡΕΙ ΝΑ
	// ΜΗΝ ΕΡΘΟΥΝ ΤΑ ΔΕΔΟΜΕΝΑ ΚΑΤΕΥΘΕΙΑΝ
	if (!products) {
    	return <div>Loading...</div>;
  	}

	return (
		<div>
			<div>
				{/* ΧΡΗΣΙΜΟΠΟΙΕΙΤΑΙ ΤΑ ΔΕΔΟΜΕΝΑ ΚΑΝΟΝΙΚΑ */}
				Product {products[0].id} {products[0].title}
			</div>
		</div>
	);
}