# 🌍 CoasterAtlas

La carte mondiale des parcs d'attractions. Où que tu sois, tu vois les parcs autour de toi, les coasters, leurs notes et les liens vers les applis officielles. Tu peux aussi garder le souvenir de tes visites (coasters faits, badges, carte des pays visités).

On commence par un **site web**. Une application mobile viendra ensuite.

## Technologies

- [Next.js](https://nextjs.org) 15 (React, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) pour le style
- Hébergement prévu sur [Vercel](https://vercel.com) (gratuit pour commencer)

## Lancer le projet sur ton ordinateur

### 1. Installer les outils (une seule fois)

- **Node.js** version 20 ou plus : télécharge la version « LTS » sur [nodejs.org](https://nodejs.org) et installe-la. Vérifie dans un terminal :
  ```bash
  node -v
  npm -v
  ```
- **Git** : [git-scm.com](https://git-scm.com/downloads) (sur Mac, il est souvent déjà installé).
- **VS Code** (conseillé) : [code.visualstudio.com](https://code.visualstudio.com).

### 2. Récupérer le code

```bash
git clone https://github.com/Kiwikipu/coasteratlas.git
cd coasteratlas
```

### 3. Installer les dépendances

```bash
npm install
```

Ça crée un dossier `node_modules` (il n'est jamais envoyé sur GitHub).

### 4. Lancer le site en local

```bash
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur. Chaque modification d'un fichier est visible tout de suite. Pour arrêter : `Ctrl + C` dans le terminal.

## Commandes utiles

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lance le site en local |
| `npm run build` | Prépare la version de production |
| `npm run start` | Lance la version de production en local |
| `npm run lint` | Vérifie la qualité du code |

## Structure

```
src/app/         Pages du site (page.tsx = page d'accueil)
public/          Images et fichiers statiques
.github/         Modèles d'issues et de PR, vérification automatique (CI)
```

## Mettre le site en ligne

1. Crée un compte sur [vercel.com](https://vercel.com) avec ton compte GitHub.
2. « Add New Project », choisis le dépôt `coasteratlas`, clique sur « Deploy ».
3. Ensuite, chaque modification poussée sur `main` met le site à jour automatiquement.

## Feuille de route

- [ ] Carte du monde interactive avec les parcs
- [ ] Fiche parc (coasters, horaires, lien vers l'appli officielle)
- [ ] Fiche coaster (type, constructeur, année, notes)
- [ ] « Autour de moi » (parcs dans un rayon donné)
- [ ] Comptes utilisateurs : coasters faits, favoris, badges
- [ ] Application mobile
