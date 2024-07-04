import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovopService } from '../moovop.service';
import { SoftKioskService } from '../../../softkiosk.service';

@Component({
  selector: 'app-moovop-recup-card',
  templateUrl: './moovop-recup-card.component.html',
  styleUrls: ['./moovop-recup-card.component.scss', '../moovop.scss']
})

export class MoovopRecupCardComponent  implements OnInit {

  moovopService: MoovopService;
  skService: SoftKioskService;

  constructor(moovopService: MoovopService, skService: SoftKioskService) {
    this.moovopService = moovopService;
    this.skService = skService;
  }

  ngOnInit(): void {
    let _this = this;
    console.log("on est dans le ngOnInit de moovoprecupCard");
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant moovoprecupCard");
  }

}
