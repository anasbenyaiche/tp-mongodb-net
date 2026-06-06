// =====================================================================
//  BilletFlux / Formation MongoDB & .NET — Amorçage complet (1 commande)
//  À lancer depuis la RACINE du dossier "datasets" :
//      mongosh "<uri>" seed-all.js
//  Charge les bases formation (Modules 1-2) et billetflux (Modules 3-7).
// =====================================================================
load("shell/01-formation-movies.js");
load("shell/02-formation-cars.js");
load("shell/03-formation-products.js");
load("shell/formation-bankflux.js");
load("billetflux/seed-billetflux.js");
print("======================================================");
print("  Tous les jeux de données ont été chargés. ");
print("  Bases : formation (movies, cars, products)");
print("          billetflux (events, customers, orders + index)");
print("======================================================");
