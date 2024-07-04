import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { LabiziService } from '../labizi.service';
import { GenericComponent } from '../../generic/generic.component';

@Component({
  selector: 'labizi-validated-queue',
  templateUrl: './labizi-validated-queue.component.html',
  styleUrls: ['./labizi-validated-queue.component.scss',
    '../labizi.scss'
  ]
})
export class LabiziValidatedQueueComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private labiziService: LabiziService, skService: SoftKioskService) {
    super(skService);
    this.labiziService = labiziService;
  }

  override ngOnInit(): void {
    this.labiziService.navigateAfterDelay(10000);
    console.log("on est dans le ngOnInit de validated queue");
    this.customerIndex();
  }

  ngAfterViewInit(): void {
    let _this = this;

    let htmlReceipt = '<html><meta charset="utf-8" >';
    switch (_this.labiziService.testType) {
      case 'Covid':
        htmlReceipt +=
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/Labizitest/application/assets/labizi/Logo.png" >' +
          '<h4 style="text-align:center"> Vous êtes le numéro ' + _this.labiziService.customerIndex + '<br> pour le Test Covid-19 </h4>' +
          '<p style="text-align:center;"> Merci de patienter en salle <br> d\'attente, un professionnel de <br> santé viendra vous appeler. </p>' +
          '</body>' +
          '</html>';
        break;
      case 'Blood':
        htmlReceipt +=
          '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
          '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/Labizitest/application/assets/labizi/Logo.png" >' +
          '<h4 style="text-align:center"> Vous êtes le numéro ' + _this.labiziService.customerIndex + '<br> pour la prise de sang </h4>' +
          '<p style="text-align:center;"> Merci de patienter en salle <br> d\'attente, un professionnel de <br> santé viendra vous appeler. </p>' +
          '</body>' +
          '</html>';
        break;
    }

    console.log("on s'abonne à l'event rawHtmlPrint de la callback onRawHtmlPrint");
    _this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
    // Impression du reçu
    console.log("on demande une impression de reçu");
    _this.skService.receiptPrintingPrintRawHtml(htmlReceipt);

  }

  customerIndex(): void {
    this.labiziService.customerIndex += 1;
    console.log("client n°: " + this.labiziService.customerIndex);
  }

  ngOnDestroy(): void {
    let __this = this;
    console.log("on se désabonnz de l'event rawHtmlPrint de la callback onRawHtmlPrint");
    __this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
  }

}
