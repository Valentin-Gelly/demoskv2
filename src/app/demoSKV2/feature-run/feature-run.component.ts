import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AppService } from '../../app.service';
import { GenericComponent } from '../../demos/generic/generic.component';
import { SoftKioskService } from '../../softkiosk.service';

declare var Formio: any;
declare var Kiosk: any;

@Component({
  selector: 'app-feature-run',
  templateUrl: './feature-run.component.html',
  styleUrls: ['./feature-run.component.scss'],
})

export class FeatureRunComponent extends GenericComponent implements OnInit {

  json: any;

  // Information de l'application
  nomApp:string = "";
  description: string = "";
  perifUsed: any;
  nbPerif: any;
  serviceUsed: any;
  nbService: number = 0;
  fileName: string = this.appService.filename;


  // historique des status et des states des périphériques et des services pour suivre l'avancé de l'application (affiché dans l'application)
  historicStatusService: { [service: string]: any } = {};
  historicStateService: { [service: string]: any } = {};
  historicStatusDevice: { [device: string]: any } = {};

  FormJSON: any = [];

  actualStatusAllService: any = [];
  lastHourStatus: any = [];
  lastHourState: any = [];
  actualStatusAllDevice: any = [];
  actualStateAllService: any = [];

  parameters: any = {}

  listTestFunction: string[] = [];
  listStopFunction: string[] = [];
  listComments: string[] = [];

  actualLogLocation: string = "";

  
  //firstPreview: boolean = true;
  // Compteur pour récupérer que certains image des previews
  compteurImageTampon: number = 0;
  //isRunning: boolean = false;


  constructor(skService: SoftKioskService, private renderer: Renderer2, private appService: AppService) {
    super(skService);
  }


  override ngOnInit() {
    this.fileName = this.appService.filename;
    // Afficher la description du test
    document.getElementById("btnRead")!.addEventListener("click", function () {
      document.getElementById("popUpDescritionPage")!.style.opacity = "0.7";
      document.getElementById("popUpDescrition")!.style.opacity = "1";
      document.getElementById("popUpDescritionPage")!.style.display = "block";
      document.getElementById("popUpDescrition")!.style.display = "block";

      document.getElementById("popUpDescritionPage")!.addEventListener("click", function () {
        document.getElementById("popUpDescritionPage")!.style.opacity = "0";
        document.getElementById("popUpDescrition")!.style.opacity = "0";
        setTimeout(function () {
          document.getElementById("popUpDescritionPage")!.style.display = "none";
          document.getElementById("popUpDescrition")!.style.display = "none";
        }, 500); 
      });
    });

    document.getElementById("crossPopUp")!.addEventListener("click", function () {
      document.getElementById("popUpDescritionPage")!.style.opacity = "0";
      document.getElementById("popUpDescrition")!.style.opacity = "0";
      setTimeout(function () {
        document.getElementById("popUpDescritionPage")!.style.display = "none";
        document.getElementById("popUpDescrition")!.style.display = "none";
      }, 500); 
    });
    this.getjsonScript(this.fileName);
  }


  /**
   * retourne la description tronquée à 200 caractères
   */
  getShortenedDescription(): string {
    if (this.description.length <= 200) {
      return this.description;
    } else {
      let string = this.description.slice(0, 200) + "...";
      return string
    }
  }


  /**
   * obtenir le status actuel d'un periphérique
   * @param deviceName nom du periphérique
   * @returns status actuel du periphérique
   */
  getActualStatusDevice(deviceName: any) {
    const cles = Object.keys(this.historicStatusDevice[deviceName]);
    const clePlusRecente = cles.reduce((a, b) => (new Date(b) > new Date(a) ? b : a));
    return this.historicStatusDevice[deviceName][clePlusRecente];
  }


