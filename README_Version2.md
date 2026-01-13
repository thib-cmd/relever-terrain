# Repro PDF + GPS (mobile) — intégration pour relever-terrain

Ce petit repro permet de :
- sélectionner un fichier PDF (showOpenFilePicker sur Chrome ou fallback `<input type="file">`),
- rendre le PDF en canvas via `pdf.js` (navigation pages Prev/Next),
- fallback vers un `<iframe>` si le rendu échoue,
- demander la permission géolocalisation et afficher la position sur une carte Leaflet (tuiles HTTPS).

Déploiement automatique sur GitHub Pages
- Le workflow GitHub Actions inclus construit et publie le contenu du dépôt sur GitHub Pages.
- Pousse ces fichiers sur la branche `main` du dépôt `thib-cmd/relever-terrain`.
- Ensuite attends la fin de l'action `Deploy static site to GitHub Pages` (onglet Actions).
- L'URL publique sera : `https://thib-cmd.github.io/relever-terrain/` (HTTPS).

Remarques importantes
- Geolocation et showOpenFilePicker nécessitent HTTPS (ou localhost).
- Sur iOS (Safari) l'API `showOpenFilePicker` n'est pas disponible et le rendu PDF par iframe peut se comporter différemment. Utilise le rendu pdf.js pour plus de contrôle.
- Si la géoloc est bloquée (Denied), l'utilisateur doit réactiver la permission depuis les paramètres du navigateur/site.
- Si tu veux que je prépare un PR pour toi, dis-le moi et je prépare la PR ; sinon pousse simplement ces fichiers sur la branche `main`.

Utilisation locale
- Pour tester en local avec HTTPS, utilise `mkcert` ou un petit serveur local qui sert en HTTPS.
- En développement tu peux ouvrir la page via `http://localhost` (si host local), la geoloc peut fonctionner selon le navigateur.

Si tu veux que je l’ajoute dans un sous-dossier (`docs/`), dis-le moi — il faudra ajuster le workflow.