import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../generic/generic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-cash-payment-two',
  templateUrl: './moov-hop-buy-use-case-cash-payment-two.component.html',
  styleUrls: ['./moov-hop-buy-use-case-cash-payment-two.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCashPaymentTwoComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseCashPaymentTwoComponent");
  }

  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(() => {
      if(_this.router.url === '/moovHopBuyUseCaseCashPaymentTwo'){
        _this.router.navigate(['/moovHopBuyUseCaseCongratulationsTwo']);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCashPaymentTwoComponent")
  }

}
