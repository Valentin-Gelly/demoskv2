import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-case-congratulations',
  templateUrl: './moov-hop-buy-use-case-congratulations.component.html',
  styleUrls: ['./moov-hop-buy-use-case-congratulations.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyCaseCongratulationsComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  stringServiceStatusCritical: string | undefined;
  arrayServiceStatusTempUnavailable: any;
  arrayServiceStatusWarning: any;
  moovopServices = ["BarcodeReading", "CardDispensing"];
  messageBarcode: string = "";
  messageCardDispenser: string = "";
  stringServicesUndefined: string | undefined;

  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovHopBuyCaseTicketsPrinting");
  }

  ngAfterViewInit(): void {
    let __this = this;
    setTimeout(() => {
      if (__this.router.url === '/moovHopBuyUseCaseCongratulations') {
        __this.router.navigate(['/moovHopHomepage']);
      }
    }, 7000);
    __this.skService.addEventListener("TicketPrinting", "rawPdfPrint", this.onRawPdfPrint);
    __this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint)
    __this.skService.ticketPrintingPrintRawPdf(this.moovHopService.pdfReceipt);
    __this.skService.receiptPrintingPrintRawHtml(this.moovHopService.htmlReceiptContent);
  }

  override onRawPdfPrint = (e: any): any => {
    switch (e.data.dataType) {
      case 'RawPdfPrinted':
        break;
      case 'RawPdfPrintError':
        console.error(e.data.code + ": " + e.data.description);
        this.handlePrintError(e.data.code);
        break;
    }
  }

  override onRawHtmlPrint = (e: any): any => {
    switch (e.data.dataType) {
      case 'RawHtmlPrinted':
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("moovHopNav", {
          detail: {
            "delay": 2000,
            "goTo": "/moovHopHomepage"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'RawHtmlPrintError':
        console.error(e.data.code + ": " + e.data.description);
        this.handlePrintError(e.data.code);
        break;
    }
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.removeEventListener("TicketPrinting", "rawPdfPrint", this.onRawPdfPrint);
    ___this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyCaseCongratulationsComponent");
  }
}
