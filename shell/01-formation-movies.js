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
  {
    title: "The Batman",
    type: "Film",
    year: 2022,
    genre: ["Action", "Crime", "Thriller"],
    rating: 8.3,
    available: true,
    country: "USA",
  },
  {
    title: "Wednesday",
    type: "Série",
    year: 2022,
    genre: ["Fantastique", "Comédie", "Mystère"],
    rating: 8.1,
    seasons: 2,
    available: true,
    country: "USA",
  },
  {
    title: "Breaking Bad",
    type: "Série",
    year: 2008,
    genre: ["Drame", "Crime"],
    rating: 9.5,
    seasons: 5,
    available: true,
    country: "USA",
  },
  {
    title: "La Casa de Papel",
    type: "Série",
    year: 2017,
    genre: ["Action", "Thriller"],
    rating: 8.4,
    seasons: 5,
    available: true,
    country: "Espagne",
  },
  {
    title: "Dune",
    type: "Film",
    year: 2021,
    genre: ["Science-Fiction", "Aventure"],
    rating: 8.0,
    available: false,
    country: "USA",
  },
  {
    title: "The Queen's Gambit",
    type: "Série",
    year: 2020,
    genre: ["Drame", "Sport"],
    rating: 8.6,
    seasons: 1,
    available: true,
    country: "USA",
  },
  {
    title: "Black Mirror",
    type: "Série",
    year: 2011,
    genre: ["Science-Fiction", "Drame"],
    rating: 8.8,
    seasons: 6,
    available: true,
    country: "UK",
  },
]);
print(
  "formation.movies : " + db.movies.countDocuments() + " documents chargés.",
);
