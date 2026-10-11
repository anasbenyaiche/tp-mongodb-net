// =====================================================================
//  Jeu de données : cars — Module 2, Atelier 2.3 (concessionnaire)
//  Chargement :  mongosh "<uri>" 02-formation-cars.js
// =====================================================================
const db = db.getSiblingDB("formation");
db.cars.deleteMany({});
db.cars.insertMany([
  {
    vin: "FRX2024001",
    make: "Renault",
    model: "Clio E-Tech",
    year: 2024,
    fuel: "Hybride",
    price: 24990,
    colors: ["Rouge", "Noir"],
    agency: "AutoCity Lyon",
    available: true,
  },
  {
    vin: "FRX2024002",
    make: "Mercedes",
    model: "A 200",
    year: 2022,
    fuel: "Essence",
    price: 38900,
    colors: ["Blanc", "Gris"],
    agency: "Premium Motors",
    available: true,
  },
  {
    vin: "FRX2024003",
    make: "Kia",
    model: "EV6",
    year: 2023,
    fuel: "Électrique",
    price: 42990,
    colors: ["Bleu", "Noir"],
    agency: "VoltDrive Paris",
    available: true,
  },
  {
    vin: "FRX2024004",
    make: "Audi",
    model: "A3 Sportback",
    year: 2021,
    fuel: "Diesel",
    price: 31990,
    colors: ["Noir"],
    agency: "AutoCity Lyon",
    available: false,
  },
  {
    vin: "FRX2024005",
    make: "Ford",
    model: "Mustang Mach-E",
    year: 2024,
    fuel: "Électrique",
    price: 49990,
    colors: ["Blanc", "Bleu"],
    agency: "VoltDrive Paris",
    available: true,
  },
  {
    vin: "FRX2024006",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2023,
    fuel: "Essence",
    price: 35900,
    colors: ["Noir", "Rouge"],
    agency: "Premium Motors",
    available: true,
  },
]);
print("formation.cars : " + db.cars.countDocuments() + " documents chargés.");
