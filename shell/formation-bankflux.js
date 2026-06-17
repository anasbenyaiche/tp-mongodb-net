// ============================================================
//  seed-banque.js — Jeu de données BankFlux (MongoDB & .NET)
// ============================================================
//  Base : "banque"
//  Collections : customers, accounts, transactions, branches
//
//  Caractéristiques :
//   - Idempotent : chaque collection est vidée (drop) puis re-remplie.
//   - Intégrité référentielle : accounts.customerId -> customers._id,
//     transactions.accountId -> accounts._id.
//   - Montants en Decimal128 (jamais double) : soldes et montants exacts.
//   - Dates en UTC. Agences en GeoJSON (ordre [longitude, latitude]).
//
//  Exécution (depuis le dossier datasets) :
//     mongosh "mongodb://localhost:27018" seed-banque.js
//  En Docker :
//     docker exec -it -w /datasets mongodb mongosh "mongodb://localhost:27017" seed-banque.js
// ============================================================

const db = db.getSiblingDB("bankflux");

// ---- Remise à zéro --------------------------------------------------------
db.customers.drop();
db.accounts.drop();
db.transactions.drop();
db.branches.drop();

// ---- Helpers --------------------------------------------------------------
const dec = (v) => Decimal128.fromString(v); // montant exact
const dt = (s) => new Date(s); // date UTC (suffixe Z)

// ============================================================
//  1) CLIENTS  (_id fixes -> on peut les référencer ensuite)
// ============================================================
const cClaire = new ObjectId();
const cMarc = new ObjectId();
const cAwa = new ObjectId();
const cYuki = new ObjectId();
const cOmar = new ObjectId();

db.customers.insertMany([
  {
    _id: cClaire,
    fullName: "Claire Dubois",
    email: "claire@bankflux.fr",
    city: "Lyon",
    phone: "+33 6 12 34 56 78",
    loyaltyPoints: 120,
    createdAt: dt("2024-02-10T09:00:00Z"),
  },
  {
    _id: cMarc,
    fullName: "Marc Petit",
    email: "marc@bankflux.fr",
    city: "Paris",
    phone: "+33 6 22 33 44 55",
    loyaltyPoints: 45,
    createdAt: dt("2024-05-03T14:30:00Z"),
  },
  {
    _id: cAwa,
    fullName: "Awa Ndiaye",
    email: "awa@bankflux.fr",
    city: "Marseille",
    phone: "+33 6 33 44 55 66",
    loyaltyPoints: 300,
    createdAt: dt("2023-11-21T11:15:00Z"),
  },
  {
    _id: cYuki,
    fullName: "Yuki Tanaka",
    email: "yuki@bankflux.fr",
    city: "Paris",
    phone: "+33 6 44 55 66 77",
    loyaltyPoints: 0,
    createdAt: dt("2025-01-08T08:45:00Z"),
  },
  {
    _id: cOmar,
    fullName: "Omar Haddad",
    email: "omar@bankflux.fr",
    city: "Lyon",
    phone: "+33 6 55 66 77 88",
    loyaltyPoints: 80,
    createdAt: dt("2024-09-30T16:20:00Z"),
  },
]);

// ============================================================
//  2) COMPTES  (référencent customers._id)
// ============================================================
const aClaireCC = new ObjectId(); // Claire - compte courant
const aClaireEP = new ObjectId(); // Claire - épargne
const aMarcCC = new ObjectId();
const aAwaCC = new ObjectId();
const aAwaEP = new ObjectId();
const aYukiCC = new ObjectId();
const aOmarEP = new ObjectId();

db.accounts.insertMany([
  {
    _id: aClaireCC,
    customerId: cClaire,
    accountNumber: "FR76-3000-1007-9412-0001",
    type: "checking",
    balance: dec("1250.75"),
    currency: "EUR",
    openedAt: dt("2024-02-10T09:05:00Z"),
  },
  {
    _id: aClaireEP,
    customerId: cClaire,
    accountNumber: "FR76-3000-1007-9412-0002",
    type: "savings",
    balance: dec("8000.00"),
    currency: "EUR",
    openedAt: dt("2024-02-10T09:06:00Z"),
  },
  {
    _id: aMarcCC,
    customerId: cMarc,
    accountNumber: "FR76-3000-1007-9412-0003",
    type: "checking",
    balance: dec("430.20"),
    currency: "EUR",
    openedAt: dt("2024-05-03T14:35:00Z"),
  },
  {
    _id: aAwaCC,
    customerId: cAwa,
    accountNumber: "FR76-3000-1007-9412-0004",
    type: "checking",
    balance: dec("2750.00"),
    currency: "EUR",
    openedAt: dt("2023-11-21T11:20:00Z"),
  },
  {
    _id: aAwaEP,
    customerId: cAwa,
    accountNumber: "FR76-3000-1007-9412-0005",
    type: "savings",
    balance: dec("15300.50"),
    currency: "EUR",
    openedAt: dt("2023-11-21T11:21:00Z"),
  },
  {
    _id: aYukiCC,
    customerId: cYuki,
    accountNumber: "FR76-3000-1007-9412-0006",
    type: "checking",
    balance: dec("95.00"),
    currency: "EUR",
    openedAt: dt("2025-01-08T08:50:00Z"),
  },
  {
    _id: aOmarEP,
    customerId: cOmar,
    accountNumber: "FR76-3000-1007-9412-0007",
    type: "savings",
    balance: dec("5200.00"),
    currency: "EUR",
    openedAt: dt("2024-09-30T16:25:00Z"),
  },
]);

