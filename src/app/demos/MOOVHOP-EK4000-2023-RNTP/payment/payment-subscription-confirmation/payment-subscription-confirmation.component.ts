import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-subscription-confirmation',
  templateUrl: './payment-subscription-confirmation.component.html',
  styleUrls: ['./payment-subscription-confirmation.component.scss', '../../moovhop.component.scss']
})
export class PaymentSubscriptionConfirmationComponent extends GenericComponent implements OnInit, OnDestroy {
  timeOut: any;
  constructor(private router: Router, private moovhopservice: MoovhopService, skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit() {
  }

  ngAfterViewInit(): void {
    let __this = this;
    this.timeOut = setTimeout(() => {
      if (__this.router.url === '/subScriptionConfirmation') {
        __this.router.navigate(['/homepage']);
      }
    }, 7000);
  }



  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }



}