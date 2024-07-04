import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovhopService} from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-subscription-choice',
  templateUrl: './create-account-subscription-choice.component.html',
  styleUrls: ['./create-account-subscription-choice.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountSubscriptionChoiceComponent {

  constructor(private moovhopservice : MoovhopService) { }

  ngOnInit(): void {
    
    
  }

  chooseSubscription(number: number){
    switch(number){
      case 1:
        this.moovhopservice.whatSubscription = "1";
        this.moovhopservice.priceSubscription = 15;
        this.moovhopservice.textSubscription = '<p style="text-align:center;">Abonnement 1 semaine</p>';
        break;
      case 2:
        this.moovhopservice.whatSubscription = "2";
        this.moovhopservice.priceSubscription = 30;
        this.moovhopservice.textSubscription = '<p style="text-align:center;">Abonnement 1 mois</p>';
        break;
      case 3:
        this.moovhopservice.whatSubscription = "3";
        this.moovhopservice.priceSubscription = 300;
        this.moovhopservice.textSubscription = '<p style="text-align:center;">Abonnement 1 an</p>';
        break;
    }
  }


}
