import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService} from '../../moovhop.service';


@Component({
  selector: 'app-payment-choice',
  templateUrl: './payment-choice.component.html',
  styleUrls: ['./payment-choice.component.scss', '../../moovhop.component.scss']
})
export class PaymentChoiceComponent {

  constructor(private moovhopservice : MoovhopService) { }

  paymentByCard(){
    this.moovhopservice.paidWithCB = true;
    
  }

}
