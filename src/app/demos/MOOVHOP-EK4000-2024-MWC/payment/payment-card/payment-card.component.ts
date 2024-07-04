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

  cardInfoText: string = "INSERT YOUR CARD";

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
    ' BANK CARD <br> WITHOUT CONTACT <br> at '+new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0');+' <br> 16546544 <br> 561561651464654 <br>'+
    ' INGENICO <br> 156465456 <br> 116464564 <br> ******************* <br> REAL AMOUNT= <br> '+this.moovHopService.priceSubscription+' EUR <br>'+
    ' For information: <br> DEBIT <br> CUSTOMER TICKET <br> TO CONSERVE <br> ............... <br>';

  }
  timeout: any;
  async changeCardInfoText() {
    let _this = this;
    this.timeout= setTimeout(() => {
      _this.cardInfoText = "ENTER YOUR CODE";
      setTimeout(() => {
        _this.cardInfoText = "AUTHORIZED PAYMENT";
        setTimeout(() => {
          if (_this.router.url === '/MWC2024/paymentCB') {
            _this.router.navigate(['/MWC2024/waitingScreenPrinting']);
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
