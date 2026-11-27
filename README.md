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
git clone https://github.com/Kiwikipu/CoasterAtlas.git
cd CoasterAtlas
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

## Les pages du site

| Adresse | Page |
| --- | --- |
| `/` | **Mon Voyage** : la grande carte du monde avec les tampons passeport (légende, filtre, « autour de moi »), puis prochain voyage, défi du moment, Explorer, Ton Atlas, souvenir du jour, Atlasters |
| `/carte` | Carte en plein écran avec recherche et zoom |
| `/bienvenue` | Premier lancement : 4 écrans, puis « Quel type d'Atlaster es-tu ? » |
| `/parcs` et `/parcs/europa-park` | Liste des parcs et fiche parc |
| `/coasters` et `/coasters/silver-star` | Liste des coasters (« Je l'ai fait ») et fiche coaster |
| `/atlas`, `/passeport` | Mon Atlas (profil, carte, badges) et passeport avec la frise des visites |
| `/defis` | Défis en cours / terminés et détail d'un défi |
| `/carnet` | Carnet de voyage et souvenirs (carte postale à partager) |
| `/voyages` | Planificateur : billets, hôtel, parking, transport, checklist |
| `/visite` | « Je visite un parc » : pose un tampon avec l'animation « clac » |

Le bouton central **globe** ouvre les raccourcis : je visite un parc, ajouter un coaster, ajouter un souvenir, écrire un avis, ma wishlist.

Les données sont **des exemples** (`src/data/`). Le profil de démonstration (tampons, coasters faits, checklist) est gardé dans ton navigateur : rien n'est envoyé sur un serveur pour l'instant.

## Structure

```
src/app/            Pages du site
src/app/(app)/      Pages de l'application (avec la barre de navigation en bas)
src/components/     Éléments réutilisables (Stamp = tampon, WorldMap = carte, Art = illustrations…)
src/data/           Données d'exemple : parcs, coasters, voyages, souvenirs, défis
src/lib/            Carte du monde (world.ts), état du profil (store.tsx), dates
docs/               Product Book, design system, maquettes
.github/            Modèles d'issues et de PR, vérification automatique (CI)
```

## Mettre le site en ligne

1. Crée un compte sur [vercel.com](https://vercel.com) avec ton compte GitHub.
2. « Add New Project », choisis le dépôt `CoasterAtlas`, clique sur « Deploy ».
3. Ensuite, chaque modification poussée sur `main` met le site à jour automatiquement.

## Feuille de route

- [x] Identité visuelle : couleurs, polices, tampons (voir [docs/](docs/))
- [x] Prototype complet du site : accueil, carte, fiches parc et coaster, Atlas, passeport, défis, carnet, voyages
- [ ] Liste d'attente « Devenir Atlaster Fondateur » (plus tard)
- [ ] Vraies données de parcs et de coasters
- [ ] « Autour de moi » avec la vraie position (déjà possible en démo)
- [ ] Comptes utilisateurs : coasters faits, favoris, badges
- [ ] Application mobile
