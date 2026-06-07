// ============================================================
//  seed-bankflux.js — Amorçage du fil rouge BankFlux
//  Base : "bankflux"
//  Lit les fichiers JSON du dossier bankflux/ (Extended JSON :
//  $oid, $date, $numberDecimal sont revivifiés par EJSON.parse).
//
//  À lancer depuis la RACINE du dossier "datasets" :
//     mongosh "<uri>" bankflux/seed-bankflux.js
//  (ou via seed-all.js)
// ============================================================
const fs = require("fs");
const target = db.getSiblingDB("bankflux");

// EJSON.parse revivifie ObjectId / Date / Decimal128 depuis l'Extended JSON
function load(path) {
  return EJSON.parse(fs.readFileSync(path, "utf8"));
}

// ---- Remise à zéro (idempotent) ----
target.customers.drop();
target.accounts.drop();
target.transactions.drop();
target.branches.drop();

// ---- Chargement depuis les fichiers .json ----
target.customers.insertMany(load("bankflux/customers.json"));
target.accounts.insertMany(load("bankflux/accounts.json"));
target.transactions.insertMany(load("bankflux/transactions.json"));
target.branches.insertMany(load("bankflux/branches.json"));

// ---- Récapitulatif ----
print("bankflux  customers="     + target.customers.countDocuments()
    + "  accounts="     + target.accounts.countDocuments()
    + "  transactions=" + target.transactions.countDocuments()
    + "  branches="     + target.branches.countDocuments());
