import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-congratulations-two',
  templateUrl: './moov-hop-buy-use-case-congratulations-two.component.html',
  styleUrls: ['./moov-hop-buy-use-case-congratulations-two.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCongratulationsTwoComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService)
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de MoovHopBuyUseCaseCongratulationsTwoComponent");
    setTimeout(() => {
      if (_this.router.url === '/moovHopBuyUseCaseCongratulationsTwo') {
        _this.router.navigate(['/moovHopHomepage']);
      }
    }, 7000);

  }

  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(() => {
      if (_this.router.url === '/moovHopBuyUseCaseCongratulationsTwo') {
        _this.router.navigate(['/moovHopHomepage']);
      }
    }, 7000);
    _this.skService.addEventApplication("demoSKV2", "appel depuis MoovHopBuyUseCaseCongratulationsTwoComponent vers cardDispenseing");
    _this.skService.addEventListener("CardDispensing", "cardDispense", this.onCardDispense);
    _this.skService.cardDispensingDispense();
    _this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint)
    _this.skService.receiptPrintingPrintRawHtml(this.moovHopService.htmlReceiptContent);
  }

  override onCardDispense = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardScanned': //CardPrepared
        break;
      case 'CardReady': //CardPresented
        break;
      case 'CardDispensed':
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("moovHopNav", {
          detail: {
            "delay": 2000,
            "goTo": "/moovHopHomepage"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'CardDispenseError':
        // traitement pour le changement de vue
        let navEventDispenseError = new CustomEvent("moovHopNav", {
          detail: {
            "delay": 2000,
            "goTo": "/moovHopHomepage"
          }
        });
        window.dispatchEvent(navEventDispenseError);
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

  override onRawPdfPrint = (e: any): any => {
    switch (e.data.dataType) {
      case 'RawPdfPrinted':
        // traitement pour le changement de vue
        console.log("pdf imprimé");
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
    let __this = this;
    __this.skService.removeEventListener("CardDispensing", "cardDispense", this.onCardDispense);
    __this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint)
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCongratulationsTwoComponent");
  }

}
