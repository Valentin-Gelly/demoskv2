import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-app-mobile',
  templateUrl: './payment-app-mobile.component.html',
  styleUrls: ['./payment-app-mobile.component.scss', '../../moovhop.component.scss']
})
export class PaymentAppMobileComponent {

  constructor(private router: Router) { }

  ngOnInit(){
    let _this=this;
    setTimeout(()=>{
      if(_this.router.url === '/paymentAppMobile'){
        _this.router.navigate(['/waitingScreenPrinting'])
      }
    },5000)
  }
}
