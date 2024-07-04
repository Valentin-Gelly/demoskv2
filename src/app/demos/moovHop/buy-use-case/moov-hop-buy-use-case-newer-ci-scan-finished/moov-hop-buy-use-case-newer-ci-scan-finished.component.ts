import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-moov-hop-buy-use-case-newer-ci-scan-finished',
  templateUrl: './moov-hop-buy-use-case-newer-ci-scan-finished.component.html',
  styleUrls: ['./moov-hop-buy-use-case-newer-ci-scan-finished.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseNewerCiScanFinishedComponent extends GenericComponent implements OnInit, OnDestroy {

  imageCaptureToDisplay: string = 'data:image/png;base64, ' + this.moovHopService.newerCiImageCaptureTwo;
  constructor(skService: SoftKioskService, private moovHopService: MoovopService) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseNewerCiScanFinishedComponent");
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", " fin de vie du composant: MoovHopBuyUseCaseNewerCiScanFinishedComponent");
  }

}
