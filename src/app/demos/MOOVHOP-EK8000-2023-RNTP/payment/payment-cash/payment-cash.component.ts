import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';


@Component({
  selector: 'app-payment-cash',
  templateUrl: './payment-cash.component.html',
  styleUrls: ['./payment-cash.component.scss', '../../moovhop.component.scss']
})
export class PaymentCashComponent implements OnInit {

  constructor( private router : Router, private moovHopService : MoovhopService) { }

  ngOnInit(): void {
    this.moovHopService.textCB='';
  }


  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(() => {
      if(_this.router.url === '/RNTP2023/paymentCash'){
        _this.router.navigate(['/RNTP2023/waitingScreen']);
      }
    }, 5000);
  }

}
