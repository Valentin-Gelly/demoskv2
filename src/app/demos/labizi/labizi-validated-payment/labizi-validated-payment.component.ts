import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { LabiziService } from '../labizi.service';
import { GenericComponent } from '../../generic/generic.component';

@Component({
  selector: 'labizi-validated-payment',
  templateUrl: './labizi-validated-payment.component.html',
  styleUrls: ['./labizi-validated-payment.component.scss', '../labizi.scss']
})
export class LabiziValidatedPaymentComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(skService: SoftKioskService, private labiziService: LabiziService) {
    super(skService);
   }

  htmlReceipt =
  '<html><meta charset="utf-8" >' +
  '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
  '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/Labizitest/application/assets/labizi/Logo.png" >' +
  '<h4 style="text-align:center"> Votre reçu </h4>' +
  '<p style="text-align:center;"> CARTE BANCAIRE <br> SANS CONTACT <br> le 20/01/23 à 16:21:22 <br> 16546544 <br> 561561651464654 <br> INGENICO TEST <br> 156465456 <br> 116464564 <br> ******************* <br> MONTANT REEL= <br> 10,00 EUR <br> Pour information: <br> 13,00 USD <br> DEBIT <br> TICKET CLIENT <br> A CONSERVER <br> ............... <br> <br> Merci à bientôt ! </p>' +
  '</body>' +
  '</html>';

  override ngOnInit(): void {
    this.labiziService.navigateAfterDelay(10000);
    console.log("on est dans le ngOnInit de vitale validated payment");
    console.info(this.skService);
  }

  ngAfterViewInit(): void {
    let _this = this;
    console.log("on s'abonne à l'event rawHtmlPrint de la callback onRawHtmlPrint");
    _this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
    // Impression du reçu
    console.log("on demande une impression de reçu");
    _this.skService.receiptPrintingPrintRawHtml(_this.htmlReceipt);
  }

  ngOnDestroy(): void {
    let __this = this;
    console.log("on se désabonne de l'event rawHtmlPrint de la callback onRawHtmlPrint");
    __this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);

  }
}
