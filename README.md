# Site LARQ avec Three.js

Site e-commerce recréé à l'identique du site LARQ avec Next.js et Three.js, incluant des modèles 3D interactifs des bouteilles.

## 🚀 Démarrage

### Installation des dépendances

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
larq/
├── public/
│   └── images/          # Dossier pour les images de produits
├── src/
│   ├── app/            # Pages Next.js
│   ├── components/     # Composants React
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProductSection.tsx
│   │   ├── ProductCard.tsx
│   │   └── Bottle3D.tsx
│   └── lib/
│       └── products.ts # Données des produits
└── package.json
```

## 🖼️ Ajout d'images de produits

Placez vos images dans le dossier `public/images/` avec les noms suivants :

- `bottle-swig-top.jpg` - LARQ Bottle Swig Top
- `bottle-filtered-swig-top.jpg` - LARQ Bottle Filtered Swig Top
- `bottle-purevis.jpg` - LARQ Bottle PureVis™
- `bottle-filtered-flip-top.jpg` - LARQ Bottle Filtered Flip Top

Voir `public/images/README.md` pour plus de détails.

## ✨ Fonctionnalités

- **UI/UX de haute qualité** : Design moderne et épuré
- **Interactivité complète** : Tous les boutons sont fonctionnels avec feedback visuel
- **Modèles 3D interactifs** : Visualisation 3D des bouteilles avec rotation et zoom
- **Responsive design** : Optimisé pour mobile, tablette et desktop
- **Animations fluides** : Transitions et micro-interactions avec Framer Motion
- **Filtres de produits** : Navigation par catégories
- **Sélection de couleurs** : Changement dynamique des modèles 3D
- **Sélection de tailles** : Mise à jour automatique des prix

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Three.js** - Rendu 3D
- **React Three Fiber** - Intégration Three.js avec React
- **@react-three/drei** - Helpers pour Three.js
- **Framer Motion** - Animations

## 📝 Configuration

Les produits sont définis dans `src/lib/products.ts`. Vous pouvez modifier :
- Les couleurs disponibles
- Les tailles et prix
- Les features
- Les chemins vers les images

## 🎨 Personnalisation

Les couleurs du thème sont définies dans `tailwind.config.ts` :
- `larq-blue` : #1a3a5c
- `larq-blue-light` : #2a4a6c
- `larq-blue-dark` : #0f2538
- `larq-red` : #e63946

## 📦 Dépendances principales

- react: ^18.3.1
- next: ^14.2.0
- @react-three/fiber: ^8.17.10
- @react-three/drei: ^9.114.3
- three: ^0.169.0
- framer-motion: ^11.3.0

## 🔧 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

