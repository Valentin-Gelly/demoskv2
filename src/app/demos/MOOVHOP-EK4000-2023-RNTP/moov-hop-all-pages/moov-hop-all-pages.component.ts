import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../generic/generic.component';
import { SoftKioskService } from '../../../softkiosk.service';
declare var Kiosk: any;

@Component({
  selector: 'moov-hop-all-pages',
  templateUrl: './moov-hop-all-pages.component.html',
  styleUrls: ['./moov-hop-all-pages.component.scss', '../moovhop.component.scss']
})
export class MoovHopAllPagesComponent extends GenericComponent implements OnInit, OnDestroy {

  chatBotLink = "./assets/MOOVHOP-EK4000-2023-RNTP/chatbot.png"

  moovHopNavigateTo: string = "";
  router: Router;
  moovHopNavigateToPrevious: string = "";
  moovHopCurrentUrl: string = "";
  nextRoute2: string = "";

  /* ------ Gestion des erreur de périphérique ----------- */
  stringServiceStatusCritical: string | undefined;
  stringServicesUndefined: string | undefined;
  stringServiceStatusChangedToCritical: string | undefined;
  arrayServiceStatusTempUnavailable: any;
  arrayServiceStatusWarning: any;
  messageBarcode: string = "";
  messageCardDispenser: string = "";
  moovopServices = ["BarcodeReading", "CardDispensing"];
  messagePrinter: string = "";
  messageReceiptPrinter: string = "";
  messageBarcodeReading: string = "";
  messageCameraShooting: string = "";
  messageDocumentScanning: string = "";

  constructor(skService: SoftKioskService, private appService: AppService, private moovHopService: MoovhopService, _router: Router) {
    super(skService);
    this.moovHopNavigateTo = this.moovHopService.nextRoute();
    this.moovHopNavigateToPrevious = this.moovHopService.previousRoute;
    this.moovHopCurrentUrl = this.moovHopService.currentUrl;
    this.router = _router;
    this.nextRoute2 = this.moovHopService.nextRoute;
  }




  override ngOnInit() {
    setTimeout(() => {
      document.getElementById("loading")!.classList.add("removeWhite");
    }, 50);

    this.moovHopService.timeoutNavigation();
    this.testStatus();


    setInterval(() => {
      var today = new Date();
      var date = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
      var time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');

      document.getElementById('time')!.innerHTML = date + ' - ' + time;
    }, 1000);
  }


  restart() {
    let confirmation = window.confirm("Redémarer la borne ?")
    if (confirmation) {
      this.skService.restartKiosk();
    }
  }

  changeChatBotState() {
    //Sécurité pour éviter de lancer plusieurs fois l'animation
    if (document.getElementById('botText')!.innerHTML !== "") {
      return;
    }
    // Son du chatbot
    new Audio('./assets/MOOVHOP-EK4000-2023-RNTP/bot.m4a').play();

    // Animation du chatbot
    const images = [
      "./assets/MOOVHOP-EK4000-2023-RNTP/openedChatbot.png",
      "./assets/MOOVHOP-EK4000-2023-RNTP/chatbot.png"
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      this.chatBotLink = images[index];
      index = (index + 1) % images.length;
    }, 120);
    setTimeout(() => {
      clearInterval(intervalId);
      this.chatBotLink = "./assets/MOOVHOP-EK4000-2023-RNTP/chatbot.png";
    }, 2000);

