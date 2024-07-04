import { Component, OnInit } from '@angular/core';
import { MoovopService } from '../../moovHop.service';

@Component({
  selector: 'app-moov-hop-reload-use-case-summary',
  templateUrl: './moov-hop-reload-use-case-summary.component.html',
  styleUrls: ['./moov-hop-reload-use-case-summary.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseSummaryComponent implements OnInit {

  numberOfTicketsChoosedToDisplay?: number;
  constructor(private moovHopService: MoovopService) {
  }

  ngOnInit(): void {
    this.numberOfTicketsChoosedToDisplay = this.moovHopService.numberOfTicketsChoosed;
  }

}
