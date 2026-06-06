// =====================================================================
//  Jeu de données : products — Module 2, Atelier 2.5 (scripts mongosh)
//  Chargement :  mongosh "<uri>" 03-formation-products.js
// =====================================================================
const db = db.getSiblingDB("formation");
db.products.deleteMany({});
for (let i = 1; i <= 10; i++) {
  db.products.insertOne({
    sku: "P" + String(i).padStart(3, "0"),
    name: "Produit " + i,
    price: 10 * i,
    stock: 100 - i
  });
}
print("formation.products : " + db.products.countDocuments() + " documents chargés.");
