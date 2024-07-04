import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
@Component({
  selector: 'app-moov-hop-buy-use-case-create-acc-moovpass',
  templateUrl: './moov-hop-buy-use-case-create-acc-moovpass.component.html',
  styleUrls: ['./moov-hop-buy-use-case-create-acc-moovpass.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCreateAccMoovpassComponent implements OnInit, OnDestroy {


  router: any;
  constructor(private skService: SoftKioskService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", "fin d'écoute de l'event previewStop de la callback onPreviewStop, composant: MoovHopBuyCaseCreateAccountComponent");
  }

}
