# Conventions & Best Practices

## Langue
- Code, variables, fonctions, commentaires : **anglais**
- Commits : **anglais**
- UI / contenu du jeu : **français**

## Angular
- Suivre le [Angular Style Guide](https://angular.dev/style-guide) officiel
- Standalone components uniquement (pas de NgModules)
- Signals pour tout état local
- `readonly` sur les signals exposés au template
- Pas de `any`

## Fichiers
- Convention de nommage Angular 20 : `hero.ts`, `hero.html`, `hero.css` (pas de `.component`)
- 1 composant = 1 dossier dans `features/`

## Tests
- 1 spec par composant minimum
- Tester le rendu ET la logique

## Git
- 1 mission = 1 commit
- Format : `type(scope): message` en anglais