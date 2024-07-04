import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-moov-hop-buy-use-case-create-acc-form',
  templateUrl: './moov-hop-buy-use-case-create-acc-form.component.html',
  styleUrls: ['./moov-hop-buy-use-case-create-acc-form.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCreateAccFormComponent implements OnInit, OnDestroy {

  isKbdShown: boolean = false;
  constructor(private skService: SoftKioskService, private router: Router, private moovHopService: MoovopService) { }

  ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant mooovHopBuyCashPayment");
  }

  ngOnDestroy(): void {
    let ___this = this;
    if (this.isKbdShown === true) {
      ___this.skService.hideKbd();
    }
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCreateAccFormComponent");
  }

}
