import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss','../../telefonica.component.scss']
})
export class EnPaymentComponent {
countdown: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.countdown = 15;
    let interval = setInterval(() => {
      this.countdown--;
      if(this.countdown == 0 && this.router.url == "/EN/payment"){
        clearInterval(interval);
        this.router.navigate(["/EN/welcome"]);
      }
    }, 1000);
  }

}
