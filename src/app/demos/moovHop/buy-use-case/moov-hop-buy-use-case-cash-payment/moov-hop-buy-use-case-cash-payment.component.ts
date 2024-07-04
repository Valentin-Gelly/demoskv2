import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-cash-payment',
  templateUrl: './moov-hop-buy-use-case-cash-payment.component.html',
  styleUrls: ['./moov-hop-buy-use-case-cash-payment.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCashPaymentComponent extends GenericComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant mooovHopBuyCashPayment");
  }

  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(() => {
      if(_this.router.url === '/moovHopBuyUseCaseCashPayment'){
        _this.router.navigate(['/moovHopBuyUseCaseCongratulations']);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    let _this = this;
    // Fin d'écoute de l'événement de surveillance
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovHopBuyCashPayment")
  }
}
