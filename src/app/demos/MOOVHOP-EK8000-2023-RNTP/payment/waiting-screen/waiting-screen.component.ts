import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';;
import { Router, RouterConfigOptions } from '@angular/router';
import { SoftKioskService } from '../../../../softkiosk.service';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss', '../../moovhop.component.scss']
})
export class WaitingScreenComponent {
  printCallback: any;
  printCallback2: any;
  printCallbackTickets: any;
  htmlReceiptContent2: string = '';
  // il faut faire en sorte d'enregistrer un id pour définir les actionns réalisé ( si achat alors 1, si abonnement, 2 etc...) pour faire en sorte que le texte dans la page change
  // comme dans le waiting screen de l'EK4000 

  constructor(private moovhopService: MoovhopService, private skService: SoftKioskService, private router: Router) {

  }
  actionChoosed: number = this.moovhopService.ActionChoosed;

  ngAfterViewInit(): void {
    // cas achat de billet 
    if (this.moovhopService.ActionChoosed == 1) {
      if (this.moovhopService.textCB != '') {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Confirmation d\'achat</h4>' +
          '<h4 style="text-align:center">' + this.moovhopService.textTickets + '</h4>' +
          '<p style="text-align:center;">' + this.moovhopService.ticketPrice + ' €</p>' +
          '<p style="text-align:center;">.....................</p>' +
          '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovhopService.textCB + '</p>' +
          '</body>' +
          '</html>'
      } else {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Confirmation d\' achat</h4>' +
          '<h4 style="text-align:center">' + this.moovhopService.textTickets + '</h4>' +
          '<p style="text-align:center;">' + this.moovhopService.ticketPrice + ' €</p>' +
          '</body>' +
          '</html>'
      }

      this.htmlReceiptContent2 = '<html><meta charset="utf-8" >' +
        '<body style="font-family: Verdana; font-size: 1rem; font-weight: bold;">' +
        '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:5px; width:180px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK8000-2023-RNTP/logo-ipm.png" >' +
        '<p style="text-align:center"> Merci de votre visite sur notre stand aux RNTP 2023 !</p>' +
        '<p style="text-align:center">Contactez-nous pour réaliser votre projet mobilité</p>' +
        '<p style="text-align:center;"> Sylvain Perrin </p>' +
        '<p style="text-align:center;"> Responsable Commercial grands comptes </p>' +
        '<p style="text-align:center;"> 06 74 84 38 80 </p>' +
        '<p style="text-align:center"> sylvain.perrin@ipmfrance.com </p>' +
        '<img style="width:70px; position: relative; left:38%;" src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK8000-2023-RNTP/qr_ipm.png">' +
        '</body>' +
        '</html>';




      this.printCallbackTickets = (e: any): any => {
        let navEvent;
        let _this = this;
        switch (e.data.dataType) {
          case 'RawHtmlPrinted':
            _this.moovhopService.resetTimeoutNavigation();
            if (_this.moovhopService.bnTickets > 1) {
              _this.skService.ticketPrintingPrintRawHtml(_this.htmlReceiptContent2);
              _this.moovhopService.bnTickets -= 1;
            }
            else if (_this.router.url === "/RNTP2023/waitingScreen" && _this.moovhopService.bnTickets <= 1) {
              _this.skService.receiptPrintingPrintRawHtml(this.moovhopService.htmlReceiptContent);
              // traitement pour le changement de vue
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/getTicketReceipt"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
          case 'RawHtmlPrintError':
            _this.moovhopService.resetTimeoutNavigation();
            if (_this.moovhopService.bnTickets > 1) {
              _this.skService.ticketPrintingPrintRawHtml(_this.htmlReceiptContent2);
              _this.moovhopService.bnTickets -= 1;
            }
            else if (_this.router.url === "/RNTP2023/waitingScreen" && _this.moovhopService.bnTickets <= 1) {
              _this.skService.receiptPrintingPrintRawHtml(this.moovhopService.htmlReceiptContent);
              // traitement pour le changement de vue
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/RNTP2023/getTicketReceipt"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
        }
      }

      this.skService.ticketPrintingPrintRawHtml(this.htmlReceiptContent2);
      this.skService.addEventListener("TicketPrinting", "rawHtmlPrint", this.printCallbackTickets);

    } // cas abonnement
    else if (this.moovhopService.ActionChoosed == 2) {
      if (this.moovhopService.textCB != '') {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Merci pour votre achat !</h4>' +
          this.moovhopService.textSubscription +
          '<p style="text-align:center;">' + this.moovhopService.priceSubscription + ' €</p>' +
          '<p style="text-align:center;">.....................</p>' +
          '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovhopService.textCB + '</p>' +
          '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">.....................</p>' +
          '</body>' +
          '</html>'
      } else {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Merci pour votre achat !</h4>' +
          this.moovhopService.textSubscription +
          '<p style="text-align:center;">' + this.moovhopService.priceSubscription + ' €</p>' +
          '</body>' +
          '</html>'
      }



      this.skService.addEventListener("CardDispensing", "cardDispense", this.onCardDispense);
      this.skService.cardDispensingDispense();


      this.printCallback = (e: any): any => {
        let navEvent;
        switch (e.data.dataType) {
          case 'RawHtmlPrinted':
            // traitement pour le changement de vue
            if (this.router.url === "/RNTP2023/waitingScreen") {
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/RNTP2023/getTicketReceipt"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
          case 'RawHtmlPrintError':
            if (this.router.url === "/RNTP2023/waitingScreen") {
              console.error(e.data.code + ": " + e.data.description);
              this.handlePrintError(e.data.code);
              // traitement pour le changement de vue
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/RNTP2023/getTicketReceipt"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
        }
      }



      this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback);
      this.skService.receiptPrintingPrintRawHtml(this.moovhopService.htmlReceiptContent);

    } // cas rechargement 
    else {
      if (this.moovhopService.textCB != '') {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Merci pour votre achat !</h4>' +
          this.moovhopService.textSubscription +
          '<p style="text-align:center;">' + this.moovhopService.priceSubscription + ' €</p>' +
          '<p style="text-align:center;">.....................</p>' +
          '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovhopService.textCB + '</p>' +
          '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">.....................</p>' +
          '</body>' +
          '</html>'
      } else {
        this.moovhopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
          '<h4 style="text-align:center"> Merci pour votre achat !</h4>' +
          this.moovhopService.textSubscription +
          '<p style="text-align:center;">' + this.moovhopService.priceSubscription + ' €</p>' +
          '<p style="text-align:center;">.....................</p>' +
          '</body>' +
          '</html>'
      }

      this.printCallback = (e: any): any => {
        let navEvent;
        switch (e.data.dataType) {
          case 'RawHtmlPrinted':
            // traitement pour le changement de vue
            if (this.router.url === "/RNTP2023/waitingScreen") {
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/RNTP2023/reloadThanks"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
          case 'RawHtmlPrintError':
            if (this.router.url === "/RNTP2023/waitingScreen") {
              console.error(e.data.code + ": " + e.data.description);
              this.handlePrintError(e.data.code);
              // traitement pour le changement de vue
              navEvent = new CustomEvent("moovHopNav", {
                detail: {
                  "delay": 0,
                  "goTo": "/RNTP2023/reloadThanks"
                }
              });
              window.dispatchEvent(navEvent);
            }
            break;
        }
      }
      this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback)
      this.skService.receiptPrintingPrintRawHtml(this.moovhopService.htmlReceiptContent);
    }
  }

  ngOndestroy() {
    this.skService.removeEventListener("CardDispensing", "cardDispense", this.onCardDispense);
    this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback);
    this.skService.removeEventListener("TicketPrinting", "rawHtmlPrint", this.printCallback);
  }

  onCardDispense = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardScanned': //CardPrepared
        console.log("Prochaine carte à distribuer : " + e.data.tag);
        break;
      case 'CardReady': //CardPresented
        console.log("Merci de prendre votre carte : " + e.data.tag);
        break;
      case 'CardDispensed':
        console.log("Carte retirée");
        // traitement pour le changement de vue

        break;
      case 'CardDispenseError':
        switch (e.data.code) {
          case "Jam": //DispenseJam
            break;
          case "TagUnreadable":
            break;
          case "Holdback": //DispenseHoldback
            break;
          default:
            console.error("Erreur de distribution : " + e.data.code + " - " + e.data.description);
            break;
        }
        break;
      default:
        break;
    }
  }

  handlePrintError(code: string) {
    switch (code) {
      case "StatusError":
        console.log("StatusError");
        break;
      case "StateError":
        console.log("StateError");
        break;
      default:
        break;
    }
  }




}
