import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
@Component({
  selector: 'app-moov-hop-homepage',
  templateUrl: './moov-hop-homepage.component.html',
  styleUrls: ['./moov-hop-homepage.component.scss',  '../moovHop.scss']
})
export class MoovHopHomepageComponent implements OnInit, OnDestroy {

  constructor(private skService: SoftKioskService) { }

  ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopHomepageComponent");
  }

  ngOnDestroy(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopHomepageComponent");
  }

}
