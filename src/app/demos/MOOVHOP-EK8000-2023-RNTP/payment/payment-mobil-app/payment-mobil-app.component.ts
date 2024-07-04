import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-payment-mobil-app',
  templateUrl: './payment-mobil-app.component.html',
  styleUrls: ['./payment-mobil-app.component.scss', '../../moovhop.component.scss']
})
export class PaymentMobilAppComponent implements OnInit {

  constructor(private router: Router, private moovHopService : MoovhopService) { }

  ngOnInit(){
    this.moovHopService.textCB='';
    let _this=this;
    setTimeout(()=>{
      if(_this.router.url === '/RNTP2023/paymentAppMobile'){
        _this.router.navigate(['/RNTP2023/waitingScreen'])
      }
    },5000)
  }

}
