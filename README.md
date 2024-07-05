# Demoskv2Updated

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




---
---

## DEMOSKV2

DemoSKV2 est un outils multi-tasking. Il sert de support de test pour différentes fonctionnalité. Il est aussi utilisé en tant que portail entre les différentes applications de démonstration présentais durant les salons et les événements.

### Fonctionnalités

- **Test de fonctionnalités** : Permet de lancer des scénario personnalisé pour tester les fonctionnalités d'une borne. (Exemple : Test de la caméra, test de l'imprimante, test de la connexion internet, etc...) voir [README.md de demoskv2](/src/app/demoSKV2/README.md) . 

- **Applications de démonstration** : Application réalisé pour des salons ou des présentations de borne.

#### Application de démonstration

1. Création d'une application de démonstration

Chaque applications est séparées dans un dossier. Pour ajouter une nouvelle application il suffit de créer un dossier dans le dossier `demos`.  et de rajouter un bouton dans le fichier `app-demo-choice.html`. 

- A l'intérieur de ce dossier il faut créer les différents composants de l'application. (commande pour créer un composant `ng g c nomDuComposant`)
- Les composant doivent ensuite être assigné à une route dans le fichier de routing du dossier/ application . (voir [exemple de fichier app-routing.module.ts](/src/app/demos/MOOVHOP-EK8000-2024-AGIR/moovhop-routing.module.ts))
- Enfin il faut importer le fichier de routing dans le fichier de routing de l'applications DEMOSKV2. (voir [le fichier app-routing.module.ts](/src/app/app-routing.module.ts)).


2. Lancement d'une application de démonstration

    Pour pouvoir lancer une application de démonstration il y a deux méthodes : 
    1. Définition d'un nom d'application à rentrer dans les ``customer_data `` de la maintenance.
        - il faut définir dans le fichier ``app.component.ts`` le nom de l'application de démonstration à lancer avec la route de la page d'accueil de l'application. (voir [le fichier app.component.ts](/src/app/app.component.ts))
    2. Sélectionner l'application dans la liste des applications de démonstration de l'application DEMOSKV2.
        - Pour cela il faut ajouter dans le composant ``app-demo-choice.html`` un bouton qui redirige vers la route de l'application de démonstration. (voir [le fichier app-demo-choice.html](/src/app/demoSKV2/app-demo-choice/app-demo-choice.component.html))
        ```html
        <div class="containerDemo " routerLink="/rootVerslaPageDAccueilDeL'application">
        <img src="logoDeL'application" class="demoImage">
        <div class="description">
            <h3> nomDeLapplication </h3>
            <p> description de l'application </p>
        </div>
        <img class="playButton" src="./assets/DemoSKV2/all-pages-icon/play-button-arrowhead.png">
        </div>
        ```

##### Consignes pour les applications de démonstration

Certaines fonctionnalités présentes sur les applications de démo devront toujours être présentes, mais ne seront pas précisées dans le cahier des charges. Voici une liste des fonctionnalités à intégrer dans les applications de démonstration :

- Dans la majorité des cas le compoasant moovhop-all-pages doit être présent. Il contient des informations et des liens cachés nécessaire au présentation de la borne. (Les pages les plus à jours sont dans le dossier [moov-hop-all-pages](/src/app/demos/MOOVHOP-EK8000-2024-AGIR/moov-hop-all-pages). Il faut y récupérer le HTML qui contient toutes les sections invisibles qui permettent de naviguer dans l'application (retour à la page d'accueil, passage sur la page d'erreur pour le catalogue d'IPM, le bouton skip, ... ).)

- Les applications de démonstration n'ont pas besoin d'être responsive car elles sont faites pour une seul borne. (elles peuvent l'être mais ce n'est pas une priorité)

- Bien penser à rajouter dans le fichier ``app.component.js`` le case de l'application pour pouvoir la lancer avec le nom de l'application dans les ``customer_data`` de la maintenance.

- Il y a des latence lors du chargement des images donc il faut intégrer une transition fondue en blanc lors du chargement de la page. (exemple voir le composant [moovhop-all-pages](/src/app/demos/MOOVHOP-EK8000-2024-AGIR/moov-hop-all-pages/moov-hop-all-pages.component.ts)) (à vérifier que ce problème persiste avec les versions Angular plus récente)


##### Intégration de SoftKiosk dans une application de démonstration

Les différentes fonctions qui peremettent intéractions avec SoftKiosk sont dans le fichier [softkiosk.service.ts](/src/app/softkiosk.service.ts). 

Quelque étapes sont à suivre pour intégrer SoftKiosk dans une application de démonstration :

1. Importer le service SoftKiosk dans le composant de l'application de démonstration.
    ```typescript	
    import { SoftkioskService } from 'src/app/softkiosk.service';
    ```
2. Créer une instance de SoftKiosk dans le constructeur du composant.
    ```typescript
    constructor(private skService: SoftkioskService) { }
    ```
3. Créer un eventListener pour écouter les événements de SoftKiosk. 
    ```typescript
    this.skService.eventListener("nom du Service", "type de l'evenement", functionAlancer());
    ```
4. Créer une fonction qui sera lancée lors de l'événement.
    ```typescript
    functionAlancer(){
        // Code à exécuter lors de l'événement
    }
    ```
5. Une fois l'évènement récupéré et traité, il faut supprimer l'évènement pour éviter les doublons.
    ```typescript
    this.skService.removeEventListener("nom du Service", "type de l'evenement", functionAlancer());
    ```

6. Bonne pratique : Dans le OnDestroy du composant, il faut supprimer tous les événements pour éviter les fuites de mémoire.
    ```typescript
    ngOnDestroy(){
        this.skService.removeEventListener( "nom du Service", "type de l'evenement", functionAlancer());
    }
    ```
    Il est aussi conseilé de reset les différents timeout ou interval qui ont été lancé dans le composant.


Le mieux pour comprendre le fonctionement d'une application de démonstration est de regarder le code des applications déjà existantes. Les applications les plus à jours sont celles réalisé pour les journées AGIR (MOOVHOP-EK8000-2024 et MOOVHOP-EK4000-2024)


### Installation sur une borne

1. build le projet complet avec la commande `ng build ` en étant dans le dossier `DEMOSKV3`. 

2. Copier le contenu du dossier `dist` dans le dossier application du .zip de l'application.

3. lancer l'installation de l'application sur la borne au travers de l'application de maintenance.

