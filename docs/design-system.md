# 🎨 Design System — CoasterAtlas

Maquettes de référence : [docs/design/](design/). Les couleurs et polices ci-dessous sont déjà disponibles dans le code (voir `src/app/globals.css`).

## Couleurs

| Nom | Code | Utilisation | Classe Tailwind |
| --- | --- | --- | --- |
| Navy | `#1F2A4D` | Textes, titres, « Coaster » du logo | `text-navy`, `bg-navy` |
| Teal | `#6CC3C1` | Boutons principaux, liens, bouton central « + » | `bg-teal` |
| Sage | `#A8D5A2` | Tampon « Visité », continents | `bg-sage` |
| Peach | `#F7B57A` | Tampon « Prochain voyage » | `bg-peach` |
| Coral | `#F28B82` | « Atlas » du logo, rails du coaster, favoris | `text-coral` |
| Lilac | `#C9A7E8` | Tampon « Défi en cours » | `bg-lilac` |
| Sun | `#FBD27A` | Étoiles, badges | `bg-sun` |
| Sky | `#8EC5E8` | Tampon « Wishlist » | `bg-sky` |
| Cream | `#FFF9F2` | Fond de page | `bg-cream` |
| Ocean | `#E6F3F8` | Océans de la carte | `bg-ocean` |

Ambiance : pastel, beaucoup d'espace blanc, coins très arrondis, ombres très douces.

## Typographie

- **Poppins** : titres (moderne, douce et lisible). Classe `font-display`.
- **Nunito** : textes. Classe `font-sans` (par défaut).

## Les tampons (notre signature)

| Statut | Apparence |
| --- | --- |
| Parc à découvrir | Cercle blanc, contour pastel très fin |
| Wishlist | Bleu pastel, petite étoile |
| Visité | Vert sauge, discret effet tampon |
| Prochain voyage | Orange doux, légère pulsation |
| Défi en cours | Violet pastel, couronne ou trophée |

Style : effet d'encre léger, contour irrégulier, texte circulaire, illustration minimaliste au centre.

**Animation signature, le tampon passeport.** Quand un Atlaster marque un parc comme visité : le cercle apparaît, un tampon vient se poser dessus avec un petit « clac », la pastille devient verte et le pays se colore légèrement sur la carte.

## La carte

Océans bleu très clair, continents crème et sauge, très peu de frontières, aucune route, beaucoup d'espace blanc, tampons bien espacés. Le monde n'est jamais vide : petites illustrations pastel discrètes (montgolfière, voilier, nuages, forêt, montagne), comme un atlas illustré.

## Règle des 3 secondes

Chaque écran doit répondre, sans lire de texte, à :
1. Où suis-je ?
2. Que puis-je faire ?
3. Qu'est-ce qui est important ?

Si on doit réfléchir plus de 3 secondes, on simplifie.

## Navigation de l'application (maquettes)

Accueil · Explorer · **+** (bouton central : je visite un parc, ajouter un coaster, ajouter un souvenir, écrire un avis, ma wishlist) · Voyages · Profil
