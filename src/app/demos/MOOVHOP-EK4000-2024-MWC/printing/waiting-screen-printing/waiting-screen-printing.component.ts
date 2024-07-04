import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';


@Component({
  selector: 'app-waiting-screen-printing',
  templateUrl: './waiting-screen-printing.component.html',
  styleUrls: ['./waiting-screen-printing.component.scss', '../../moovhop.component.scss']
})
export class WaitingScreenPrintingComponent extends GenericComponent implements OnInit {

  constructor(private router: Router, private moovHopService: MoovhopService, skService: SoftKioskService) {
    super(skService);

  }
  printCallback: any;
  intervale: any = 0;
  timing: number = 0;
  ActionChoosed: any = this.moovHopService.ActionChoosed;

  override ngOnInit(): void {

    console.log(this.moovHopService.ActionChoosed);

    if (this.router.url === "/MWC2024/waitingScreenPrinting") {
      if (this.moovHopService.ActionChoosed == 1) {
        if (this.moovHopService.textCB != '') {
          this.moovHopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
            '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
            '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
            '<h4 style="text-align:center"> Purchase confirmation</h4>' +
            '<p style="text-align:center;">' + this.moovHopService.priceSubscription + '€</p>' +
            '<p style="text-align:center;">.....................</p>' +
            '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovHopService.textCB + '</p>' +
            '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">.....................</p>' +
            '<div style="width:100%; text-align:center"><img src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK4000-2023-RNTP/qr_ticket.jpg"></div>' +
            '<p style="text-align:center;">Scan this QR code to pick up your season ticket at a branch or Click & Collect terminal!</p>' +
            '</body>' +
            '</html>'
            this.moovHopService.textCB = '';
        } else {
          this.moovHopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
            '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
            '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
            '<h4 style="text-align:center"> Purchase confirmation</h4>' +
            '<p style="text-align:center;">' + this.moovHopService.priceSubscription + '€</p>' +
            '<p style="text-align:center;">.....................</p>' +
            '<div style="width:100%; text-align:center"><img src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK4000-2023-RNTP/qr_ticket.jpg"></div>' +
            '<p style="text-align:center;">Scan this QR code to pick up your season ticket at a branch or Click & Collect terminal!</p>' +
            '</body>' +
            '</html>'
        }
        this.printCallback = (e: any): any => {
          let navEvent;
          switch (e.data.dataType) {
            case 'RawHtmlPrinted':
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                // traitement pour le changement de vue
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/subScriptionConfirmation"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
            case 'RawHtmlPrintError':
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                console.error(e.data.code + ": " + e.data.description);
                this.handlePrintError(e.data.code);
                // traitement pour le changement de vue
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/subScriptionConfirmation"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
          }
        }
        this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback)
        this.skService.receiptPrintingPrintRawHtml(this.moovHopService.htmlReceiptContent);
        this.timing = 5000;
      } else if (this.moovHopService.ActionChoosed == 2) {
        let pdf = '';
        // impression de la fiche horaire
        if (this.moovHopService.LineChoosed == 1) {
          pdf = this.moovHopService.line1;
        } else if (this.moovHopService.LineChoosed == 2) {
          pdf = this.moovHopService.line2;
        } else if (this.moovHopService.LineChoosed == 3) {
          pdf = this.moovHopService.line3;
        } else {
          pdf = this.moovHopService.line4;
        }
        this.printCallback = (e: any): any => {
          let navEvent;
          switch (e.data.dataType) {
            case 'RawPdfPrinted':
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                // traitement pour le changement de vue
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/printingThanks"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
            case 'RawPdfPrintError':
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                console.error(e.data.code + ": " + e.data.description);
                this.handlePrintError(e.data.code);
                // traitement pour le changement de vue
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/printingThanks"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
          }
        }
        this.skService.addEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
        this.skService.documentPrintingPrintRawPdf(pdf);
      } else {
        if (this.moovHopService.textCB != '') {
          this.moovHopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
            '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
            '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
            '<h4 style="text-align:center"> Purchase confirmation</h4>' +
            '<p style="text-align:center;">60.00€</p>' +
            '<p style="text-align:center;">.....................</p>' +
            '<p style="text-align:center;" ">' + this.moovHopService.textCB + '</p>' +

            '</body>' +
            '</html>'
        } else {
          this.moovHopService.htmlReceiptContent = '<html><meta charset="utf-8" >' +
            '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
            '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
            '<h4 style="text-align:center"> Purchase confirmation</h4>' +
            '<p style="text-align:center;"> 60.00 €</p>' +
            '</body>' +
            '</html>'
        }
        this.printCallback = (e: any): any => {
          let navEvent;
          switch (e.data.dataType) {
            case 'RawHtmlPrinted':
              // traitement pour le changement de vue
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/thanksPaymentReport"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
            case 'RawHtmlPrintError':
              if (this.router.url === "/MWC2024/waitingScreenPrinting") {
                console.error(e.data.code + ": " + e.data.description);
                this.handlePrintError(e.data.code);
                // traitement pour le changement de vue
                navEvent = new CustomEvent("moovHopNav", {
                  detail: {
                    "delay": 0,
                    "goTo": "/MWC2024/thanksPaymentReport"
                  }
                });
                window.dispatchEvent(navEvent);
              }
              break;
          }
        }
        this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback)
        this.skService.receiptPrintingPrintRawHtml(this.moovHopService.htmlReceiptContent);
      }
    }
    // setTimeout(() => {
    //   if (this.router.url === "/waitingScreenPrinting") {
    //     if (this.moovHopService.ActionChoosed == 1) {
    //       this.router.navigate(['/subScriptionConfirmation']);
    //     } else if (this.moovHopService.ActionChoosed == 2) {
    //       this.router.navigate(['/printingThanks']);
    //     } else {
    //       this.router.navigate(['/thanksPaymentReport'])
    //     }
    //   }
    // }, this.timing);
  }


  ngOnDestroy(): void {
    let ___this = this;
    if (this.moovHopService.ActionChoosed == 1) {
      //___this.skService.removeEventListener("TicketPrinting", "rawPdfPrint", this.onRawPdfPrint);
      ___this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
      ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyCaseCongratulationsComponent");
    } else if (this.moovHopService.ActionChoosed == 2) {
      // impression de la fiche horaire
      ___this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.formOnRawPdfPrint);
    } else {
      this.router.navigate(['/MWC2024/thanksPaymentReport'])
    }


  }
}
