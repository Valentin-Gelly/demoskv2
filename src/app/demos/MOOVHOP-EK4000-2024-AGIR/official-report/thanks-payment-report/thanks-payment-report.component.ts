import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks-payment-report',
  templateUrl: './thanks-payment-report.component.html',
  styleUrls: ['./thanks-payment-report.component.scss', '../../moovhop.component.scss']
})
export class ThanksPaymentReportComponent implements OnInit {

  constructor(private router: Router) { }
  timeOut: any;
  ngOnInit(): void {
     
    this.timeOut = setTimeout(() => {
      if (this.router.url === "/AGIR2024/thanksPaymentReport") {
        this.router.navigate(['/AGIR2024/homepage'])
      }
    }, 5000);

  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
  }
