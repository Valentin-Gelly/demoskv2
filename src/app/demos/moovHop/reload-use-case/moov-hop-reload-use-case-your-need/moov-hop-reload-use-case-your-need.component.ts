import { Component, OnInit } from '@angular/core';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-reload-use-case-your-need',
  templateUrl: './moov-hop-reload-use-case-your-need.component.html',
  styleUrls: ['./moov-hop-reload-use-case-your-need.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseYourNeedComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private moovHopService: MoovopService, private router: Router) { }

  ticketChoice(numberChoice: number): void {
    this.moovHopService.numberOfTicketsChoosed = numberChoice;
    this.router.navigate(["/moovHopRealoadUseCaseConnection"]);
  }

}
