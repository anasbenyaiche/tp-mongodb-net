// =====================================================================
//  Formation MongoDB & .NET — Amorçage complet (1 commande)
//  À lancer depuis la RACINE du dossier "datasets" :
//      mongosh "<uri>" seed-all.js
//  Charge :
//    - formation (Modules 1-2) : movies, cars, products
//    - bankflux  (fil rouge .NET) : customers, accounts, transactions, branches
// =====================================================================
load("shell/01-formation-movies.js");
load("shell/02-formation-cars.js");
load("shell/03-formation-products.js");
load("bankflux/seed-bankflux.js");
print("======================================================");
print("  Tous les jeux de données ont été chargés.");
print("  Bases : formation (movies, cars, products)");
print("          bankflux  (customers, accounts, transactions, branches)");
print("======================================================");
