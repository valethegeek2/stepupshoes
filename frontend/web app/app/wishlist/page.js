"use client";
import Link from "next/link";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">Αρχική</Link>
        <span> - </span>
        <span style={{ color: '#555' }}>WISHLIST</span>
      </div>

      {/* Τίτλος και Κουμπί Όλων */}
      <div className="wishlist-header-row">
        <h1 className="wishlist-page-title">WISHLIST</h1>
        {wishlist.length > 0 && (
          <button className="add-all-cart-btn">ΜΕΤΑΦΟΡΑ ΟΛΩΝ ΣΤΟ ΚΑΛΑΘΙ</button>
        )}
      </div>

      {/* Εμφάνιση Προϊόντων */}
      {wishlist.length === 0 ? (
        <p style={{ marginTop: '30px', fontSize: '18px', color: '#555' }}>Η Wishlist σας είναι άδεια. Προσθέστε αγαπημένα προϊόντα!</p>
      ) : (
        <div className="wishlist-content">
          
          {/* Οι επικεφαλίδες όπως στη φωτογραφία */}
          <div className="wishlist-table-header">
            <span className="col-product">Προϊόν</span>
            <span className="col-price">Τιμή</span>
          </div>

          <div className="wishlist-items-list">
            {wishlist.map((item) => (
              <div className="wishlist-item-row" key={item.id}>
                
                {/* Αριστερά: Φωτό και Πληροφορίες */}
                <div className="wishlist-item-left">
                  <div className="wishlist-img-box">
                    <img src={item.image || ""} alt={item.title} />
                  </div>
                  <div className="wishlist-item-info">
                    <p className="wishlist-item-brand">{item.brand || "Sportwear"}</p>
                    <Link href={`/product/${item.id}`} className="wishlist-item-name">
                      {item.title}
                    </Link>
                    {/* Αν είχαμε Χρώμα/Μέγεθος στα δεδομένα, θα μπαίνανε εδώ */}
                    <p className="wishlist-item-attr">GREEN / M</p>
                  </div>
                </div>

                {/* Μέση: Τιμή */}
                <div className="wishlist-item-price">
                  € {item.price}
                </div>

                {/* Δεξιά: Κουμπιά */}
                <div className="wishlist-item-actions">
                  <button className="remove-item-btn" onClick={() => removeFromWishlist(item.id)}>
                    <i className="fa-regular fa-trash-can"></i> Αφαίρεση
                  </button>
                  <button className="add-to-cart-btn">ΠΡΟΣΘΗΚΗ ΣΤΟ ΚΑΛΑΘΙ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}