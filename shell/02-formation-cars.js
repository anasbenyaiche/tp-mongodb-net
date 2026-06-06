// =====================================================================
//  Jeu de données : cars — Module 2, Atelier 2.3 (concessionnaire)
//  Chargement :  mongosh "<uri>" 02-formation-cars.js
// =====================================================================
const db = db.getSiblingDB("formation");
db.cars.deleteMany({});
db.cars.insertMany([
  { vin: "VF1CAR001", make: "Tesla",   model: "Model 3", year: 2023, fuel: "Électrique", price: 39990, colors: ["Noir", "Blanc"],  agency: "Motors Paris", available: true },
  { vin: "VF1CAR002", make: "BMW",     model: "M3",      year: 2021, fuel: "Essence",    price: 72900, colors: ["Bleu"],           agency: "Motors Paris", available: true },
  { vin: "VF1CAR003", make: "Toyota",  model: "Corolla", year: 2020, fuel: "Hybride",    price: 21900, colors: ["Argent", "Noir"], agency: "MG",           available: true },
  { vin: "VF1CAR004", make: "Peugeot", model: "308",     year: 2022, fuel: "Diesel",     price: 25990, colors: ["Blanc"],          agency: "Motors Paris", available: true }
]);
print("formation.cars : " + db.cars.countDocuments() + " documents chargés.");
