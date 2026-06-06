// =====================================================================
//  BilletFlux / Formation MongoDB & .NET — Jeu de données : movies
//  Module 2 — Atelier 2.2 (catalogue Netflix)
//  Chargement :  mongosh "<uri>" 01-formation-movies.js
//          ou :  load("shell/01-formation-movies.js")
//  Idempotent : la collection est vidée puis re-remplie.
// =====================================================================
const db = db.getSiblingDB("formation");
db.movies.deleteMany({});
db.movies.insertMany([
  { title: "Inception",       type: "Film",  year: 2010, genre: ["Science-Fiction", "Thriller"],  rating: 8.8,                available: true,  country: "USA" },
  { title: "Stranger Things", type: "Série", year: 2016, genre: ["Fantastique", "Horreur"],        rating: 8.7, seasons: 4,  available: true,  country: "USA" },
  { title: "Friends",         type: "Série", year: 1994, genre: ["Comédie"],                       rating: 8.9, seasons: 10, available: false, country: "USA" },
  { title: "Lupin",           type: "Série", year: 2021, genre: ["Policier", "Suspense"],          rating: 7.6, seasons: 3,  available: true,  country: "France" },
  { title: "Dark",            type: "Série", year: 2017, genre: ["Science-Fiction", "Mystère"],    rating: 8.8, seasons: 3,  available: true,  country: "Allemagne" },
  { title: "Money Heist",     type: "Série", year: 2017, genre: ["Action", "Drame"],               rating: 8.2, seasons: 5,  available: true,  country: "Espagne" },
  { title: "The Crown",       type: "Série", year: 2016, genre: ["Historique", "Drame"],           rating: 8.6, seasons: 5,  available: true,  country: "UK" }
]);
print("formation.movies : " + db.movies.countDocuments() + " documents chargés.");
