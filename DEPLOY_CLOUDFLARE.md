# GUIDE DE DÉPLOIEMENT CLOUDFLARE (FULL-STACK PAGES & WORKERS)
## FALLEN 75 FRANCE – PRODUCTION BEAT STORE (AA2026)

Ce projet est conçu pour une architecture Cloudflare 100% Serverless & Edge :
- **Frontend** : React 18 + Vite + Tailwind CSS (ultra-rapide, distribué sur le CDN mondial Cloudflare).
- **Backend API** : Cloudflare Pages Functions (`/functions/api/*`) ou Cloudflare Worker (`worker.ts`).
- **Base de données SQL** : Cloudflare D1 (`fallen75-db`) stockant les 93 morceaux, les commandes et les wallets.
- **Stockage Médias & Masters** : Cloudflare R2 (`music-2026`) pour les fichiers MP3, WAV, stems et pochettes.

---

### ⚠️ IMPORTANT : Différence entre "Direct Upload (Web UI)" et "Pages Functions (Full-Stack)"

Dans le tableau de bord web de Cloudflare (**dash.cloudflare.com**) :
- Le glisser-déposer manuel d'un ZIP dans l'interface web déploie **uniquement les fichiers statiques** (HTML/CSS/JS). L'interface web de Cloudflare ne compile pas les Pages Functions via simple glisser-déposer.
- Pour que vos **Pages Functions avec les bindings D1 et R2** s'activent réellement en production, Cloudflare requiert l'une des deux méthodes ci-dessous :
  1. **Déploiement via Git / GitHub (Recommandé - Automatique)**
  2. **Déploiement via Wrangler CLI (`npx wrangler pages deploy`)**

---

### MÉTHODE 1 : Déploiement via GitHub / Git (La plus simple et automatique)

1. Créez un dépôt sur GitHub (ex. `fallen75france`).
2. Poussez le code source de ce projet sur votre dépôt GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit Fallen 75 France"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USER/fallen75france.git
   git push -u origin main
   ```
3. Connectez-vous sur [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Sélectionnez votre dépôt GitHub.
5. Paramètres de compilation :
   - **Framework preset** : `Vite`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
6. Cliquez sur **Save and Deploy**.
7. **Lier la base D1 et le stockage R2** :
   - Une fois le projet créé, allez dans les **Settings** de votre projet Pages > **Functions** :
     - **D1 database bindings** : Variable name = `DB`, Database = `fallen75-db`
     - **R2 bucket bindings** : Variable name = `R2_BUCKET`, Bucket = `music-2026`
     - **Environment variables** : `ADMIN_PASSWORD` = `12344321` (ou votre mot de passe admin).
8. **Initialiser la base D1 avec les 93 morceaux** :
   ```bash
   npx wrangler d1 execute fallen75-db --file=./schema.sql
   ```
   *Tous les 93 morceaux, les prix, et les wallets sont alors instantanément injectés dans votre base D1 !*

---

### MÉTHODE 2 : Déploiement direct via la commande Wrangler CLI

Si vous ne souhaitez pas utiliser Git :
1. Installez Wrangler (ou utilisez npx) :
   ```bash
   npm install -g wrangler
   wrangler login
   ```
2. Créez votre base D1 et votre bucket R2 si ce n'est pas déjà fait :
   ```bash
   npx wrangler d1 create fallen75-db
   npx wrangler r2 bucket create music-2026
   ```
3. Initialisez la base D1 avec les 93 morceaux du catalogue :
   ```bash
   npx wrangler d1 execute fallen75-db --file=./schema.sql
   ```
4. Déployez le site avec ses Functions sur Cloudflare Pages :
   ```bash
   npx wrangler pages deploy dist --project-name=fallen-75-france
   ```
   *(Ou pour déployer le Worker unifié avec Assets)* :
   ```bash
   npx wrangler deploy
   ```

---

### STRUCTURE DES FONCTIONS & API CLOUDFLARE INCLUSES :

- `/functions/api/auth.ts` : Authentification de l'administrateur sécurisée par token.
- `/functions/api/tracks.ts` : Liste des morceaux depuis D1 (avec fallback automatique si D1 non configuré) et ajout de morceaux.
- `/functions/api/tracks/[id].ts` : Modification et suppression de morceaux dans D1.
- `/functions/api/orders.ts` : Création et consultation des commandes clients et administrateur.
- `/functions/api/orders/[id]/status.ts` : Validation (pending / confirmed / rejected) des commandes dans D1.
- `/functions/api/payment-config.ts` : Gestion et récupération des adresses crypto (USDT TRC20, ETH, SOL) et des coordonnées studio Paris.
- `/functions/api/upload.ts` : Téléversement direct en streaming des fichiers audio MP3/WAV et images dans Cloudflare R2 (`env.R2_BUCKET`).
- `/functions/api/media/[key].ts` : Streaming audio direct depuis Cloudflare R2 avec support des requêtes HTTP Range (lecture fluide et seeking).
- `/functions/api/download/[id].ts` : Téléchargement sécurisé des fichiers master WAV et certificats de licence après confirmation de paiement.
- `/functions/api/init-d1.ts` : Endpoint administrateur pour réinitialiser et synchroniser la base D1 en 1 clic.
