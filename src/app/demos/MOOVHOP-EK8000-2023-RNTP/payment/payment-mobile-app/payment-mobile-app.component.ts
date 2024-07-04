import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-payment-mobile-app',
  templateUrl: './payment-mobile-app.component.html',
  styleUrls: ['./payment-mobile-app.component.scss', '../../moovhop.component.scss']
})
export class PaymentMobileAppComponent implements OnInit {

  constructor(private router: Router, private moovHopService : MoovhopService) { }

  ngOnInit(){
    this.moovHopService.textCB='';
    let _this=this;
    setTimeout(()=>{
      if(_this.router.url === '/paymentAppMobile8000'){
        _this.router.navigate(['/waitingScreen'])
      }
    },5000)
  }

}
