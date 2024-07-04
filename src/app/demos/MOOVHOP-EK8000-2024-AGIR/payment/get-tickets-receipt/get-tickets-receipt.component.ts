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
      if (this.router.url === '/EK80002024AGIR/getTicketReceipt') {
        this.router.navigate(['/EK80002024AGIR/homepage']);
      }
    }, 5000);
  }

  //impression du ticket et du reçu de paiement

}
