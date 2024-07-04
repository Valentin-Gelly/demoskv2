import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-card-payment-two',
  templateUrl: './moov-hop-buy-use-case-card-payment-two.component.html',
  styleUrls: ['./moov-hop-buy-use-case-card-payment-two.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCardPaymentTwoComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  arrayPaymentEvents: any;
  cardInfoText: string = "INSEREZ VOTRE CARTE";
  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "on est dans le ngOnInit de Moov'Hop");
  }

  ngAfterViewInit(): void {
    let __this = this;

    this.changeCardInfoText();
  }

  async changeCardInfoText() {
    let _this = this;
    setTimeout(() => {
      _this.cardInfoText = "TAPEZ VOTRE CODE";
      setTimeout(() => {
        _this.cardInfoText = "PAIEMENT AUTORISÉ";
        setTimeout(() => {
          if(_this.router.url === '/moovHopBuyUseCaseCardPaymentTwo'){
            _this.router.navigate(['/moovHopBuyUseCaseCongratulationsTwo']);
          }
        }, 2000);
      }, 2000);
    }, 2000);
  }


  ngOnDestroy(): void {
    let ___this = this;

    ___this.skService.addEventApplication("demoSKV2", "on est dans le ngOnInit de Moov'Hop");
  }


}
