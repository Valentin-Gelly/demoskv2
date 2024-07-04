import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-tickets-receipt',
  templateUrl: './get-tickets-receipt.component.html',
  styleUrls: ['./get-tickets-receipt.component.scss', '../../moovhop.component.scss']
})
export class GetTicketsReceiptComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.router.url === '/RNTP2023/getTicketReceipt') {
        this.router.navigate(['/RNTP2023/homepage']);
      }
    }, 5000);
  }

  //impression du ticket et du reçu de paiement

}
