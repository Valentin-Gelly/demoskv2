import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-moov-hop-buy-use-case-scan-older-ci-finise',
  templateUrl: './moov-hop-buy-use-case-scan-older-ci-finise.component.html',
  styleUrls: ['./moov-hop-buy-use-case-scan-older-ci-finise.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseScanOlderCiFiniseComponent extends GenericComponent implements OnInit, OnDestroy {

  imageCaptureToDisplay: string =  'data:image/png;base64, ' + this.moovHopService.imageCapture;
  constructor(skService: SoftKioskService, private moovHopService: MoovopService) {
    super(skService)
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseScanOlderCiFiniseComponent");
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant: MoovHopBuyUseCaseScanOlderCiFiniseComponent");
  }

}
