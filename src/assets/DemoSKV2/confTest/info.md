## Fonctionnement JSON de configuration

Le fichier de configuration est un fichier JSON qui contient les informations nécessaires pour l'affichage du test danss l'application.

### Exemple structure du fichier

```json
{
    "title": "TitleTest",
    "JSFile": "JSFileTest.js",
    "description":  "description test",
    "params": [
        { 
            "name": "nomVariable1",
            "typeParam": "input",
            "description": "description nomVariable1",
            "type": "typeVariable1",
            "value": "defaultValue1"
        },
                
        { 
            "name": "selectName",
            "typeParam": "select",
            "description": "description selectName",
            "choice":[
                {
                    "name": "choix1",
                    "value": "choix1"
                },
                
            ]
        }
    ],
    "events": [
        {
            "name": "event1",
            "description": "description event1",
            "dataType":[
                {
                    "condition": "typeEvenement1",
                    "desciption": "description typeEvenement1",
                    
                }
            ]
        },
       
    ],
    "perifUsed":[
        {
            "name": "nomPerif1",
        },
        
    ]
}
```

#### Explication des champs

- **title** : Titre du test
- **JSFile** : Nom du fichier js associé au test
- **description** : Description du test
- **params** : Tableau des paramètres modifiables par l'utilisateur
    - **name** : Nom du paramètre
    - **typeParam** : Type de paramètre (input, select, checkbox)
    - **description** : Description du paramètre
    - **type** : Type du paramètre
    - **value** : Valeur par défaut du paramètre
    - **choice** : Tableau des choix pour un paramètre de type select
        - **name** : Nom du choix
        - **value** : Valeur du choix
- **events** : Tableau des événements associés au test
    - **name** : Nom de l'événement
    - **description** : Description de l'événement
    - **dataType** : Tableau des conditions associées à l'événement
        - **condition** : Type de condition
        - **description** : Description de la condition
- **perifUsed** : Tableau des périphériques utilisés par le test
    - **name** : Nom du périphérique
    

Ce fichier permet de définir les informations nécessaires pour l'affichage du test dans l'application. Il permet aussi de définir les différents événements et conditions associés au test. Ainsi que de définir les différents paramêtre qui peuvent être modifié par l'utilisateur au travers de l'interface.


## Exemple de fichier js 
