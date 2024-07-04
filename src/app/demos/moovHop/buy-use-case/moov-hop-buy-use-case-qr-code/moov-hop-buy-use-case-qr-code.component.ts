import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-qr-code',
  templateUrl: './moov-hop-buy-use-case-qr-code.component.html',
  styleUrls: ['./moov-hop-buy-use-case-qr-code.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseQrCodeComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  moovHopService: MoovopService;
  constructor(skService: SoftKioskService, moovHopService: MoovopService, private router : Router){
    super(skService);
    this.moovHopService = moovHopService;
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovHopBuyQrCode");
  }

  ngAfterViewInit(): void {
    let _this = this;

    setTimeout(() => {
      if(_this.router.url === '/moovHopBuyCaseQrCode'){
        _this.router.navigate(['/moovHopBuyUseCaseCongratulations']);
      }
    }, 5000);
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovHopBuyQrCode terminée");
  }

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovHopBuyQrCode");
  }
}
