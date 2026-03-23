"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ProductCard from "../../../components/ProductCard"; 
// import { productsData } from "../../../data/product";
import { Configuration, ProductControllerApi } from "@/backend/generated";

export default function ProductsPage() {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 
  
  // --- ΝΕΟ: Διαβάζουμε τι έγραψε στην αναζήτηση ---
  const searchQuery = searchParams.get("search");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("Best Sellers");

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const productsData = apiProducts || [];

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const config = new Configuration({
        basePath: "http://localhost:8080",
      });

      const api = new ProductControllerApi(config);

      const requestOpts = await api.searchProducts1RequestOpts({
        name: searchQuery || undefined,
        tags: searchQuery || undefined,
        category: pathname.includes("/shoes") ? "shoes"
          : pathname.includes("/clothing") ? "clothing"
          : pathname.includes("/gym-equipment") ? "gym-equipment"
          : pathname.includes("/accessories") ? "accessories"
          : undefined,
        gender: selectedGenders.length === 1 ? selectedGenders[0] : undefined,
        brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
        pageNumber: currentPage - 1,
        pageSize: 40,
        sortBy:
          sortOption === "Τιμή: Αύξουσα" || sortOption === "Τιμή: Φθίνουσα"
            ? "basePrice"
            : sortOption === "Best Sellers"
            ? "reviews"
            : "id",
        sortOrder: sortOption === "Τιμή: Φθίνουσα" ? "desc" : "asc",
      });

      const res = await api.request(requestOpts);
      const data = await res.json();

      setApiProducts(data.contents || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [currentPage, selectedGenders, selectedBrands, sortOption, searchQuery, pathname]);


  useEffect(() => {
    const genderFromUrl = searchParams.get("gender");
    if (genderFromUrl) {
      setSelectedGenders([genderFromUrl]); 
    }

    const brandFromUrl = searchParams.get("brand");
    if (brandFromUrl) {
      setSelectedBrands([brandFromUrl]); 
    }
  }, [searchParams]);

  const handleGenderChange = (gender) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // const processedProducts = useMemo(() => {
  //   let filtered = productsData;

  //   // --- 0. ΓΕΝΙΚΗ ΑΝΑΖΗΤΗΣΗ (Search Bar) ---
  //   if (searchQuery) {
  //     const q = searchQuery.toLowerCase();
  //     filtered = filtered.filter(p => 
  //       p.title.toLowerCase().includes(q) ||
  //       p.category.toLowerCase().includes(q) ||
  //       p.gender.toLowerCase().includes(q) ||
  //       (p.tags && p.tags.toLowerCase().includes(q))
  //     );
  //   }
    
  //   // 1. Κατηγορία από URL (Sidebar links)
  //   if (pathname.includes("/shoes")) {
  //     filtered = filtered.filter(p => p.category === "shoes");
  //   } else if (pathname.includes("/clothing")) {
  //     filtered = filtered.filter(p => p.category === "clothing");
  //   } else if (pathname.includes("/gym-equipment")) {
  //     filtered = filtered.filter(p => p.category === "gym-equipment");
  //   } else if (pathname.includes("/accessories")) {
  //     filtered = filtered.filter(p => p.category === "accessories");
  //   }

  //   // 2. Φύλο (Gender)
  //   if (selectedGenders.length > 0) {
  //     filtered = filtered.filter(p => selectedGenders.includes(p.gender));
  //   }

  //   // 3. Μάρκα (Brand)
  //   if (selectedBrands.length > 0) {
  //     filtered = filtered.filter(p => selectedBrands.includes(p.brand));
  //   }

  //   // 4. Ταξινόμηση
  //   let sorted = [...filtered];
  //   if (sortOption === "Τιμή: Αύξουσα") {
  //     sorted.sort((a, b) => a.price - b.price);
  //   } else if (sortOption === "Τιμή: Φθίνουσα") {
  //     sorted.sort((a, b) => b.price - a.price);
  //   } else if (sortOption === "Best Sellers") {
  //     sorted.sort((a, b) => b.reviews - a.reviews); 
  //   } else if (sortOption === "Νέες Αφίξεις") {
  //     sorted.sort((a, b) => b.id - a.id); 
  //   }

  //   return sorted;
  // }, [pathname, selectedGenders, selectedBrands, sortOption, searchQuery]);

  // const PRODUCTS_PER_PAGE = 30;
  // const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE) || 1;
  // const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  // const currentProducts = processedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const dictionary = {
    "products": "Προϊόντα",
    "shoes": "Παπούτσια",
    "clothing": "Ρούχα",
    "gym-equipment": "Όργανα Γυμναστικής",
    "accessories": "Αξεσουάρ"
  };
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  const baseCategoryProducts = productsData.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(q) ||
                            p.category.name.toLowerCase().includes(q) ||
                            p.gender.toLowerCase().includes(q) ||
                            (p.tags && p.tags.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (pathname.includes("/shoes")) return p.category === "shoes";
    if (pathname.includes("/clothing")) return p.category === "clothing";
    if (pathname.includes("/gym-equipment")) return p.category === "gym-equipment";
    if (pathname.includes("/accessories")) return p.category === "accessories";
    return true;
  });
  
  const getGenderCount = (g) => baseCategoryProducts.filter(p => p.gender === g).length;
  const getBrandCount = (b) => baseCategoryProducts.filter(p => p.brand === b).length;
  const allBrands = ["Nike", "Adidas", "Asics", "Puma", "Under Armour", "Reebok", "New Balance"];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="plp-container">
      
      <div className="breadcrumbs">
        <Link href="/">Αρχική</Link>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const translatedName = dictionary[segment] || segment;

          return (
            <span key={segment}>
              <span> - </span>
              {isLast && !searchQuery ? (
                <span style={{ color: '#555' }}>{translatedName}</span>
              ) : (
                <Link href={href}>{translatedName}</Link>
              )}
            </span>
          );
        })}
        {/* Αν υπάρχει αναζήτηση, τη βάζουμε στα breadcrumbs */}
        {searchQuery && (
          <span>
            <span> - </span>
            <span style={{ color: '#555' }}>Αναζήτηση</span>
          </span>
        )}
      </div>

      <div className="plp-header">
        <h1 className="plp-title">
          {/* Δείχνουμε τον όρο αναζήτησης στον τίτλο της σελίδας! */}
          {searchQuery 
            ? `Αποτελέσματα για: "${searchQuery}"` 
            : (pathSegments.length > 1 ? dictionary[pathSegments[pathSegments.length - 1]] : "Όλα τα Προϊόντα")
          }
        </h1>
        {/* <span className="plp-count">{processedProducts.length}</span> */}
        <span className="plp-count">{productsData.length}</span>
      </div>

      <div className="plp-content">
        
        <aside className="plp-sidebar">
          
          <div className="filter-group">
            <h3 className="filter-title">ΚΑΤΗΓΟΡΙΕΣ <i className="fa-solid fa-minus"></i></h3>
            <ul className="filter-list">
              <li className={pathname.includes("/shoes") ? "active-category" : ""}>
                <Link href="/products/shoes" style={{ textDecoration: 'none', color: 'inherit' }}>Παπούτσια</Link>
              </li>
              <li className={pathname.includes("/clothing") ? "active-category" : ""}>
                <Link href="/products/clothing" style={{ textDecoration: 'none', color: 'inherit' }}>Ρούχα</Link>
              </li>
              <li className={pathname.includes("/gym-equipment") ? "active-category" : ""}>
                <Link href="/products/gym-equipment" style={{ textDecoration: 'none', color: 'inherit' }}>Όργανα Γυμναστικής</Link>
              </li>
              <li className={pathname.includes("/accessories") ? "active-category" : ""}>
                <Link href="/products/accessories" style={{ textDecoration: 'none', color: 'inherit' }}>Αξεσουάρ</Link>
              </li>
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">ΦΥΛΟ <i className="fa-solid fa-chevron-up"></i></h3>
            <div className="filter-list">
              <label className="checkbox-item">
                <input type="checkbox" checked={selectedGenders.includes("men")} onChange={() => handleGenderChange("men")} /> 
                Ανδρικά <span className="count">({getGenderCount("men")})</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={selectedGenders.includes("women")} onChange={() => handleGenderChange("women")} /> 
                Γυναικεία <span className="count">({getGenderCount("women")})</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={selectedGenders.includes("boys")} onChange={() => handleGenderChange("boys")} /> 
                Αγόρι <span className="count">({getGenderCount("boys")})</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={selectedGenders.includes("girls")} onChange={() => handleGenderChange("girls")} /> 
                Κορίτσι <span className="count">({getGenderCount("girls")})</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={selectedGenders.includes("unisex")} onChange={() => handleGenderChange("unisex")} /> 
                Unisex <span className="count">({getGenderCount("unisex")})</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">BRAND <i className="fa-solid fa-chevron-down"></i></h3>
            <div className="filter-list">
              {allBrands.map(brand => (
                <label className="checkbox-item" key={brand}>
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)} 
                    onChange={() => handleBrandChange(brand)} 
                  /> 
                  {brand} <span className="count">({getBrandCount(brand)})</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="plp-main">
          
          <div className="plp-toolbar">
            <select className="sort-dropdown" value={sortOption} onChange={handleSortChange}>
              <option value="Best Sellers">Best Sellers</option>
              <option value="Νέες Αφίξεις">Νέες Αφίξεις</option>
              <option value="Τιμή: Αύξουσα">Τιμή: Αύξουσα</option>
              <option value="Τιμή: Φθίνουσα">Τιμή: Φθίνουσα</option>
            </select>
            
            {totalPages > 1 && (
              <div className="pagination-container">
                <span className="pagination-text">Σελίδα</span>
                <div className="pagination-select-wrapper">
                  <select 
                    className="pagination-select"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                  >
                    {[...Array(totalPages)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <span className="pagination-text">από {totalPages}</span>
              </div>
            )}
          </div>

          {productsData.length === 0 ? (
             <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
               Δεν βρέθηκαν προϊόντα για "{searchQuery}". Δοκιμάστε κάποια άλλη λέξη-κλειδί.
             </div>
          ) : (
            <div className="plp-grid">
              {productsData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}