    // Animation du texte du chatbot
    const phrases = [
      "Bonjour !",
      "Comment puis-je vous aider ?"
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    const intervalId2 = setInterval(() => {
      document.getElementById('botText')!.innerHTML = phrases[phraseIndex].substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === phrases[phraseIndex].length) {
        phraseIndex++;
        letterIndex = 0;
        if (phraseIndex === phrases.length) {
          clearInterval(intervalId2);
          document.getElementById('botText')!.innerHTML = "Comment puis-je vous aider ?";
        }
      }
    }, 50);
    setTimeout(() => {
      const intervalId3 = setInterval(() => {
        document.getElementById('botText')!.innerHTML = document.getElementById('botText')!.innerHTML.substring(0, document.getElementById('botText')!.innerHTML.length - 1);
        if (document.getElementById('botText')!.innerHTML === "") {
          clearInterval(intervalId3);
        }
      }, 20);
    }, 5000);
  }



  onStatusChange = (e: any): void => {
    switch (e.data.dataType) {
      case "StatusChanged":
        /**
         * Sur changement de status
         * Champs associés:
         * @param {("Ok" | "Warning" | "Critical" | "Unknown" | "TempUnavailable")} e.data.status - Statut.
         * @param {object} e.data.statusDetail - Statut détaillé.
         * @param {string} e.data.statusDescription - Description du statut.
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */

        if (e.data.status === 'Critical') {
          console.log("status: " + e.data.status);
        }
        break;
    }
  }

  getServiceUndefined = (): void => {
    let Appservices = this.skService.getServicesList();
    for (let service in this.moovopServices) {
      if (Appservices.hasOwnProperty(service) === false) {
        this.stringServicesUndefined += service + " ";
      }
    };
  }

  getServicesNameCriticalStatusChanged = (): void => {
    this.moovopServices.forEach((srvName: any) => {
      this.skService.addStatusServicesEventListener(srvName, this.onStatusChange);
      if (this.skService.getStatus(srvName) === 'Critical') {
        this.stringServiceStatusCritical += srvName + ", ";
      }
    });
  }

  testStatus = () => {
    // document printer 
    this.skService.addStatusServicesEventListener("DocumentPrinting", (e: any) => {
      console.log("DocumentPrinting",e.data.status);
      
      switch (e.data.status) {
        case 'Critical':
          this.messagePrinter = 'Imprimante, '+ e.data.statusDetail;
          break
        case 'Unknown':
          this.messagePrinter = e.data.statusDescription;
          break
        default:
          this.messagePrinter = '';
      }
    });
    // Receipt printer 
    this.skService.addStatusServicesEventListener("ReceiptPrinting", (e: any) => {
      console.log("ReceiptPrinting",e.data.status);

      switch (e.data.status) {
        case 'Critical':
          this.messageReceiptPrinter = 'Imprimante reçu, '+ e.data.statusDetail;
          break
        default:
          this.messageReceiptPrinter = '';
      }
    });
    // Barocde Reader
    this.skService.addStatusServicesEventListener("BarcodeReading", (e: any) => {
      console.log("BarcodeReading",e.data.status);
      switch (e.data.status) {
        case 'Critical':
          this.messageBarcodeReading = 'Barcode, '+ e.data.statusDetail;
          break
        default:
          this.messageBarcodeReading = '';
      }
    });
    // webcam
    this.skService.addStatusServicesEventListener("CameraShooting", (e: any) => {
      console.log("CameraShooting",e.data.status);
      switch (e.data.status) {
        case 'Critical':
          this.messageCameraShooting = 'Caméra, '+ e.data.statusDetail;
          break
        default:
          this.messageCameraShooting = '';
      }
    });
    // document scanner
    this.skService.addStatusServicesEventListener("DocumentScanning", (e: any) => {
      console.log("DocumentScanning",e.data.status);
      switch (e.data.status) {
        case 'Critical':
          this.messageDocumentScanning = 'Scanner, '+ e.data.statusDetail;
          break

        default:
          this.messageDocumentScanning = '';
      }
    });

  }

  navigateToError() {
    Kiosk.demoSKV2.setApplicationStatus({
      "status": "Critical",
      "statusDetail": "",
      "statusDescription": ""
    });
  }

  showPopUp() {
    let popUp = document.getElementById("moovHopCriticalService");
    if (popUp != null) {
      popUp.style.setProperty("display",'block');
    }
  }

  closePopUp() {
    let popUp = document.getElementById("moovHopCriticalService");
    if (popUp != null) {
      popUp.style.setProperty("display",'none');
    }
  }


  ngOnDestroy(): void {
    document.getElementById("loading")!.classList.remove("removeWhite");
    this.moovHopService.resetTimeoutNavigation();
   }

}
