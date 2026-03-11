"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Ο Χάρτης των Κατηγοριών μας (ακριβώς όπως είναι στο Sidebar σου)
const categoryMap = {
  products: "Όλα τα Προϊόντα",
  mens: {
    title: "Ανδρικά",
    shoes: "Ανδρικά Παπούτσια",
    clothing: "Ανδρικά Ρούχα",
    accessories: "Ανδρικά Αξεσουάρ"
  },
  womens: {
    title: "Γυναικεία",
    shoes: "Γυναικεία Παπούτσια",
    clothing: "Γυναικεία Ρούχα",
    accessories: "Γυναικεία Αξεσουάρ"
  },
  kids: {
    title: "Παιδικά",
    shoes: "Παιδικά Παπούτσια",
    clothing: "Παιδικά Ρούχα",
    accessories: "Παιδικά Αξεσουάρ"
  }
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  // Παίρνουμε το URL και το κάνουμε πίνακα. Π.χ. /products/mens/clothing -> ["products", "mens", "clothing"]
  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <div className="breadcrumbs-container">
      <Link href="/" className="breadcrumb-link">Αρχική</Link>
      
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let title = link; // Αρχική τιμή το αγγλικό url αν δεν βρεθεί κάτι

        // Λογική μετάφρασης βάσει του Χάρτη:
        if (link === "products") {
          title = categoryMap.products;
        } 
        // Αν είμαστε στο 1ο επίπεδο (π.χ. mens)
        else if (index === 1 && categoryMap[link]) {
          title = categoryMap[link].title;
        } 
        // Αν είμαστε στο 2ο επίπεδο (π.χ. clothing) και το προηγούμενο ήταν π.χ. mens
        else if (index === 2) {
          const parentCategory = pathNames[1]; // το mens
          if (categoryMap[parentCategory] && categoryMap[parentCategory][link]) {
            title = categoryMap[parentCategory][link]; // Παίρνει το "Ανδρικά Ρούχα"
          }
        }

        return (
          <span key={index} className="breadcrumb-item">
            <span className="breadcrumb-separator"> - </span>
            {index === pathNames.length - 1 ? (
              <span className="breadcrumb-current">{title}</span>
            ) : (
              <Link href={href} className="breadcrumb-link">{title}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}