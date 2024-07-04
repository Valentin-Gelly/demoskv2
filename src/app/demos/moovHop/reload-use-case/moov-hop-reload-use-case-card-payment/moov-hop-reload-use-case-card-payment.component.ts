import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { SoftKioskService } from '../../../../softkiosk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-reload-use-case-card-payment',
  templateUrl: './moov-hop-reload-use-case-card-payment.component.html',
  styleUrls: ['./moov-hop-reload-use-case-card-payment.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseCardPaymentComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  arrayPaymentEvents: any;
  cardInfoText: string = "INSEREZ VOTRE CARTE";
  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "on est dans le ngOnInit de MoovHopReloadUseCaseCardPaymentComponent");
  }

  ngAfterViewInit(): void {
    this.changeCardInfoText();
  }

  async changeCardInfoText() {
    let _this = this;
    setTimeout(() => {
      _this.cardInfoText = "TAPEZ VOTRE CODE";
      setTimeout(() => {
        _this.cardInfoText = "PAIEMENT AUTORISÉ";
        setTimeout(() => {
          if (_this.router.url === '/moovHopReloadUseCaseCardPayment') {
            _this.router.navigate(['/moovHopReloadUseCaseCongratulations']);
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
