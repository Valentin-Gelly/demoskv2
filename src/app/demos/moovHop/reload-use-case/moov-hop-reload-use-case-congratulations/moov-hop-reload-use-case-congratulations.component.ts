import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-moov-hop-reload-use-case-congratulations',
  templateUrl: './moov-hop-reload-use-case-congratulations.component.html',
  styleUrls: ['./moov-hop-reload-use-case-congratulations.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseCongratulationsComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {


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
      if(__this.router.url === '/moovHopReloadUseCaseCongratulations'){
        __this.router.navigate(['/moovHopHomepage']);
      }
    }, 7000);
    __this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint)
    __this.skService.receiptPrintingPrintRawHtml(this.moovHopService.htmlReceiptContent);

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
    ___this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint)
  }
}