  /**
   * obtenir le JSON du script 
   * @param scriptName nom du script
   */
  async getjsonScript(scriptName: string) {
    fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/${scriptName}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        this.json = json;
        this.nomApp = this.json.title;
        this.description = this.json.description;
        this.perifUsed = this.json.perifUsed;
        this.nbPerif = this.perifUsed.length;
        this.serviceUsed = this.json.serviceUSed;
        this.perifUsed = this.json.perifUsed;
        this.nbService = this.serviceUsed.length;
        this.actualStatusAllService = Array(this.nbService).fill("");
        this.actualStatusAllDevice = Array(this.nbPerif).fill("");
        this.lastHourStatus = Array(this.nbService).fill("");
        // création des historiques des status et des states des services et des péiphériques
        // avec les heures et les valeurs
        for (let i = 0; i < this.nbService; i++) {
          let service = this.serviceUsed[i].name;
          let hour = new Date();
          const heure = hour.getHours().toString().padStart(2, "0");
          const minutes = hour.getMinutes().toString().padStart(2, "0");
          const secondes = hour.getSeconds().toString().padStart(2, "0");
          const hourformated = `${heure}:${minutes}:${secondes}`;
          if (!this.historicStatusService.hasOwnProperty(service)) {
            this.historicStatusService[service] = [];
          }
          if (!this.historicStateService.hasOwnProperty(service)) {
            this.historicStateService[service] = [];
          }
          let status = this.skService.getStatus(service);
          let state = this.skService.getState(service);
          this.historicStatusService[service].unshift({ time: hourformated, status: status });
          this.historicStateService[service].unshift({ time: hourformated, state: state });
          this.actualStatusAllService[i] = status;
          this.actualStateAllService[i] = state;
          this.lastHourStatus[i] = hourformated;
          // écoute d'un changement de status pour mettre à jour l'historique
          this.skService.addEventListener(service, "statusChange", (e: any) => {
            let hour = new Date();
            const heure = hour.getHours().toString().padStart(2, "0");
            const minutes = hour.getMinutes().toString().padStart(2, "0");
            const secondes = hour.getSeconds().toString().padStart(2, "0");
            const hourformated = `${heure}:${minutes}:${secondes}`;
            this.historicStatusService[service].unshift({ time: hourformated, status: e.data.status });
            //document.getElementById("panel_" + service)!.innerHTML += '<p>'+ hourformated + '   ' + e.data.status + '</p>';
            document.getElementById("status_" + service)!.innerHTML = hourformated + "   " + e.data.status;
            this.actualStatusAllService[i] = e.data.status;
            this.lastHourStatus[i] = hourformated;
          });
          // écoute d'un changement de state pour mettre à jour l'historique
          this.skService.addEventListener(service, "stateChange", (e: any) => {
            let hour = new Date();
            const heure = hour.getHours().toString().padStart(2, "0");
            const minutes = hour.getMinutes().toString().padStart(2, "0");
            const secondes = hour.getSeconds().toString().padStart(2, "0");
            const hourformated = `${heure}:${minutes}:${secondes}`;
            this.historicStateService[service].unshift({ time: hourformated, state: e.data.state });
            //document.getElementById("panel_" + service)!.innerHTML += '<p>'+ hourformated + '   ' + e.data.status + '</p>';
            document.getElementById("state_" + service)!.innerHTML = hourformated + "   " + e.data.state;
            this.actualStateAllService[i] = e.data.state;
            this.lastHourState[i] = hourformated;
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    await this.getJavascriptFile(this.fileName);

  }

  /**
   * Obtenir seulement les clés de la liste des status
   * @param statusHistory liste des status
   * @returns les clés de la liste des status
   */
  getStatusKeys(statusHistory: any): string[] {
    return Object.keys(statusHistory);
  }

  /**
   * Charger un script JS à partir d'une URL
   * @param url url du script à charger
   */
  loadScript(url: string) {
    if (document.querySelector(`script[src="${url}"]`)) {
      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        const scriptElement = this.renderer.createElement('script');
        scriptElement.src = url;
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;

        this.renderer.appendChild(document.body, scriptElement);
      });
    }
  }

  /**
   * Appeler une fonction à partir de l'application
   * @param functionName nom du test à lancer
   * @param idSection nom de la section à compléter avec les logs
   */
  async callFunctionFromScript( functionName: string, idSection: string) {
    try {
      let scriptUrl = `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${this.fileName}.js`;
      this.actualLogLocation = "test_" + idSection.split("_")[2];


      fetch(scriptUrl)
      .then(response => response.text())
      .then(scriptContent => {
        let allInput = document.getElementsByTagName("input");
        // Modifier les variables dans le script
        for (let i = 0; i < allInput.length; i++) {
          const variableName = allInput[i].id.split("-")[1];
          let variableValue = "";
          if (allInput[i].value != "") {
            variableValue = JSON.stringify(allInput[i].value);
          } else {
            variableValue = JSON.stringify(allInput[i].placeholder);
          }
          const variablePattern = new RegExp(`(var|let|const)\\s+${variableName}\\s*=\\s*[^;]+;`);
          // Remplacement de la première occurrence seulement
          scriptContent = scriptContent.replace(variablePattern, (match, p1) => {
            if (!match.includes(`// REPLACED: ${variableName}`)) {
              return `${p1} ${variableName} = ${variableValue}; // REPLACED: ${variableName}`;
            }
            return match;
          });
        }
    
        if (document.getElementById('scriptElement') != null) {
          document.getElementById('scriptElement')!.remove();
        }

        const scriptElement = document.createElement('script');
        scriptElement.id = "scriptElement";
        scriptElement.text = scriptContent;
        document.body.appendChild(scriptElement);
        let _this = this;
        let actualLogLocationLocal = this.actualLogLocation;
        

        /**
         * Redéfinition de la fonction console.log pour afficher les logs dans le panneau de logs
         */
        console.log = function () {
          let panel = 'panel_Logs';
          if (actualLogLocationLocal !== "") {
            panel = 'panel_Logs_' + actualLogLocationLocal;
          } else {
            panel = 'panel_Logs';
          }
          //Rcupération du contenu du console.log
          const logMessage = Array.prototype.slice.call(arguments).join(' ');
          //Affichage du contenu du console.log dans le panneau de logs
          if (logMessage.split("-") != null) {
            const logParts = logMessage.split("-");
            const logType = logParts[0].replace(/[^a-zA-Z]/g, '');
            const logContent = logParts.slice(1).join('-');
            // cas de logType = "END" ou "ERROR" ==> fin de l'exécution du script (affichage dans la console Results)
            if (logType == "END" || logType == "ERROR") {
              let hour = new Date();
              const heure = hour.getHours().toString().padStart(2, "0");
              const minutes = hour.getMinutes().toString().padStart(2, "0");
              const secondes = hour.getSeconds().toString().padStart(2, "0");
              const hourFormatted = `${heure}:${minutes}:${secondes}`;
              document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML += '<p class="stateInformations">' +hourFormatted+ " : "+ logContent + '</p>';
              document.getElementById("last_Result_" + actualLogLocationLocal)!.innerHTML = hourFormatted + "   " + logContent;
              panel = 'panel_Logs';
              /*_this.firstPreview = true;
              _this.isRunning = false;*/
              document.getElementById("playBtn_" + actualLogLocationLocal)!.style.opacity = "1";
              (document.getElementById("playBtn_" + actualLogLocationLocal) as HTMLButtonElement)!.disabled = false;
            } 
            // cas de logType = "CAPTURE" ==> capture d'un QRCode ou d'une image (affichage dans la console Results)
            else if (logType == "CAPTURE") {
              let hour = new Date();
              const heure = hour.getHours().toString().padStart(2, "0");
              const minutes = hour.getMinutes().toString().padStart(2, "0");
              const secondes = hour.getSeconds().toString().padStart(2, "0");
              const hourFormatted = `${heure}:${minutes}:${secondes}`;
              document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML += "<p>" +hourFormatted+ " : "+ logContent.slice(0, 20) + "...</p>";
              document.getElementById("playBtn_" + actualLogLocationLocal)!.style.opacity = "1";
              (document.getElementById("playBtn_" + actualLogLocationLocal) as HTMLButtonElement)!.disabled = false;
             /* _this.firstPreview = true;
              _this.isRunning = false;*/

            } 
            // cas de logType = "PREVIEW" ==> affichage d'un aperçu (affichage dans la console log)
            else if (logType == "PREVIEW") {
              if (_this.compteurImageTampon <= 7) {
                _this.compteurImageTampon++;
              } else {
                var logElement = document.getElementById("panel_Logs_" + actualLogLocationLocal);
                /*if (!_this.firstPreview) {
                  logElement!.innerHTML += "<p>" + logContent.slice(0, 20) + "...</p>";
                } else {*/
                  //_this.firstPreview = false;
                  logElement!.innerHTML += "<p>" + logContent.slice(0, 20) + "...</p>";
               // }
                _this.compteurImageTampon = 0;
              }
            } 
            // cas de logType = "CONSOLE" ==> affichage d'un message dans la console de log 
            else if (logType == "START" || logType == "USER") {
              var logElement = document.getElementById("panel_Logs_" + actualLogLocationLocal);
              logElement!.innerHTML += '<p class="stateInformations">' + logContent + '</p>';
              /*_this.firstPreview = true;
              _this.isRunning = true;*/
            }
          }
        }
        // Mettre à jour l'interface utilisateur
        document.getElementById("panel_Logs_test_" + idSection.split("_")[2])!.innerHTML = "";
        document.getElementById("last_Result_test_" + idSection.split("_")[2])!.innerHTML = "";
        
        if (functionName.includes("start")) {
          document.getElementById("playBtn_test_" + idSection.split("_")[2])!.style.opacity = "0.5";
          (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.disabled = true;
        } else if (functionName.includes("stop")) {
          (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.style.opacity = "1";
          (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.disabled = false;
        }
        
        // Lancement de la fonction appelée
        // @ts-ignore: Ignorer l'erreur car la fonction peut ne pas exister dans le contexte TypeScript
        window[functionName]();
      })
      .catch(error => console.error('Error fetching script:', error));
    
      // Mettre à jour l'interface utilisateur
      document.getElementById("panel_Logs_test_" + idSection.split("_")[2])!.innerHTML = "";
      document.getElementById("last_Result_test_" + idSection.split("_")[2])!.innerHTML = "";

      if (functionName.includes("start")) {
        document.getElementById("playBtn_test_" + idSection.split("_")[2])!.style.opacity = "0.5";
        (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.disabled = true;
      } else if (functionName.includes("stop")) {
        (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.style.opacity = "1";
        (document.getElementById("playBtn_test_" + idSection.split("_")[2]) as HTMLInputElement)!.disabled = false;
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement ou de l\'exécution du script :', error);
    }
  }

  /**
   * Afficher ou masquer la section accordéon
    * @param nameElement nom de la section selectionné
   */
  showPanel(nameElement: string) {
    if (document.getElementById('panel_' + nameElement)!.style.display === "flex") {
      (document.getElementsByClassName('fleche_' + nameElement)[0] as HTMLElement).style.transform = "rotate(-90deg)";
      document.getElementById('panel_' + nameElement)!.style.display = "none";
    } else {
      (document.getElementsByClassName('fleche_' + nameElement)[0] as HTMLElement).style.transform = "rotate(0deg)";

      document.getElementById('panel_' + nameElement)!.style.display = "flex";
      document.getElementById('panel_' + nameElement)!.style.flexDirection = "column";
    }
  }

  /**
   * Chargement du fichier javacript à partir de l'URL dans une balise script 
   * @param arg0 nom du fichier JS à charger
   */
  async getJavascriptFile(arg0: string) {
    try {
      const response = await fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${arg0}.js`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();

      // Recherche des fonctions 'start' et 'stop' dans le contenu du fichier JS
      this.findTestFunctions(text);

      // Recherche des commentaires juste au-dessus des fonctions 'start' et 'stop'
      const functionCommentsFirst = text.match(/\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?=\s*(?:async\s+)?(?:function\s+)?(?:start\d*)\s*\()/g) || [];

      // Nettoyer les commentaires
      const functionCommentsFinish = functionCommentsFirst.map(comment => {
        // Supprime les délimitations /** et */
        let cleanedComment = comment.replace(/^\/\*\*|\*\/$/g, '').trim();

        // Supprime les lignes contenant uniquement des *
        cleanedComment = cleanedComment.replace(/^\s*\*\s?/gm, '').trim();

        // Retourne la première ligne nettoyée qui contient le texte
        const lines = cleanedComment.split('\n').map(line => line.trim());
        return lines[0].split('@')[0].trim();
      }).filter(description => description.length > 0); // Filtre les chaînes vides

      // Afficher les commentaires de description trouvés

      this.listComments = functionCommentsFinish;

      this.buildFormFromText(text);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  /**
   * Construire le formulaire à partir du texte du fichier javascript
   * @param text text du fichier javascript
   */
    buildFormFromText(text: string) {
    this.parameters = this.extractParameterDetails(text);
    for (let i = 0; i < this.parameters.length; i++) {
      let jsonElement = {
        "type": this.parameters[i].type !== undefined ? this.parameters[i].type : "textfield",
        "key": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
        "label": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
        "placeholder": this.parameters[i].default !== undefined ? this.parameters[i].default : "",
        "value": this.parameters[i].default !== undefined ? this.parameters[i].default : "",
        "tooltip": this.parameters[i].name !== undefined ? this.parameters[i].name : "",
        "input": true,
        "customId": this.parameters[i].name
      };
      this.FormJSON.push(jsonElement);
    }

    let _this = this;


    // Utilisation de l'api Formio pour créer le formulaire
    Formio.createForm(document.getElementById('formio'), {
      components: this.FormJSON
    }).then(function (form: { on: (arg0: string, arg1: (submission: any) => void) => void; }) {
      let allInput = document.getElementsByTagName("input");
      let i = 0;
      _this.FormJSON.forEach((element: { type: string; }) => {
        if (element.type === "number") {
          allInput[i].type = "number";
        } else if (element.type === "textfield") {
          allInput[i].type = "text";
        } else if (element.type === "number") {
          allInput[i].type = "number";
        } else if (element.type === "boolean") {
          allInput[i].type = "checkbox";
        }

        i++;
      });
    });
  }

  /**
   * Rechercher les fonctions de test et d'arrêt dans le texte javascript
   * @param text text javacript à analyser
   */
  findTestFunctions(text: string) {
    const testFunctions = text.match(/(?:\bstart\d*\s*\(.*?\))/g) || [];
    const stopFunctions = text.match(/(?:\bstop\d*\s*\(.*?\))/g) || [];
    // Afficher les fonctions trouvées
    this.listTestFunction = testFunctions;
    this.listStopFunction = stopFunctions;
  }


  updateValues(data: any) {
  }

  /**
   * Extraire les différents paramêtre d'un test
   * @param script script de la fonction
   */
  extractParameterDetails(script: string) {
    const parameterPattern = /@param {([^}]+)} ([^ ]+) - Default: ([^ ]+) -/g;
    let match;
    const matches = [];

    while ((match = parameterPattern.exec(script)) !== null) {
      matches.push({
        type: match[1],
        name: match[2],
        default: match[3]
      });
    }

    // traitement des type de paramètre
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].type === "string") {
        matches[i].type = "textfield";
      } else if (matches[i].type === "number") {
        matches[i].type = "number";
      } else if (matches[i].type === "boolean") {
        matches[i].type = "checkbox";
      }
    }

    return matches;
  }


  ngOnDestroy() {
    this.actualLogLocation = "";
    for (let i = 0; i < this.nbService; i++) {
      let service = this.serviceUsed[i].name;
      this.skService.removeEventListener(service, "statusChange", () => { });
      this.skService.removeEventListener(service, "stateChange", () => { });
    }
  }



  stopSession() {
    this.skService.openSession();
  }

}


