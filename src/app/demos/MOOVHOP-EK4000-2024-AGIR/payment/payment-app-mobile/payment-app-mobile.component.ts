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
      if(_this.router.url === '/AGIR2024/paymentAppMobile'){
        _this.router.navigate(['/AGIR2024/waitingScreenPrinting'])
      }
    },5000)
  }
}
