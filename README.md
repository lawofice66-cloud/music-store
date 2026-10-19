# FALLEN 75 FRANCE – AA2026

Boutique moderne et professionnelle de vente d'instrumentales et de beats pour le producteur **FALLEN 75 FRANCE**.

## Points Clés du Projet
- **Design Sombre & Élégant** : Interface moderne, musicale, réactive (desktop et mobile).
- **Catalogue & Lecteur Audio** : Extraits sonores audibles directement dans le navigateur avec moteur Web Audio interactif, BPM, tonalité et tags.
- **Paiements Crypto Intégrés** :
  - **USDT (TRC20)** : `TGCFdvC4qCJNUJpt31TyxuVCM1doERyJAe`
  - **Ethereum** : `0x983dA5413e8755f027DaF36611f1D98Ecfce0300`
  - **Solana** : `HkxrjqehskPQy5HPw5zYKtQo877ntWScffMCHgXphW72`
  - Boutons de copie en 1 clic avec message de confirmation et rappel du réseau.
- **Autres Moyens de Paiement** : Skrill, Payoneer, RedotPay (personnalisables depuis l'admin).
- **Console d'Administration Protégée** :
  - Mot de passe par défaut : `admin2026`
  - Ajout, modification et suppression de morceaux
  - Mise à jour des adresses crypto et moyens de paiement
  - Gestion et validation des commandes pour libérer les téléchargements clients
- **100% Compatible Cloudflare Pages & GitHub** : Pas besoin de PHP, MySQL ou Apache.

---

## 🚀 Guide de Déploiement Rapide (GitHub + Cloudflare Pages)

### Étape 1 : Télécharger et pousser sur GitHub

1. Téléchargez le dossier du projet (via le menu Export ou ZIP dans AI Studio).
2. Ouvrez votre terminal dans le dossier du projet :

```bash
git init
git add .
git commit -m "Site officiel FALLEN 75 FRANCE – AA2026"
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/fallen-75-france.git
git push -u origin main
```

### Étape 2 : Connecter à Cloudflare Pages

1. Créez un compte gratuit sur [Cloudflare](https://dash.cloudflare.com/).
2. Dans le menu de gauche, rendez-vous dans **Compute (Workers & Pages)** > **Create application** > onglet **Pages**.
3. Cliquez sur **Connect to Git** et autorisez votre compte GitHub.
4. Sélectionnez votre repository `fallen-75-france`.

### Étape 3 : Paramètres de Build sur Cloudflare

Renseignez simplement ces informations (Cloudflare détecte souvent automatiquement Vite) :

- **Framework preset** : `Vite`
- **Build command** : `npm run build`
- **Build output directory** : `dist`
- **Environment variables** : Aucune requise pour le site statique !

### Étape 4 : Déployer

Cliquez sur **Save and Deploy**.
Votre site sera compilé et mis en ligne en moins de 60 secondes avec un nom de domaine gratuit `*.pages.dev` ou votre propre domaine personnalisé (ex: `fallen75france.com`) avec certificat SSL HTTPS automatique.

---

## 🛠️ Développement Local

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:3000`.

Pour vérifier la compilation de production :
```bash
npm run build
```

---
AA2026 – Tous droits réservés • FALLEN 75 FRANCE
