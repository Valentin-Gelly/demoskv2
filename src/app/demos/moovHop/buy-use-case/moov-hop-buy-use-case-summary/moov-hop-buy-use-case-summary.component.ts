import { Component, OnInit } from '@angular/core';
import { MoovopService } from '../../moovHop.service';

@Component({
  selector: 'app-moov-hop-buy-use-case-summary',
  templateUrl: './moov-hop-buy-use-case-summary.component.html',
  styleUrls: ['./moov-hop-buy-use-case-summary.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseSummaryComponent implements OnInit {

  numberOfTicketsChoosedToDisplay?: number;
  constructor(private moovHopService: MoovopService) {

   }

  ngOnInit(): void {
    this.numberOfTicketsChoosedToDisplay = this.moovHopService.numberOfTicketsChoosed;
  }

}
