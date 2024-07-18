import { Component, OnInit, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../app.service';
import { GenericComponent } from '../../demos/generic/generic.component';
import { SoftKioskService } from '../../softkiosk.service';
import { Router } from '@angular/router';
import * as Prism from 'prismjs';

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
  nomApp: string = "";
  description: string = "";
  parsedDescription: string = "";
  nbPerif: number = 0;
  nbService: number = 0;
  fileName: string = this.appService.filename;
  imageCapture: string[] = [];
  Kiosk = Kiosk;


  code: string = '';
  formattedCode: string = "";
  language: string = "javascript";


  actualStatusAllService: { [service: string]: any } = {};
  actualStatusAllDevice: { [device: string]: any } = {};
  historicStatusAllService: { [service: string]: any } = {};
  //actualStatusAllDevice: { [device: string]: any } = {};
  historicEvent: { [service: string]: any } = {}; // contient tout les changement que se soit status ou state des devices ou des services


  FormJSON: any = [];

  parameters: any = {}

  listTestFunction: string[] = [];
  listStopFunction: string[] = [];
  listComments: string[] = [];
  undefinedServices: string[] = [];
  undefinedDevices: string[] = [];
  actualLogLocation: string = "";

  nameMainService: string = "";
  nameMainDevice: string = "";

  serviceUsed: { service: string, device: string }[] = [];

  //firstPreview: boolean = true;
  // Compteur pour récupérer que certains image des previews
  compteurImageTempo: number = 0;
  //isRunning: boolean = false;

  constructor(private cdr: ChangeDetectorRef, skService: SoftKioskService, private renderer: Renderer2, private appService: AppService, private router: Router) {
    super(skService);
  }
  override ngOnInit() {
    this.buildPageWithJsFile(this.appService.filename);
  }

  /**
   * Obtenir le script JS + extraction des données 
   * @param scriptName nom du script
   */
  async buildPageWithJsFile(scriptName: string) {
    fetch(`http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${scriptName}.js`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        const titleRegex = /@title\s+(.*)/;
        const descriptionRegex = /@description\s+(.*)/;
        const serviceRegex = /@service\s+([^\s]+)\s*(?:\(([^)]+)\))?/g;
        const titleMatch = text.match(titleRegex);
        const descriptionMatch = text.match(descriptionRegex);
        const title = titleMatch ? titleMatch[1].toUpperCase() : 'N/A';
        const description = descriptionMatch ? descriptionMatch[1] : 'N/A';

        let serviceMatch;
        let i = 0;
        while ((serviceMatch = serviceRegex.exec(text)) !== null) {
          const service = serviceMatch[1];
          const device = serviceMatch[2] ? serviceMatch[2] : 'N/A';
          if (i == 0) {
            this.nameMainService = service;
            this.nameMainDevice = device;
          }
          i++;
          this.serviceUsed.push({ service, device });
        }
        this.nomApp = title;
        this.description = description;
        this.parsedDescription = this.getShortenedDescription();
        this.nbService = this.serviceUsed.length;
        this.code = text;

        this.getJavascriptFile(scriptName);
        this.createHistoric(this.nbService);

      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  /**
   * Retourne la description tronquée à 50 caractères
   */
  getShortenedDescription(): string {
    if (this.description.length <= 50) {
      return this.description;
    } else {
      let string = this.description.slice(0, 50) + "...";
      return string
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

      // Recherche des commentaires au-dessus des fonctions 'start' et 'stop'
      const functionCommentsFirst = text.match(/\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?=\s*(?:async\s+)?(?:function\s+)?(?:start\d*)\s*\()/g) || [];

      this.listComments = functionCommentsFirst.map(comment => {
        // Supprime les délimitations /** et */
        let cleanedComment = comment.replace(/^\/\*\*|\*\/$/g, '').trim();

        // Supprime les lignes contenant uniquement des *
        cleanedComment = cleanedComment.replace(/^\s*\*\s?/gm, '').trim();

        // Retourne la première ligne nettoyée qui contient le texte
        const lines = cleanedComment.split('\n').map(line => line.trim());
        return lines[0].split('@')[0].trim();
      }).filter(description => description.length > 0); // Filtre les chaînes vides

      this.buildFormFromText(text);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  /**
   * Créer l'historique des status et des states des services
   * @param nbService nombre de service utilisé
   */
  async createHistoric(nbService: number) {
    let device = 'N/A';
    for (let i = 0; i < nbService; i++) {
      let service = this.serviceUsed[i].service;
      if (Kiosk[service] !== undefined) {
        let actualStatusService = this.skService.getStatus(service);
        let actualStateService = this.skService.getState(service);
        let statusDetailService = this.skService.getServiceStatusDetail(service);
        this.actualStatusAllService[service] = { "status": actualStatusService, "state": actualStateService, "statusDetail": statusDetailService };
        this.historicStatusAllService[service] = [];
        let date = this.getFormattedTime();
        this.historicStatusAllService[service].unshift({ "hourEvent": date, "hourReceiptEvent": date, "status": actualStatusService, "state": actualStateService, "statusDetail": statusDetailService, "component": service })
        this.historicEvent[service] = [];
        this.skService.addEventListener(service, "statusChange", (e: any) => {
          this.actualStatusAllService[service] = { "status": Kiosk[service].status, "state": Kiosk[service].state, "statusDetail": Kiosk[service].statusDetail };
          this.historicStatusAllService[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "status": Kiosk[service].status, "statusDetail": Kiosk[service].statusDetail, "component": service });
          this.historicEvent[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "status": Kiosk[service].status, "statusDetail": Kiosk[service].statusDetail, "component": service });
          this.cdr.detectChanges();
        });
        this.skService.addEventListener(service, "stateChange", (e: any) => {
          this.actualStatusAllService[service] = { "status": Kiosk[service].status, "state": Kiosk[service].state, "statusDetail": Kiosk[service].statusDetail };
          this.historicStatusAllService[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "state": Kiosk[service].state, "component": service });
          this.historicEvent[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "state": Kiosk[service].state, "component": service });
          this.cdr.detectChanges();
        });
        if (this.serviceUsed[i].device != 'N/A') {
          device = this.serviceUsed[i].device;
          if (Kiosk[service][device] !== undefined) {
            let actualStatusDevice = Kiosk[service][device].status;
            let actualStateDevice = Kiosk[service][device].state;
            let statusDetailDevice = Kiosk[service][device].statusDetail;
            this.actualStatusAllDevice[device] = { "status": actualStatusDevice, "state": actualStateDevice, "statusDetail": statusDetailDevice };
            Kiosk[service][device].addEventListener("statusChange", (e: any) => {
              this.actualStatusAllDevice[device] = { "status": Kiosk[service][device].status, "state": Kiosk[service][device].state, "statusDetail": Kiosk[service][device].statusDetail };
              this.historicEvent[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "status": Kiosk[service][device].status, "statusDetail": Kiosk[service][device].statusDetail, "component": device });
              this.cdr.detectChanges();
            });
            Kiosk[service][device].addEventListener("stateChange", (e: any) => {
              this.actualStatusAllDevice[device] = { "status": Kiosk[service][device].status, "state": Kiosk[service][device].state, "statusDetail": Kiosk[service][device].statusDetail };
              this.historicEvent[service].unshift({ "hourEvent": this.tickToHour(e.tick), "hourReceiptEvent": this.getFormattedTime(), "state": Kiosk[service][device].state, "component": device });
              this.cdr.detectChanges();
            });
          }else{
            this.undefinedDevices.push(service);
          }
        }
      }else{
        this.undefinedServices.push(service);
      }
    }
  }

  /**
   * Obtenir l'heure actuelle formatée
   * @returns l'heure actuelle formatée
   */
  getFormattedTime() {
    let hour = new Date();
    const heure = hour.getHours().toString().padStart(2, "0");
    const minutes = hour.getMinutes().toString().padStart(2, "0");
    const secondes = hour.getSeconds().toString().padStart(2, "0");
    const milisecondes = hour.getMilliseconds().toString().padStart(3, "0");
    const hourformated = `${heure}:${minutes}:${secondes}:${milisecondes}`;
    return hourformated;
  }

  /**
   * Get the hour from the tick
   * @param ticksInSecs .Net tick en secondes
   */
  tickToHour(ticksInSecs: number) {
    // Nombre de ticks à convertir
    const epochOffset = 621355968000000000; // .NET start date - Unix epoch
    const ticksPerMillisecond = 10000; // .NET ticks in a millisecond

    const millisecondsSinceEpoch = (ticksInSecs - epochOffset) / ticksPerMillisecond;
    const jsDate = new Date(millisecondsSinceEpoch); // convert milliseconds to seconds

    const datePart = jsDate.toLocaleDateString('fr-FR'); // get date part
    const timePart = jsDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const milliseconds = jsDate.getMilliseconds(); // get milliseconds part
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0'); // ensure 3 digits

    return `${timePart},${formattedMilliseconds}`;

  }

  pad(n: number, width: number) {
    var n1: string = n + '';
    return n1.length >= width ? n1 : new Array(width - n1.length + 1).join('0') + n1;
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
  async callFunctionFromScript(functionName: string, idSection: string) {
    
    
    try {
      let scriptUrl = `http://localhost:5000/demoSKV2/application/assets/DemoSKV2/confTest/script/${this.appService.filename}.js`;
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

          // Supprimer l'ancien script s'il existe
          if (document.getElementById('scriptElement') != null) {
            document.getElementById('scriptElement')!.remove();
          }

          // Filtrage des variables déjà existante dans la page
          let scriptContentCleaned = this.removeDeclarationsIfExists(scriptContent);
        
          const scriptElement = document.createElement('script');
          scriptElement.id = "scriptElement";
          scriptElement.text = scriptContentCleaned;
          document.body.appendChild(scriptElement);
          let _this = this;
          let actualLogLocationLocal = this.actualLogLocation;

          //Redéfinition de la fonction console.log pour afficher les logs dans le panneau de logs 
          this.redirectLogs(actualLogLocationLocal);

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

          this.code = scriptContent;
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

  // Fonction pour vérifier et enlever les déclarations let/const/var si la variable existe déjà
  removeDeclarationsIfExists(code: string) {
    // Expression régulière pour trouver les déclarations de variables
    const varDeclarationRegex = /(let|const|var)\s+(\w+)\s*=/g;

    // Fonction de remplacement
    code = code.replace(varDeclarationRegex, function (match, keyword, varName) {
      // Vérifie si la variable est déjà définie
      if (typeof varName !== 'undefined') {
        return varName + " =";
      } else {
        return match;
      }
    });
    return code;
  }


  redirectLogs(actualLogLocationLocal: string) {
    let _this = this;
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
          const hourformated = _this.getFormattedTime();
          document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML = '<div>' + hourformated + " : " + logContent + '</div>' + document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML;
          document.getElementById("last_Result_" + actualLogLocationLocal)!.innerHTML = hourformated + "   " + logContent;
          panel = 'panel_Logs';
          document.getElementById("playBtn_" + actualLogLocationLocal)!.style.opacity = "1";
          (document.getElementById("playBtn_" + actualLogLocationLocal) as HTMLButtonElement)!.disabled = false;
        }
        // cas de logType = "CAPTURE" ==> capture d'un QRCode ou d'une image (affichage dans la console Results et dans un onglet dragagble)
        else if (logType == "CAPTURE") {
          

          if (!(logContent.includes("http://") || logContent.includes("https://"))) {
            _this.imageCapture[Number(actualLogLocationLocal.split('_')[1])] = "data:image/png;base64," + logContent;
          }
          const hourformated = _this.getFormattedTime();
          

          document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML = "<div>" + hourformated + " : " + logContent.slice(0, 20) + "...</div>" + document.getElementById("panel_Logs_Results_" + actualLogLocationLocal)!.innerHTML;
          document.getElementById("playBtn_" + actualLogLocationLocal)!.style.opacity = "1";
          (document.getElementById("playBtn_" + actualLogLocationLocal) as HTMLButtonElement)!.disabled = false;
        }
        // cas de logType = "PREVIEW" ==> affichage d'un aperçu (affichage dans la console log et dans un onglet dragagble)
        else if (logType == "PREVIEW") {
          _this.imageCapture[Number(actualLogLocationLocal.split('_')[1])] = "data:image/png;base64," + logContent;
          if (_this.compteurImageTempo <= 7) {
            _this.compteurImageTempo++;
          } else {
            var logElement = document.getElementById("panel_Logs_" + actualLogLocationLocal);
            const hourformated = _this.getFormattedTime();
            logElement!.innerHTML = "<div>" + hourformated + " : " + logContent.slice(0, 20) + "... </div>" + logElement!.innerHTML;
            _this.compteurImageTempo = 0;
          }
        }
        // cas de logType = "CONSOLE" ==> affichage d'un message dans la console de log 
        else if (logType == "START" || logType == "USER") {
          const hourformated = _this.getFormattedTime();
          var logElement = document.getElementById("panel_Logs_" + actualLogLocationLocal);
          logElement!.innerHTML = "<div>" + hourformated + " : " + logContent + "</div>";
        }
      }
      _this.cdr.detectChanges();
    };
  }

  isBase64(string: string) {
    // Vérifie si la chaîne a une longueur qui est un multiple de 4 et contient uniquement des caractères Base64
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(string) && string.length % 4 === 0;
  }

  isURL(string: string) {
    // Vérifie si la chaîne commence par http:// ou https://
    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(string);
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

    for (let i = 0; i < this.listStopFunction.length; i++) {
      this.imageCapture.push("");
    }
    
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


  backToChooseView() {
    this.actualLogLocation = "";
    for (let i = 0; i < this.nbService; i++) {
      let service = this.serviceUsed[i].service;
      if (Kiosk[service] !== undefined) {
        if (this.serviceUsed[i].device != 'N/A') {
          if ( Kiosk[service][this.serviceUsed[i].device] !== undefined) {
            let device = this.serviceUsed[i].device;

            Kiosk[service][device].removeEventListener("statusChange", () => { });
            Kiosk[service][device].removeEventListener("stateChange", () => { });
          }
        }
        this.skService.removeEventListener(service, "statusChange", () => { });
        this.skService.removeEventListener(service, "stateChange", () => { });
      }
    }
    this.router.navigate(['/demoSKV2AllPagesApp']);
  }

  stopSession() {
    this.skService.openSession();
  }



  showPopUp(typePopUp: string) {
    document.getElementById("popUp" + typePopUp + "Page")!.style.opacity = "0.7";
    document.getElementById("popUp" + typePopUp + "")!.style.opacity = "1";
    document.getElementById("popUp" + typePopUp + "Page")!.style.display = "block";
    document.getElementById("popUp" + typePopUp + "")!.style.display = "block";

    document.getElementById("popUp" + typePopUp + "Page")!.addEventListener("click", function () {
      document.getElementById("popUp" + typePopUp + "Page")!.style.opacity = "0";
      document.getElementById("popUp" + typePopUp + "")!.style.opacity = "0";
      setTimeout(function () {
        document.getElementById("popUp" + typePopUp + "Page")!.style.display = "none";
        document.getElementById("popUp" + typePopUp + "")!.style.display = "none";
      }, 500);
    });
  }

  closePopUp(typePopUp: string) {
    document.getElementById("popUp" + typePopUp + "Page")!.style.opacity = "0";
    document.getElementById("popUp" + typePopUp + "")!.style.opacity = "0";
    setTimeout(function () {
      document.getElementById("popUp" + typePopUp + "Page")!.style.display = "none";
      document.getElementById("popUp" + typePopUp + "")!.style.display = "none";
    }, 500);
  }


  resetLogs(i: number) {
    document.getElementById("panel_Logs_Results_test_" + i)!.innerHTML = "";
    document.getElementById("panel_Logs_test_" + i)!.innerHTML = "";
  }


  /**
   * Réinitialiser tous les logs
   */
  resetHistoricEvent() {
    for (let i = 0; i < this.nbService; i++) {
      this.historicEvent[this.serviceUsed[i].service] = [];
    }
    this.cdr.detectChanges();
  }


  /**
   * Afficher la section dragable avec le retourn image 
   */
  showImageSection(i: number) {
    if (document.getElementById("resultImage" + i)!.style.display === "flex") {
      document.getElementById("resultImage" + i)!.style.display = "none";
    } else {
      document.getElementById("resultImage" + i)!.style.display = "flex";
    }
  }
}



