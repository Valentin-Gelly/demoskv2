import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-moov-hop-reload-use-case-cash-payment',
  templateUrl: './moov-hop-reload-use-case-cash-payment.component.html',
  styleUrls: ['./moov-hop-reload-use-case-cash-payment.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseCashPaymentComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopReloadUseCaseCashPaymentComponent");
  }

  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(() => {
      if(_this.router.url === '/moovHopReloadUseCaseCashPayment'){
        _this.router.navigate(['/moovHopReloadUseCaseCongratulations']);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    let _this = this;
    // Fin d'écoute de l'événement de surveillance
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopReloadUseCaseCashPaymentComponent")
  }

}
