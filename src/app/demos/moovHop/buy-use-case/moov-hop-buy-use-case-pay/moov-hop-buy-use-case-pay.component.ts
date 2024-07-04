import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-pay',
  templateUrl: './moov-hop-buy-use-case-pay.component.html',
  styleUrls: ['./moov-hop-buy-use-case-pay.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCasePayComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  arrayPaymentEvents: any;
  cardInfoText: string = "INSEREZ VOTRE CARTE";
  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
    this.arrayPaymentEvents = [];
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "on est dans le ngOnInit de Moov'Hop");
  }

  ngAfterViewInit(): void {
    this.changeCardInfoText();
  }

  async changeCardInfoText() {
    let _this = this;
    setTimeout(() => {
      _this.cardInfoText = "TAPEZ VOTRE CODE";
      setTimeout(() => {
        _this.cardInfoText = "PAIEMENT AUTORISE";
        setTimeout(() => {
          if(_this.router.url === '/moovHopBuyUseCaseCardPayment'){
            _this.router.navigate(['/moovHopBuyUseCaseCongratulations']);
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
