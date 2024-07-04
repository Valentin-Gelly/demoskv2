import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss', '../../moovhop.component.scss']
})
export class PaymentCardComponent extends GenericComponent {

  constructor(private router: Router, skService: SoftKioskService, private moovHopService: MoovhopService) {
    super(skService);
  }

  cardInfoText: string = "INSEREZ VOTRE CARTE";

  textCb: string = '';

  override ngOnInit() {
    this.changeCardInfoText();
    document.getElementsByTagName('body')[0].style.width = 'fit-content';
    document.getElementsByTagName('body')[0].style.height = 'fit-content';
    console.log("document.getElementsByTagName('body')[0].style.height");
    console.log(document.getElementsByTagName('body')[0].style.height);
    console.log("document.getElementsByTagName('body')[0].style.height ");
    console.log(document.getElementsByTagName('body')[0].style.height);
    let _this = this;
    //_this.skService.activeSoftkioskScenario("CardPayment_Debit_Without_ReceiptPrinting");
    _this.skService.addEventApplication("demoSKV2", "ngInit du paiement par carte")
  }


  ngAfterViewInit(): void {
    this.moovHopService.textCB ='<p style="text-align:center;">'+
    ' CARTE BANCAIRE <br> SANS CONTACT <br> le '+new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0');+' <br> 16546544 <br> 561561651464654 <br>'+
    ' INGENICO TEST <br> 156465456 <br> 116464564 <br> ******************* <br> MONTANT REEL= <br> '+this.moovHopService.priceSubscription+' EUR <br>'+
    ' Pour information: <br> DEBIT <br> TICKET CLIENT <br> A CONSERVER <br> ............... <br>';
  }
  timeout: any;
  async changeCardInfoText() {
    let _this = this;
    this.timeout= setTimeout(() => {
      _this.cardInfoText = "TAPEZ VOTRE CODE";
      setTimeout(() => {
        _this.cardInfoText = "PAIEMENT AUTORISÉ";
        setTimeout(() => {
          if (_this.router.url === '/paymentCB') {
            _this.router.navigate(['/waitingScreenPrinting']);
          }
        }, 2000);
      }, 2000);
    }, 2000);
  }


  ngOnDestroy(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "ngInit du paiement par carte");
    clearTimeout(_this.timeout);
  }

}
