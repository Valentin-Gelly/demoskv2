import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-moov-hop-reload-use-case-qr-code',
  templateUrl: './moov-hop-reload-use-case-qr-code.component.html',
  styleUrls: ['./moov-hop-reload-use-case-qr-code.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseQrCodeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private skService: SoftKioskService, private router : Router) {
  }

  ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovHopBuyQrCode");
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovHopBuyQrCode terminée");
    setTimeout(() => {
      if(_this.router.url === '/moovHopReloadUseCaseQrCode'){
        _this.router.navigate(['/moovHopReloadUseCaseCongratulations']);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovHopBuyQrCode");
  }

}