// ============================================================
//  3) TRANSACTIONS  (référencent accounts._id)
//     type : deposit | withdrawal | transfer
// ============================================================
db.transactions.insertMany([
  // Claire - compte courant
  {
    accountId: aClaireCC,
    type: "deposit",
    amount: dec("1500.00"),
    label: "Salaire",
    date: dt("2025-01-31T06:00:00Z"),
  },
  {
    accountId: aClaireCC,
    type: "withdrawal",
    amount: dec("-60.00"),
    label: "Retrait DAB",
    date: dt("2025-02-02T18:30:00Z"),
  },
  {
    accountId: aClaireCC,
    type: "withdrawal",
    amount: dec("-89.25"),
    label: "Courses",
    date: dt("2025-02-05T12:10:00Z"),
  },
  {
    accountId: aClaireCC,
    type: "transfer",
    amount: dec("-100.00"),
    label: "Virement -> épargne",
    date: dt("2025-02-06T09:00:00Z"),
  },
  {
    accountId: aClaireEP,
    type: "transfer",
    amount: dec("100.00"),
    label: "Virement <- courant",
    date: dt("2025-02-06T09:00:00Z"),
  },

  // Marc
  {
    accountId: aMarcCC,
    type: "deposit",
    amount: dec("900.00"),
    label: "Salaire",
    date: dt("2025-01-31T06:00:00Z"),
  },
  {
    accountId: aMarcCC,
    type: "withdrawal",
    amount: dec("-469.80"),
    label: "Loyer",
    date: dt("2025-02-01T08:00:00Z"),
  },

  // Awa
  {
    accountId: aAwaCC,
    type: "deposit",
    amount: dec("3000.00"),
    label: "Salaire",
    date: dt("2025-01-31T06:00:00Z"),
  },
  {
    accountId: aAwaCC,
    type: "withdrawal",
    amount: dec("-250.00"),
    label: "Assurance",
    date: dt("2025-02-03T10:00:00Z"),
  },
  {
    accountId: aAwaEP,
    type: "deposit",
    amount: dec("300.50"),
    label: "Intérêts",
    date: dt("2025-01-01T00:00:00Z"),
  },

  // Yuki
  {
    accountId: aYukiCC,
    type: "deposit",
    amount: dec("95.00"),
    label: "Dépôt initial",
    date: dt("2025-01-08T09:00:00Z"),
  },

  // Omar
  {
    accountId: aOmarEP,
    type: "deposit",
    amount: dec("5000.00"),
    label: "Versement épargne",
    date: dt("2024-09-30T16:30:00Z"),
  },
  {
    accountId: aOmarEP,
    type: "deposit",
    amount: dec("200.00"),
    label: "Intérêts",
    date: dt("2025-01-01T00:00:00Z"),
  },
]);

// ============================================================
//  4) AGENCES (géolocalisation GeoJSON — atelier 6.1)
//     ATTENTION : coordinates = [longitude, latitude]
// ============================================================
db.branches.insertMany([
  {
    name: "Agence Opéra",
    address: { street: "Bd des Capucines", city: "Paris", zip: "75009" },
    location: { type: "Point", coordinates: [2.3318, 48.8709] },
  },
  {
    name: "Agence Bastille",
    address: { street: "Pl. de la Bastille", city: "Paris", zip: "75011" },
    location: { type: "Point", coordinates: [2.3692, 48.853] },
  },
  {
    name: "Agence La Défense",
    address: { street: "Parvis de la Défense", city: "Puteaux", zip: "92800" },
    location: { type: "Point", coordinates: [2.2369, 48.8918] },
  },
  {
    name: "Agence Lyon Bellecour",
    address: { street: "Pl. Bellecour", city: "Lyon", zip: "69002" },
    location: { type: "Point", coordinates: [4.832, 45.7578] },
  },
  {
    name: "Agence Marseille Vieux-Port",
    address: { street: "Quai du Port", city: "Marseille", zip: "13002" },
    location: { type: "Point", coordinates: [5.3698, 43.2965] },
  },
]);

// ============================================================
//  5) INDEX (cohérents avec l'atelier 4.1 et 6.1)
// ============================================================
db.customers.createIndex({ email: 1 }, { unique: true });
db.accounts.createIndex({ accountNumber: 1 }, { unique: true });
db.accounts.createIndex({ customerId: 1, type: 1 });
db.transactions.createIndex({ accountId: 1, date: -1 });
db.branches.createIndex({ location: "2dsphere" });

// ---- Récapitulatif --------------------------------------------------------
print("=== Seed 'banque' terminé ===");
print("customers    : " + db.customers.countDocuments());
print("accounts     : " + db.accounts.countDocuments());
print("transactions : " + db.transactions.countDocuments());
print("branches     : " + db.branches.countDocuments());
