import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-moov-hop-buy-use-case-newer-ci-one-progressing',
  templateUrl: './moov-hop-buy-use-case-newer-ci-one-progressing.component.html',
  styleUrls: ['./moov-hop-buy-use-case-newer-ci-one-progressing.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseNewerCiOneProgressingComponent extends GenericComponent implements OnInit, OnDestroy {

  imageCaptureToDisplay: string =  'data:image/png;base64, ' + this.moovHopService.newerCiImageCapture;
  constructor(skService: SoftKioskService, private moovHopService: MoovopService) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseNewerCiOneProgressingComponent");
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", "fin d'écoute de l'event captureImage de la callback onImageCapture, composant: MoovHopBuyUseCaseScanOlderCiFiniseComponent");
  }

}
