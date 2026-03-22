// data/orders.js

export const ordersData = [
  { 
    id: "ORD-10029", 
    username: "admin", 
    date: "12 Μαρ 2026, 10:30 πμ", 
    status: "Παραδόθηκε", 
    total: 159.98, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Γιώργος", lastName: "Παπαδόπουλος", city: "Αθήνα", address: "Ερμού", streetNumber: "15", postalCode: "10563", phone: "6971234567" },
    items: [{ title: "Nike Air Zoom Running Shoes", quantity: 1 }, { title: "Dry-Fit Training T-Shirt", quantity: 1 }] 
  },
  { 
    id: "ORD-10030", 
    username: "admin", 
    date: "10 Μαρ 2026, 09:15 πμ", 
    status: "Παραδόθηκε", 
    total: 85.50, 
    paymentMethod: "Αντικαταβολή", 
    delivery: { firstName: "Μαρία", lastName: "Κωνσταντίνου", city: "Θεσσαλονίκη", address: "Τσιμισκή", streetNumber: "102", postalCode: "54622", phone: "6989876543" },
    items: [{ title: "Puma Daily Training Sneakers", quantity: 1 }] 
  },
  { 
    id: "ORD-10031", 
    username: "admin", 
    date: "08 Μαρ 2026, 14:20 μμ", 
    status: "Ακυρώθηκε", 
    total: 45.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Κώστας", lastName: "Νικολάου", city: "Πάτρα", address: "Μαιζώνος", streetNumber: "55", postalCode: "26221", phone: "6945678123" },
    items: [{ title: "Athletic Jogger Pants", quantity: 1 }] 
  },
  { 
    id: "ORD-10032", 
    username: "admin", 
    date: "05 Μαρ 2026, 11:00 πμ", 
    status: "Αποστάλθηκε", 
    total: 120.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Ελένη", lastName: "Γεωργίου", city: "Λάρισα", address: "Κύπρου", streetNumber: "12", postalCode: "41222", phone: "6932345678" },
    items: [{ title: "Reebok Nano X2 Training", quantity: 1 }] 
  },
  { 
    id: "ORD-10033", 
    username: "admin", 
    date: "01 Μαρ 2026, 16:45 μμ", 
    status: "Σε επεξεργασία", 
    total: 29.99, 
    paymentMethod: "Αντικαταβολή", 
    delivery: { firstName: "Νίκος", lastName: "Μακρής", city: "Ηράκλειο", address: "Δικαιοσύνης", streetNumber: "4", postalCode: "71202", phone: "6978123456" },
    items: [{ title: "Dry-Fit Training T-Shirt", quantity: 1 }] 
  },
  { 
    id: "ORD-10034", 
    username: "admin", 
    date: "28 Φεβ 2026, 10:10 πμ", 
    status: "Παραδόθηκε", 
    total: 135.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Ανδρέας", lastName: "Στεφάνου", city: "Ιωάννινα", address: "Δωδώνης", streetNumber: "88", postalCode: "45221", phone: "6943332211" },
    items: [{ title: "Under Armour HOVR Phantom", quantity: 1 }] 
  },
  { 
    id: "ORD-10035", 
    username: "admin", 
    date: "25 Φεβ 2026, 18:30 μμ", 
    status: "Επιβεβαιωμένη", 
    total: 35.50, 
    paymentMethod: "Αντικαταβολή", 
    delivery: { firstName: "Σοφία", lastName: "Αντωνίου", city: "Χανιά", address: "Χάληδων", streetNumber: "21", postalCode: "73132", phone: "6987654321" },
    items: [{ title: "Waterproof Gym Bag", quantity: 1 }] 
  },
  { 
    id: "ORD-10036", 
    username: "admin", 
    date: "20 Φεβ 2026, 09:00 πμ", 
    status: "Απέτυχε", 
    total: 110.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Βασίλης", lastName: "Καραμανλής", city: "Βόλος", address: "Δημητριάδος", streetNumber: "150", postalCode: "38221", phone: "6901122334" },
    items: [{ title: "ASICS Trail Running", quantity: 1 }] 
  },
  { 
    id: "ORD-10037", 
    username: "admin", 
    date: "15 Φεβ 2026, 12:45 μμ", 
    status: "Σε εκκρεμότητα", 
    total: 145.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Δήμητρα", lastName: "Λαμπροπούλου", city: "Αθήνα", address: "Πατησίων", streetNumber: "200", postalCode: "11256", phone: "6977788990" },
    items: [{ title: "Adidas Pro Basketball Shoes", quantity: 1 }] 
  },
  { 
    id: "ORD-10038", 
    username: "admin", 
    date: "10 Φεβ 2026, 15:20 μμ", 
    status: "Παραδόθηκε", 
    total: 40.00, 
    paymentMethod: "Αντικαταβολή", 
    delivery: { firstName: "Γιάννης", lastName: "Ρήγας", city: "Θεσσαλονίκη", address: "Εγνατία", streetNumber: "45", postalCode: "54631", phone: "6944455667" },
    items: [{ title: "Γυναικείο Κολάν Προπόνησης", quantity: 1 }] 
  },
  { 
    id: "ORD-10039", 
    username: "admin", 
    date: "05 Φεβ 2026, 11:15 πμ", 
    status: "Παραδόθηκε", 
    total: 140.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "Κατερίνα", lastName: "Μιχαήλ", city: "Χαλκίδα", address: "Αβάντων", streetNumber: "30", postalCode: "34100", phone: "6933344556" },
    items: [{ title: "New Balance Fresh Foam", quantity: 1 }] 
  },
  { 
    id: "ORD-10040", 
    username: "john_doe", 
    date: "01 Φεβ 2026, 13:00 μμ", 
    status: "Σε εκκρεμότητα", 
    total: 130.00, 
    paymentMethod: "Κάρτα", 
    delivery: { firstName: "John", lastName: "Doe", city: "Αθήνα", address: "Συγγρού", streetNumber: "350", postalCode: "17674", phone: "6955566778" },
    items: [{ title: "Nike Pegasus 40", quantity: 1 }] 
  },
];