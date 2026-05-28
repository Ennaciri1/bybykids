# BybykidsStore — E-commerce Mode Femme Maroc

Boutique e-commerce complète pour vêtements femme au Maroc. Next.js App Router + Supabase + TypeScript + Tailwind CSS. Paiement à la livraison. Dashboard admin sécurisé.

---

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 15 App Router | Framework full-stack |
| TypeScript | Typage statique |
| Tailwind CSS | Styles utilitaires |
| Supabase | Base de données PostgreSQL + Auth + Storage |
| Zustand | État du panier (localStorage) |
| React Hook Form + Zod | Formulaires avec validation |
| Lucide React | Icônes |

---

## Structure du projet

```
bybykids/
├── app/
│   ├── (public)/              # Pages publiques (avec Navbar/Footer)
│   │   ├── page.tsx           # Accueil
│   │   ├── shop/              # Boutique + filtres
│   │   ├── products/[slug]/   # Détail produit
│   │   ├── cart/              # Panier
│   │   ├── checkout/          # Commander
│   │   ├── order-success/     # Confirmation commande
│   │   ├── about/             # À propos
│   │   ├── contact/           # Contact
│   │   ├── delivery/          # Politique livraison
│   │   ├── returns/           # Retours & échanges
│   │   ├── terms/             # CGU
│   │   └── privacy/           # Confidentialité
│   ├── admin/                 # Dashboard admin (auth requise)
│   │   ├── login/             # Connexion admin
│   │   ├── page.tsx           # Tableau de bord
│   │   ├── products/          # Gestion produits
│   │   ├── categories/        # Gestion catégories
│   │   ├── orders/            # Gestion commandes
│   │   └── settings/          # Paramètres boutique
│   ├── robots.ts              # SEO robots
│   ├── sitemap.ts             # SEO sitemap
│   └── not-found.tsx          # Page 404
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── product/               # ProductCard, AddToCartSection
│   ├── shop/                  # ShopFiltersPanel
│   ├── admin/                 # AdminSidebar, ProductForm, etc.
│   └── ui/                    # Button, Badge, Loading
├── lib/
│   ├── supabase/              # client.ts, server.ts
│   ├── store/                 # Zustand cart store
│   ├── types/                 # TypeScript types
│   ├── validations/           # Zod schemas
│   └── utils.ts               # Fonctions utilitaires
├── supabase/
│   ├── schema.sql             # Schéma complet + RLS
│   ├── seed.sql               # Données d'exemple
│   └── functions.sql          # Fonctions SQL (décrement stock)
└── middleware.ts              # Protection routes admin
```

---

## Installation locale

### 1. Cloner / naviguer dans le dossier

```bash
cd bybykids
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

#### a) Créer un projet Supabase
- Aller sur [supabase.com](https://supabase.com) → New project

#### b) Exécuter le schéma SQL
Dans Supabase Dashboard → SQL Editor, exécuter dans l'ordre :
1. `supabase/schema.sql` — Crée les tables + RLS
2. `supabase/functions.sql` — Crée la fonction `decrement_stock`
3. `supabase/seed.sql` — Insère les données d'exemple

#### c) Créer le bucket Storage
Dans Supabase Dashboard → Storage → New bucket :
- Nom : `products`
- Public : ✓ (cocher "Public bucket")

Si le bucket n'est pas créé par le SQL (certaines versions), créez-le manuellement dans l'interface.

### 4. Variables d'environnement

```bash
cp .env.example .env.local
```

Remplir `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-ici
```

Trouvez ces valeurs dans : Supabase → Settings → API

### 5. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Configuration du compte admin

### Créer le premier admin

1. Dans Supabase Dashboard → Authentication → Users
2. Cliquer **"Add user"** → **"Create new user"**
3. Renseigner email + mot de passe (ex: `admin@bybykidsstore.ma` / `MotDePasseSecurise123!`)
4. L'admin peut se connecter sur `/admin/login`

> **Important :** Ne jamais exposer les credentials admin. La route `/admin` est protégée par le middleware Next.js + Supabase Auth. Seuls les utilisateurs authentifiés via Supabase Auth peuvent accéder au dashboard.

---

## Déploiement sur Vercel + Supabase

### 1. Pousser sur GitHub

```bash
git init
git add .
git commit -m "Initial commit — BybykidsStore"
git remote add origin https://github.com/votre-user/bybykids.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com) → New Project
2. Importer votre dépôt GitHub
3. Framework : **Next.js** (détecté automatiquement)
4. Ajouter les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Cliquer **Deploy**

### 3. Configurer le domaine (optionnel)

Dans Vercel → Domains → Ajouter votre domaine personnalisé (ex: `bybykidsstore.ma`).

Mettre à jour `robots.ts` et `sitemap.ts` avec votre vrai domaine.

### 4. Configurer Supabase pour la production

Dans Supabase → Authentication → URL Configuration :
- **Site URL** : `https://votre-domaine.vercel.app`
- **Redirect URLs** : `https://votre-domaine.vercel.app/admin`

---

## Fonctionnalités

### Côté client (boutique)
- ✅ Page d'accueil avec hero, produits mis en avant, nouvelles arrivées, catégories
- ✅ Page boutique avec filtres (catégorie, taille, couleur, prix, stock) et tri
- ✅ Recherche de produits
- ✅ Page produit avec galerie images, sélecteur taille/couleur/quantité
- ✅ Panier persistant (localStorage via Zustand)
- ✅ Checkout sans compte — collecte nom, téléphone, ville, adresse
- ✅ Validation numéro marocain (Zod)
- ✅ Commande Cash on Delivery uniquement
- ✅ Page de confirmation avec numéro de référence
- ✅ Pages statiques : À propos, Contact, Livraison, Retours, CGU, Confidentialité

### Côté admin
- ✅ Authentification sécurisée (Supabase Auth)
- ✅ Tableau de bord (stats, commandes récentes, stock faible)
- ✅ CRUD produits complet (avec upload images vers Supabase Storage)
- ✅ Gestion variants (taille / couleur / stock / SKU)
- ✅ CRUD catégories
- ✅ Gestion commandes (voir, filtrer, changer statut)
- ✅ Paramètres boutique (nom, téléphone, WhatsApp, réseaux sociaux, frais livraison)

### SEO
- ✅ Metadata dynamique par page produit
- ✅ Open Graph
- ✅ robots.ts
- ✅ sitemap.ts (dynamique — inclut tous les produits et catégories actifs)

---

## Notes importantes

- **Pas de paiement en ligne** — Cash on Delivery uniquement
- **Pas de compte client** — commande sans inscription
- **Seul l'admin** utilise Supabase Auth
- Le **panier** est stocké en localStorage (Zustand persist)
- La **clé anon Supabase** est publique par conception, protégée par Row Level Security (RLS)
- Ne jamais utiliser la `service_role` key côté client

---

## Personnalisation

| Élément | Fichier |
|---|---|
| Couleurs / thème | `app/globals.css` + classes Tailwind |
| Frais de livraison | `lib/utils.ts` → `DELIVERY_FEE` constant + admin settings |
| Villes disponibles | `lib/utils.ts` → `MOROCCAN_CITIES` |
| Textes/pages légales | `app/(public)/delivery/`, `returns/`, `terms/`, `privacy/` |
| Métadonnées SEO | `app/layout.tsx` + `app/robots.ts` + `app/sitemap.ts` |
