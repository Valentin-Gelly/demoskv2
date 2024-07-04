import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-mobile-op',
  templateUrl: './payment-mobile-op.component.html',
  styleUrls: ['./payment-mobile-op.component.scss', '../../moovhop.component.scss']
})
export class PaymentMobileOpComponent {
  
  // voir pout la validation si il n'y a pas une méthode pour test le numéro
  constructor(private router: Router) { }

  /*ngOnInit(){
    let _this=this;
    setTimeout(()=>{
      _this.router.navigate(['/paymentMobileOpValidation'])
    },5000)
  }*/

  ngOnInit(){
    console.log(this.router.url);
  }
}
