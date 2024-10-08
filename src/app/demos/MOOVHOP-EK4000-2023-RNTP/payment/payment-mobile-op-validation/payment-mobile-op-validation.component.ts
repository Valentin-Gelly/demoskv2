import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-mobile-op-validation',
  templateUrl: './payment-mobile-op-validation.component.html',
  styleUrls: ['./payment-mobile-op-validation.component.scss', '../../moovhop.component.scss']
})
export class PaymentMobileOpValidationComponent {
  constructor(private router: Router) { }
  timeOut: any;
  ngOnInit(){
    let _this=this;
    this.timeOut= setTimeout(()=>{
      _this.router.navigate(['/waitingScreenPrinting'])
    },5000)
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
}
