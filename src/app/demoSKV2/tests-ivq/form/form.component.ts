import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
 declare var Kiosk : any;


@Component({
      selector: 'app-form',
      templateUrl: './form.component.html',
      styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

      @Output() data: any;
      arrayWorks = [{ group: "Etudiant", values: ["Etudiant du supérieur", "Elève du secondaire ou primaire"] }, { group: "En activité", values: ["Artisan/ commerçant/ agriculteur", "Chef d'entreprise", "Fonctionnaire catégorie A", "Fonctionnaire (autres catégories)", "Profession libérale ou médicale", " Salarié cadre ", "Salarié cadre supérieur ou cadre dirigeant", "Salarié non cadre / ouvrier"] }, { group: "Divers", values: ["Sans activité professionnelle/ au foyer", "Retraité", "Personne en situation de handicap"] }]
      arrayCountries = [{ group: "Europe", values: ["France", "Espagne", "Suisse", "Allemagne", "Suède", "Norvège", "Finlande", "Pays-Bas", "Belgique", "Luxembourg", "Irlande", "Islande", "Italie", "Royaume-Uni"] }, { group: "Amérique", values: ["Canada", "Etats-Uni", "Mexique", "Bolivie", "Pérou", "Colombie", "Brésil"] }, { group: "Asie", values: ["Chine", "Japon", "Taiwan", "Inde", "Corée du Sud"] }]
      arrayAnimals = ["dog.png", "cat.png", "lion_face.png", "racehorse.png", "whale.png", "pig.png"]
      arrayFuture = ["Riche", "Célèbre", "Etre très intelligent", "Chef d'entreprise", "Dormir sous les ponts"]
      arrayOtherFuture = ["Roi/Reine du UK", "Boulanger", "Directeur général d'IPM france"]
      // tableaux de printing
      arrayEmployees = [{ group: "R&D", message: "rendez-vous dans le laboratoire R&D d'IPM", values: ["Tim", "Hervé", "Lucian", "Hamza", "Olivier", "Nadège", "Axel", "Sophie", "Cédric"] }, { group: "Commercial", message: "rendez-vous dans les bureaux des commerciaux à gauche de l'entrée", values: ["Maxence", "Sylvain"] }, { group: "Marketing", message: "rendez-vous dans les bureaux à droite de l'entrée d'IPM", values: ["Cléa", "Alexandra"] }, { group: "RH", message: "rendez-vous dans les bureaux de RH", values: ["Christelle"] }, { group: "Atelier", message: "rendez-vous dans l'atelier d'IPM, au coeur de la production de bornes interactives", values: ["Alexis"] }];
      mainArray = [{ name: "Nom(s) et prénom(s)", control: "name" }, { name: "Date de naissance", control: "birthdate" }, { name: "Genre", control: "gender" }, { name: "Métier", control: "work" }, { name: "Situation sociale", control: "socialSituation" }, { name: "Age de début de travail", control: "ageWork" }, { name: "Pays", control: "country" }, { name: "Couleur préférée", control: "color" }, { name: "Animal préféré", control: "animal" }, { name: "Vos ambitions dans 10 ans", control: "future" }, { name: "Autre", control: "otherFuture", ischecked: true }];
      person: any;
      val: number = 21
      state: string = "left"
      textButton: string = "GET STARTED"
      submitted: boolean | undefined;
      form: FormGroup = new FormGroup({});
      element : any;
      arrayFromControl = ["name", "birthdate", "gender", "work", "socialSituation", "ageWork", "country", "color", "animal", "future", "otherFuture"];
      constructor() {

      }

      ngOnInit(): void {

            let controls: any = {};

            this.arrayFromControl.forEach((_element: any) => {
                  controls[_element] = new FormControl("");
            });

            this.form = new FormGroup(controls);
      }

      setState(): void {
            switch (this.state) {
                  case 'left':
                        this.state = 'middle';
                        this.textButton = 'NEXT';
                        break;
                  case 'middle':
                        this.state = 'right';
                        this.textButton = 'FINISH';
                        break;
                  case 'right':
                        this.state = 'printing';
                        break;
                  case 'printing':
                        console.log(this.form.value);
            }
      }

      onSubmit() {

      }

      documentPrinting() {
            //const htmlReceipt = '<html><meta charset="utf-8"> <body style="font-size:80%; font-family:sans-serif; margin: 0px 20px;"> <h1>Exemple de document</h1> <h2>Votre commande</h2> <hr /> <ul>  <li>Formule Plus</li>  <li>10.00</li> </ul> <p>Votre code</p> <p>PIN code: 0000</p> <hr /> </body>  </html>';
            // gère l'ouverture de session
            Kiosk.Session.close({information: "Ouverture de session"});
            // constante des données à imprimer
            let printedData = '<html> <head> <meta charset="UTF-8"> </head> <body> <table class="table table-striped"> <caption> Voici les données renseignées: </caption><thead><tr> <th> Champ de données</th> <th> Données entrées </th></tr></thead> <tbody >';
            let _this = this;
            this.mainArray.forEach(function (element){
                  if(!(element.ischecked) || _this.form.value[element.control]) {
                        printedData += '<tr class="TR"> <td> ' + element.name + '</td> <td>' + _this.form.value[element.control]  + '</td> </tr>'
                  }
            });
            printedData += '</tbody> </table> </body> </html> ';

            // liste des bacs d'impression
            const printingSources = Kiosk.DocumentPrinting.sourcesList;
            // écoute de l'event d'impression de doc
            Kiosk.DocumentPrinting.addEventListener("rawHtmlPrint", this.onRawHtmlPrint);
            // méthode de printing de fichier html
            Kiosk.DocumentPrinting.printRawHtml({ html: printedData, source: printingSources[0] });
            // event de vérification si l'impression s'est bien passée
            Kiosk.DocumentPrinting.removeEventListener('rawHtmlPrint', this.onRawHtmlPrint);
      }

      onRawHtmlPrint(e: any): void {
            switch (e.data.dataType) {
                  case 'RawHtmlPrinted':
                        console.log("Document imprimé");
                        break;
                  case 'RawHtmlPrintError':
                        console.error(e.data.code + ": " + e.data.description);
                        break;
            }
      }
}
