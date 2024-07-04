import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-choice',
  templateUrl: './payment-choice.component.html',
  styleUrls: ['./payment-choice.component.scss', '../../moovhop.component.scss']
})
export class PaymentChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  paymentByCard(){
    console.log("payment by card");
    
  }

}
