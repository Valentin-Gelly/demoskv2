import { Component, OnInit } from '@angular/core';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-moov-hop-buy-use-case-your-need',
  templateUrl: './moov-hop-buy-use-case-your-need.component.html',
  styleUrls: ['./moov-hop-buy-use-case-your-need.component.scss',  '../../moovHop.scss']
})
export class MoovHopBuyUseCaseYourNeedComponent implements OnInit {


  constructor(private moovHopService: MoovopService, private router: Router) {
   }

  ngOnInit(): void {
  }

  ticketChoice(numberChoice: number): void {
    this.moovHopService.numberOfTicketsChoosed = numberChoice;
    this.router.navigate(["/moovHopBuyUseCaseSummary"]);
  }

}
