import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';


@Component({
  selector: 'app-buy-choice',
  templateUrl: './buy-choice.component.html',
  styleUrls: ['./buy-choice.component.scss', '../../moovhop.component.scss']
})
export class BuyChoiceComponent implements OnInit {

  constructor(private moovhopService: MoovhopService) { }

  ngOnInit(): void {
  }

  choose(num: number) {
    console.log(num);
    this.moovhopService.TicketChoosed = num;
    switch (num) {
      case 1:
        this.moovhopService.ticketPrice = 1.00;
        this.moovhopService.bnTickets = 1;
        this.moovhopService.textTickets = '<p style="text-align:center;">1 voyage</p>';
        break;
      case 2:
        this.moovhopService.ticketPrice = 1.50;
        this.moovhopService.bnTickets = 2;
        this.moovhopService.textTickets = '<p style="text-align:center;">2 voyages</p>';
        break;
      case 10:
        this.moovhopService.ticketPrice = 8.00;
        this.moovhopService.bnTickets = 3;
        this.moovhopService.textTickets = '<p style="text-align:center;">10 voyages</p>';
        break;
      case 24:
        this.moovhopService.ticketPrice = 5.00;
        this.moovhopService.bnTickets = 1;
        this.moovhopService.textTickets = '<p style="text-align:center;">24 heures</p>';
        break;
      case 48:
        this.moovhopService.ticketPrice = 10.00;
        this.moovhopService.bnTickets = 1;
        this.moovhopService.textTickets = '<p style="text-align:center;">48 heures</p>';
        break;
      case 72:
        this.moovhopService.ticketPrice = 15.00;
        this.moovhopService.bnTickets = 1;
        this.moovhopService.textTickets = '<p style="text-align:center;">72 heures</p>';
        break;
    }
  }
}
