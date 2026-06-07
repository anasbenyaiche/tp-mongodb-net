# Pack de données — Formation MongoDB & .NET (BilletFlux)

Ce dossier contient **tous les jeux de données** des ateliers. Le but : **exécutent un fichier**, ce qui
évite les erreurs, seed tout les données .

> Tous les fichiers sont en **UTF-8, texte brut**. Ne les ouvrez pas dans Word.
 
## Contenu
 
```
datasets/
├─ seed-all.js                 ← amorçage complet en UNE commande
├─ shell/
│  ├─ 01-formation-movies.js   ← Module 2 / Atelier 2.2 (Netflix)
│  ├─ 02-formation-cars.js     ← Module 2 / Atelier 2.3 (concessionnaire)
│  └─ 03-formation-products.js ← Module 2 / Atelier 2.5 (produits)
└─ bankflux/
   ├─ seed-bankflux.js         ← Modules 3-7 : customers + accounts + transactions + branches
   ├─ customers.json           ← Extended JSON (--jsonArray pour mongoimport)
   ├─ accounts.json
   ├─ transactions.json
   ├─ branches.json
   └─ models.cs                ← classes POCO C# (Customer, Account, Transaction, Branch, Address)
```
 
Bases créées : **`formation`** (Modules 1-2) et **`bankflux`** (Modules 3-7).
Tous les scripts sont **idempotents** (la collection est vidée puis re-remplie).
 
## Option A — Tout charger en une commande (recommandé)
 
Depuis la **racine** de ce dossier :
 
```bash
# Local (replica set conseillé pour les transactions du Module 4)
mongosh "mongodb://localhost:27017" seed-all.js
 
# MongoDB Atlas
mongosh "mongodb+srv://<user>:<pwd>@<cluster>.mongodb.net" seed-all.js
```
 
> **Note ports.** À l'intérieur d'un conteneur Docker, MongoDB écoute toujours sur
> `27017`. Depuis Windows, utilisez le port mappé (souvent `27018`, ou `27018/27019/27020`
> pour un replica set, `27021` pour un cluster shardé via le mongos).
 
## Option B — Charger un jeu précis (mongosh)
 
```bash
mongosh "mongodb://localhost:27017" shell/01-formation-movies.js
mongosh "mongodb://localhost:27017" bankflux/seed-bankflux.js
# ou depuis un shell déjà ouvert :
load("bankflux/seed-bankflux.js")
```
 
## Option C — Import standard (mongoimport, sans mongosh)
 
```bash
mongoimport --uri "mongodb://localhost:27017" --db bankflux \
  --collection customers    --file bankflux/customers.json    --jsonArray --drop
mongoimport --uri "mongodb://localhost:27017" --db bankflux \
  --collection accounts     --file bankflux/accounts.json     --jsonArray --drop
mongoimport --uri "mongodb://localhost:27017" --db bankflux \
  --collection transactions --file bankflux/transactions.json --jsonArray --drop
mongoimport --uri "mongodb://localhost:27017" --db bankflux \
  --collection branches     --file bankflux/branches.json     --jsonArray --drop
```
 
> Les fichiers `.json` sont en **Extended JSON** : `_id` en `$oid`, dates en
> `$date`, montants en `$numberDecimal` (→ `Decimal128`, comme les modèles C#).
> `seed-bankflux.js` les lit via `EJSON.parse`, qui revivifie automatiquement ces types.
 
## Chargement avec Docker
 
```bash
# Copier le dossier dans le conteneur
docker cp . mongodb:/datasets
 
# Lancer le seed (port interne 27017)
docker exec -it -w /datasets mongodb mongosh "mongodb://localhost:27017" bankflux/seed-bankflux.js
```
 
> **Git Bash (MINGW64) :** si `-w /datasets` échoue avec *« Cwd must be an absolute
> path »*, préfixez par `MSYS_NO_PATHCONV=1` ou doublez le slash : `-w //datasets`.
 
## Index
 
Le seed charge **uniquement les données** (pas d'index), pour garder l'amorçage simple
et rapide. La **création des index** (unique sur `email` et `accountNumber`, `2dsphere`
sur `branches.location`, composé `{ accountId, date }` sur `transactions`) est l'objet
de l'**Atelier 4.3**, réalisé depuis C# avec `Builders<T>.IndexKeys`.
 
## Côté .NET
 
L'application BankFlux se connecte simplement à la base **déjà amorcée** : pas besoin
de seed dans le code. Faites l'amorçage une fois (Option A), puis lancez les ateliers C#.
Les classes POCO correspondantes sont dans `bankflux/models.cs`.
 
## Cohérence avec les corrigés
 
Les données correspondent aux corrigés du cahier (mêmes films, mêmes voitures, mêmes
clients). Pour BankFlux, l'**intégrité référentielle** est garantie :
 
- chaque `account.customerId` pointe vers un vrai `customers._id` ;
- chaque `transaction.accountId` pointe vers un vrai `accounts._id` ;
- **0 référence orpheline**.
Le **contrôle d'intégrité** de l'**Atelier 7.3 (capstone)** — le solde d'un compte doit
correspondre à la cohérence de ses opérations — est donc vérifiable dès le départ.
 
| Base       | Collection    | Documents                          |
| ---------- | ------------- | ---------------------------------- |
| formation  | movies        | 7                                  |
| formation  | cars          | 4                                  |
| formation  | products      | 10                                 |
| bankflux   | customers     | 5                                  |
| bankflux   | accounts      | 7 (dont 6 *active*, 1 *pending*)   |
| bankflux   | transactions  | 13                                 |
| bankflux   | branches      | 5 (géolocalisées, GeoJSON)         |
