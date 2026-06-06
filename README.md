# Pack de données — Formation MongoDB & .NET (BilletFlux)

Ce dossier contient **tous les jeux de données** des ateliers. Le but : ne **rien
copier-coller** depuis le cahier. Les participants **exécutent un fichier**, ce qui
évite les erreurs dues aux guillemets « intelligents » et aux tirets de Word.

> Tous les fichiers sont en **UTF-8, texte brut**. Ne les ouvrez pas dans Word.

## Contenu

```
datasets/
├─ seed-all.js                 ← amorçage complet en UNE commande
├─ shell/
│  ├─ 01-formation-movies.js   ← Module 2 / Atelier 2.2 (Netflix)
│  ├─ 02-formation-cars.js     ← Module 2 / Atelier 2.3 (concessionnaire)
│  └─ 03-formation-products.js ← Module 2 / Atelier 2.5 (produits)
└─ billetflux/
   ├─ seed-billetflux.js       ← Modules 3-7 : events + customers + orders + index
   ├─ events.json              ← idem, format mongoimport (--jsonArray)
   ├─ customers.json
   └─ orders.json
```

Bases créées : **`formation`** (Modules 1-2) et **`billetflux`** (Modules 3-7).
Tous les scripts sont **idempotents** (la collection est vidée puis re-remplie).

## Option A — Tout charger en une commande (recommandé)

Depuis la **racine** de ce dossier :

```bash
# Local (replica set conseillé pour les transactions du Module 4)
mongosh "mongodb://localhost:27017" seed-all.js

# MongoDB Atlas
mongosh "mongodb+srv://<user>:<pwd>@<cluster>.mongodb.net" seed-all.js
```

## Option B — Charger un jeu précis (mongosh)

```bash
mongosh "mongodb://localhost:27017" shell/01-formation-movies.js
# ou depuis un shell déjà ouvert :
load("shell/01-formation-movies.js")
```

## Option C — Import standard (mongoimport, sans mongosh)

```bash
mongoimport --uri "mongodb://localhost:27017" --db billetflux \
  --collection events    --file billetflux/events.json    --jsonArray --drop
mongoimport --uri "mongodb://localhost:27017" --db billetflux \
  --collection customers --file billetflux/customers.json --jsonArray --drop
mongoimport --uri "mongodb://localhost:27017" --db billetflux \
  --collection orders    --file billetflux/orders.json    --jsonArray --drop
```

> Les fichiers `.json` sont en **Extended JSON** : `_id` en `$oid`, dates en
> `$date`, montants en `$numberDecimal` (→ `Decimal128`, comme les modèles C#).
> Pensez à recréer les index ensuite (voir `seed-billetflux.js`, section index)
> ou exécutez plutôt l'Option A/B qui les pose automatiquement.

## Côté .NET

L'application BilletFlux se connecte simplement à la base **déjà amorcée** : pas
besoin de seed dans le code. Faites l'amorçage une fois (Option A), puis lancez
les ateliers C#. La création des index est aussi l'objet de l'**Atelier 4.3**.

## Cohérence avec les corrigés

Les données correspondent aux corrigés du cahier (mêmes films, mêmes voitures).
Pour BilletFlux, l'**intégrité référentielle** est garantie (les commandes
pointent vers de vrais `_id`) et les **places vendues** de chaque session sont
égales à la somme des billets commandés — le contrôle d'intégrité de l'**Atelier 7.2**
est donc vérifiable dès le départ.

| Base       | Collection | Documents |
|------------|------------|-----------|
| formation  | movies     | 7  |
| formation  | cars       | 4  |
| formation  | products   | 10 |
| billetflux | events     | 9  (dont 1 *draft*, 1 *cancelled*) |
| billetflux | customers  | 8  |
| billetflux | orders     | 24 |
