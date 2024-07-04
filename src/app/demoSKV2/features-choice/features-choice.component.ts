import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-features-choice',
  templateUrl: './features-choice.component.html',
  styleUrls: [
    './features-choice.component.scss',
    '../option-list/option-list.component.scss',
  ],
})
export class FeaturesChoiceComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {}

  baseUrl = 'http://localhost:5000/';
  allScript: Array<string> = [];
  files = [];

  // Liste des features affichées dans la page
  featuresList = [
    'Barcode_Reading',
    'Document_Scanning',
    'CardPayment_Debit',
    'Document_Printing',
    'Session',
  ];

  // liste des features qui existe dans les assets de l'application
  verifiedFeatureList: string[] = [];
  // liste des features qui n'existe pas dans les assets de l'application
  missing: string[] = [];
  missing_text: string = '';

  ngOnInit(): void {
    // vérification de la présence des features dans les assets de l'application
    for (let i = 0; i < this.featuresList.length; i++) {
      fetch(
        `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/${this.featuresList[i]}.json`
      )
        .then((response) => {
          if (!response.ok) {
            this.missing.push(this.featuresList[i]);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((json: any) => {
          // s'il existe alors on affiche la feature
          this.verifiedFeatureList.push(this.featuresList[i]);
          
        });
    }
    this.missing_text = this.missing.join(', ');
  }

  /**
   * redirection sur la page de test avec en paramètre le nom du test à exécuter
   * @param testName nom du test à exécuter
   */
  ChooseScript(testName: string) {
    this.appService.filename = testName;
    this.router.navigate(['/featureRun']);
  }
}
