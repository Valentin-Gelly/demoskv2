import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-information-summary',
  templateUrl: './information-summary.component.html',
  styleUrls: ['./information-summary.component.scss','../../moovhop.component.scss']
})
export class InformationSummaryComponent  {

  constructor(private moovhopService: MoovhopService ) { }



}
