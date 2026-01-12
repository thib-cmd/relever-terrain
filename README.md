[README.md](https://github.com/user-attachments/files/24573285/README.md)
# 📱 Application de Relevés de Chantier - MARAIS

**MARAIS - TESMEC GROUP COMPANY**

Application mobile web responsive pour effectuer des relevés de chantier professionnels avec géolocalisation, photos et génération de fiches PDF.

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![Status](https://img.shields.io/badge/status-production-green)

---

## 🎯 Vue d'ensemble

Cette application permet aux équipes terrain de MARAIS (TESMEC GROUP COMPANY) de créer, gérer et exporter des relevés de chantier complets avec toutes les informations nécessaires : localisation GPS, photos, signature électronique et génération automatique de fiches de préparation au format PDF.

**Version 3.0** - Interface simplifiée et optimisée pour les tranchées.

---

## ✅ Fonctionnalités Implémentées

### 🆕 Création de Relevés
- ✅ Formulaire complet de relevé de chantier
- ✅ Informations client et localisation
- ✅ **Type de Machine** (options spécialisées) :
  - Roue déportée
  - Roue axiale
  - Chaîne
  - Extra déport
  - City clean
  - Fast clean
  - Fast green
  - Pose
  - Multicut
  - Multicut gaz
  - Roue axiale extra déport
- ✅ Sélection du type de réseau (Électrique, Gaz, Eau, Télécom, etc.)
- ✅ Diamètre du réseau
- ✅ **Dimensions de Tranchée** (Longueur, Profondeur, Largeur en mètres)
- ✅ Type de terrain avec nature et dureté (Tendre, Moyen, Dur)
- ✅ Cadence estimée
- ✅ Linéage transfert
- ✅ Description détaillée du chantier
- ✅ Date et heure automatiques
- ✅ Upload multiple de photos du chantier
- ✅ Prévisualisation et suppression de photos

### 🗺️ Géolocalisation & Carte Interactive
- ✅ Carte interactive Leaflet avec OpenStreetMap
- ✅ **NOUVEAU:** Double bouton "Localiser ma position" (en haut et dans la section GPS)
- ✅ **NOUVEAU:** Barre de recherche d'adresse avec géocodage
- ✅ Recherche d'adresse par nom de rue, ville, code postal
- ✅ Marqueur draggable pour placer précisément la localisation
- ✅ Géolocalisation automatique (GPS du téléphone/appareil)
- ✅ Géocodage inverse (coordonnées → adresse)
- ✅ Affichage des coordonnées GPS (latitude/longitude)
- ✅ Clic sur la carte pour positionner le marqueur

### ✍️ Signature Électronique
- ✅ Canvas de signature tactile responsive
- ✅ Effacement et recommencement possible
- ✅ Validation obligatoire avant enregistrement
- ✅ Export de la signature en base64

### 📋 Gestion des Relevés
- ✅ Liste complète des relevés enregistrés
- ✅ Compteur total de relevés
- ✅ Affichage des informations principales (client, lieu, machine, réseau)
- ✅ Vue détaillée de chaque relevé avec toutes les informations
- ✅ Affichage des dimensions de tranchée
- ✅ Modal de détails avec carte de localisation
- ✅ Suppression de relevés avec confirmation
- ✅ Tri par date de création (plus récent en premier)

### 🔍 Recherche Avancée
- ✅ Recherche par mot-clé (client, lieu, description)
- ✅ Filtrage par type de machine
- ✅ Filtrage par type de réseau
- ✅ Affichage du nombre de résultats
- ✅ Interface de recherche dédiée

### 📄 Génération de PDF
- ✅ Fiche de préparation professionnelle avec logo MARAIS
- ✅ Toutes les informations du relevé incluses
- ✅ Type de machine spécialisé
- ✅ Diamètre du réseau
- ✅ **Dimensions de Tranchée** (longueur, profondeur, largeur)
- ✅ Type et dureté du terrain
- ✅ Cadence estimée et linéage transfert
- ✅ Coordonnées GPS et localisation
- ✅ Photos intégrées (jusqu'à 4 photos)
- ✅ Signature électronique
- ✅ Pagination automatique
- ✅ En-tête et pied de page
- ✅ Téléchargement automatique du fichier PDF

### 📱 Interface Mobile
- ✅ **Logo MARAIS - TESMEC GROUP COMPANY** dans l'en-tête
- ✅ Design responsive mobile-first
- ✅ Navigation intuitive à 3 onglets (Nouveau, Liste, Recherche)
- ✅ Header fixe avec menu
- ✅ Icônes Font Awesome
- ✅ Notifications toast
- ✅ Style PWA (Progressive Web App)
- ✅ Optimisé pour écrans tactiles

---

## 🚀 URIs et Points d'Entrée

### Pages Principales

| URI | Description |
|-----|-------------|
| `index.html` | Page principale de l'application |
| `index.html#form` | Formulaire de nouveau relevé (onglet actif par défaut) |
| `index.html#list` | Liste des relevés enregistrés |
| `index.html#search` | Interface de recherche |

### API REST (Backend)

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/tables/releves` | GET | Liste tous les relevés (pagination, tri, recherche) |
| `/tables/releves/{id}` | GET | Récupère un relevé spécifique |
| `/tables/releves` | POST | Crée un nouveau relevé |
| `/tables/releves/{id}` | PUT | Met à jour un relevé complet |
| `/tables/releves/{id}` | PATCH | Met à jour partiellement un relevé |
| `/tables/releves/{id}` | DELETE | Supprime un relevé (soft delete) |

---

## 📊 Modèle de Données

### Table `releves` (Version 3.0)

| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | Identifiant unique (UUID) |
| `clientName` | text | Nom du client |
| `location` | text | Adresse du chantier |
| `machineType` | text | Type de machine (spécifications techniques) |
| `networkType` | text | Type de réseau |
| `networkDiameter` | text | Diamètre du réseau |
| `length` | number | Longueur de la tranchée en mètres |
| `depth` | number | Profondeur de la tranchée en mètres |
| `width` | number | Largeur de la tranchée en mètres |
| `terrainType` | text | Nature du terrain |
| `terrainHardness` | text | Dureté du terrain (Tendre/Moyen/Dur) |
| `estimatedCadence` | text | Cadence estimée |
| `lineageTransfer` | text | Linéage transfert |
| `description` | rich_text | Description détaillée du chantier |
| `dateTime` | datetime | Date et heure du relevé (timestamp) |
| `latitude` | number | Latitude GPS |
| `longitude` | number | Longitude GPS |
| `photos` | array | Tableau d'images en base64 |
| `signature` | text | Signature électronique en base64 |
| `created_at` | datetime | Date de création (auto) |
| `updated_at` | datetime | Date de modification (auto) |

### Énumérations

**Types de Machines (Spécialisées) :**
- Roue déportée
- Roue axiale
- Chaîne
- Extra déport
- City clean
- Fast clean
- Fast green
- Pose
- Multicut
- Multicut gaz
- Roue axiale extra déport

**Types de Réseaux :**
- Électrique
- Gaz
- Eau
- Télécom
- Assainissement
- Fibre optique
- Mixte
- Autre

**Dureté du Terrain :**
- Tendre
- Moyen
- Dur

---

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **Tailwind CSS** - Framework CSS utility-first (via CDN)
- **JavaScript (Vanilla)** - Logique applicative
- **Font Awesome 6** - Icônes (via CDN)

### Bibliothèques JavaScript
- **Leaflet 1.9.4** - Cartes interactives OpenStreetMap
- **jsPDF 2.5.1** - Génération de PDF côté client
- **Signature Pad 4.1.7** - Canvas de signature électronique
- **Nominatim API** - Géocodage et recherche d'adresses

### Backend & Stockage
- **RESTful Table API** - API de gestion de données
- **Base de données** - Backend fourni par la plateforme

---

## 📱 Guide d'Utilisation

### Créer un Nouveau Relevé

1. **Ouvrir l'application** et accéder à l'onglet "Nouveau" (actif par défaut)

2. **Remplir les informations générales :**
   - Nom du client (obligatoire)
   - Lieu du chantier (obligatoire)
   - Cliquer sur **"Utiliser ma position"** pour géolocalisation automatique
   - Type de machine (obligatoire) - Sélection parmi 11 options spécialisées
   - Type de réseau (obligatoire)
   - Diamètre du réseau (optionnel)
   - Date et heure (pré-remplie)

3. **Dimensions de Tranchée :**
   - Longueur en mètres
   - Profondeur en mètres
   - Largeur en mètres

4. **Type de Terrain :**
   - Nature du terrain (ex: Argile, Sable, Roche)
   - Dureté : Tendre / Moyen / Dur (obligatoire)

5. **Performance Estimée :**
   - Cadence estimée (ex: 50m/jour)
   - Linéage transfert (ex: 200m)

6. **Localisation GPS :**
   - **Localiser ma position** - GPS automatique
   - **Rechercher une adresse** - Barre de recherche avec géocodage
     - Entrer une adresse, rue, ville, code postal
     - Cliquer sur l'icône de recherche
     - La carte se centre automatiquement sur l'adresse
   - OU déplacer le marqueur manuellement
   - OU cliquer directement sur la carte

7. **Ajouter une description détaillée** du chantier

8. **Ajouter des photos** du chantier

9. **Signer électroniquement** le relevé

10. **Enregistrer** le relevé

### Utiliser la Recherche d'Adresse

La nouvelle fonctionnalité de recherche vous permet de localiser précisément un chantier :

1. Dans la section **Localisation GPS**
2. Cliquer sur **"Localiser ma position"** pour une localisation rapide
3. OU utiliser la **barre de recherche** :
   - Entrer une adresse complète ou partielle
   - Ex: "25 Rue de Paris, 75001 Paris"
   - Ex: "Lyon 69000"
   - Appuyer sur Entrée ou cliquer sur l'icône 🔍
4. La carte se centre automatiquement sur l'adresse trouvée
5. Le champ "Lieu du chantier" est mis à jour automatiquement
6. Les coordonnées GPS sont actualisées

### Consulter les Relevés

1. Accéder à l'onglet **"Liste"**
2. Voir tous les relevés avec leurs informations principales
3. **Cliquer sur une carte** pour voir les détails complets incluant :
   - Toutes les informations générales
   - Type de machine spécialisé
   - Dimensions de tranchée
   - Type de terrain et dureté
   - Performance estimée
   - Carte interactive de localisation
   - Galerie de photos
   - Signature électronique

### Générer un PDF

Le PDF généré avec le logo MARAIS inclut :
- En-tête professionnel
- Type de machine spécialisé
- Diamètre du réseau
- **Dimensions de Tranchée** complètes
- Type et dureté du terrain
- Cadence estimée et linéage transfert
- Toutes les autres informations standard

---

## 🆕 Nouveautés Version 3.0

### Changements Majeurs

1. **Logo MARAIS - TESMEC GROUP COMPANY**
   - Intégré dans l'en-tête de l'application
   - Présent sur tous les PDF générés

2. **Simplification du Type de Machine**
   - Suppression de l'ancien champ "Type de Machine" générique
   - Le champ "Type de Machine" contient maintenant directement les spécifications techniques
   - 11 options spécialisées disponibles
   - Plus de champ conditionnel, interface simplifiée

3. **Renommage "Dimensions de Tranchée"**
   - Anciennement "Dimensions et Mesures"
   - Nom plus explicite et professionnel
   - Apparaît dans le formulaire, les détails et le PDF

4. **Amélioration de la Localisation GPS**
   - **Double bouton "Localiser ma position"** :
     - Un dans la section "Informations générales"
     - Un dans la section "Localisation GPS"
   - **Barre de recherche d'adresse** :
     - Recherche instantanée via Nominatim
     - Géocodage précis
     - Centrage automatique de la carte
     - Mise à jour du champ "Lieu du chantier"

### Améliorations UX

- Interface plus épurée et professionnelle
- Navigation plus fluide
- Recherche d'adresse intuitive
- Logo corporate visible en permanence

---

## 🔐 Permissions Requises

- **Géolocalisation** - Pour utiliser la position GPS de l'appareil
- **Appareil photo / Galerie** - Pour ajouter des photos du chantier
- **Stockage local** - Pour sauvegarder les données
- **Internet** - Pour la recherche d'adresses et les cartes

---

## 💾 Stockage des Données

### Base de Données Cloud
- Les relevés sont stockés dans une base de données backend
- **19 champs** de données par relevé (version 3.0)
- Synchronisation automatique via l'API REST
- Données persistantes et accessibles depuis n'importe quel appareil

---

## 📌 Prochaines Étapes Recommandées

### Améliorations Fonctionnelles
- [ ] **Mode hors-ligne avancé** - Service Worker pour fonctionnement sans connexion
- [ ] **Export Excel/CSV** - Export des relevés avec tous les champs
- [ ] **Templates par type de machine** - Pré-remplissage selon la machine
- [ ] **Calculs automatiques** - Volume de terre, temps estimé, etc.
- [ ] **Historique de modifications** - Suivi des changements
- [ ] **Synchronisation multi-appareils** - Accès temps réel

### Optimisations
- [ ] **Validation des dimensions** - Alertes si valeurs aberrantes
- [ ] **Photos géolocalisées** - EXIF data des photos
- [ ] **Comparaison de relevés** - Avant/après sur un même site
- [ ] **Import de plans** - Intégration de plans de chantier
- [ ] **Météo locale** - Conditions météo au moment du relevé

---

## 🐛 Résolution de Problèmes

### La recherche d'adresse ne fonctionne pas
- Vérifier la connexion Internet
- L'API Nominatim nécessite une connexion active
- Essayer avec une adresse plus précise

### La géolocalisation ne fonctionne pas
- Vérifier que les permissions de localisation sont activées
- Vérifier que le GPS est activé sur l'appareil
- Utiliser une connexion HTTPS (requis pour la géolocalisation)

### Le logo ne s'affiche pas
- Vérifier que le fichier `images/logo-marais.png` existe
- Rafraîchir la page du navigateur
- Vider le cache du navigateur

---

## 📄 Licence

Application développée pour MARAIS - TESMEC GROUP COMPANY  
Usage professionnel interne.

---

## 🎉 Changelog

### Version 3.0.0 (2026-01-11)
🎨 **Refonte interface :**
- Ajout du logo MARAIS - TESMEC GROUP COMPANY
- Simplification du champ "Type de Machine"
- Renommage "Dimensions de Tranchée"

✨ **Nouvelles fonctionnalités :**
- Double bouton "Localiser ma position"
- Barre de recherche d'adresse avec géocodage
- Recherche instantanée via Nominatim API
- Centrage automatique de la carte sur recherche

🔧 **Améliorations :**
- Interface épurée
- Meilleure UX pour la localisation
- Navigation optimisée

### Version 2.0.0 (2026-01-10)
✨ Ajout de 9 nouveaux champs de données
🔧 Spécifications techniques avancées

### Version 1.0.0 (2026-01-10)
🎉 Version initiale

---

**Version 3.0.0** - MARAIS - TESMEC GROUP COMPANY - Janvier 2026
