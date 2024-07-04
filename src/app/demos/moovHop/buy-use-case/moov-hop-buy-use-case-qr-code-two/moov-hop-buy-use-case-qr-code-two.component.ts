import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-moov-hop-buy-use-case-qr-code-two',
  templateUrl: './moov-hop-buy-use-case-qr-code-two.component.html',
  styleUrls: ['./moov-hop-buy-use-case-qr-code-two.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseQrCodeTwoComponent implements OnInit, OnDestroy, AfterViewInit {

  moovHopService: MoovopService;
  constructor(private skService: SoftKioskService, moovHopService: MoovopService, private router : Router) {
    this.moovHopService = moovHopService;
  }

  ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de MoovHopBuyUseCaseQrCodeTwoComponent");
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant MoovHopBuyUseCaseQrCodeTwoComponent terminée");

    setTimeout(() => {
      if(_this.router.url === '/moovHopBuyUseCaseQrCodeTwo'){
        _this.router.navigate(['/moovHopBuyUseCaseCongratulationsTwo']);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseQrCodeTwoComponent");
  }

}
