import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MoovopService } from '../moovop.service';
import { GenericComponent } from '../../generic/generic.component';
import { SoftKioskService } from '../../../softkiosk.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-moovop-qr-code',
  templateUrl: './moovop-qr-code.component.html',
  styleUrls: ['./moovop-qr-code.component.scss', '../moovop.scss']
})
export class MoovopQrCodeComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  moovopService: MoovopService;
  constructor(moovopService: MoovopService, skService: SoftKioskService, private router: Router) {
    super(skService);
    this.moovopService = moovopService;
  }

  override ngOnInit(): void {
    let _this = this;
    console.log("on est dans le ngonInit de moovopQrCode");
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovopQrCode");
  }

  ngAfterViewInit(): void {
    let _this = this;
    console.log("on s'abonne à l'event barcodeRead de la callback onBarcodeRead");
    _this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    console.log("demande de lecture de code bar");
    _this.skService.barcodeReadingManual();
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovopCongrats terminée");
  }

  override onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':
        console.log("Code barre lu: " + e.data.barcode);
        console.log("je vais changer de page dans 1 seconde");
        // traitement pour le changement de vue
        
        if(this.router.url === "/moovopQrCode"){
          this.router.navigate(['/moovopCongratulations']);
        }
        break;
      case 'BarcodeReadError':
        console.log("Erreur de lecture de code barre: " + e.data.code);
        switch (e.data.code) {
          case 'StatusError':
            console.log("Erreur de status");
            break;
          case 'StateError':
            console.log("Erreur de state");
            break;
          case 'ConfigError':
            console.log("Erreur de config");
            break;
          case 'Timeout':
            console.log("Timeout utilisateur de lecture de code bar dépassé");
            console.log("Relance immédiate de la lecture");
            setTimeout(() => {
              this.skService.barcodeReadingManual()
            }, 500);
            break;
        }
    }
  }

  ngOnDestroy(): void {
    let __this = this;
    console.log("On se désabonne de l'event barcodeRead de la callback onBarcodeRead");
    __this.skService.removeEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    console.log("On s'abonne à l'event barcodeReadStop de la callback onBarcodeReadStop");
    __this.skService.addEventListener("BarcodeReading", "barcodeReadStop", this.onBarcodeReadStop);
    console.log(" demande d'arrêt de lecture de barcode suie à un changement de vue");
    __this.skService.stopBarcodeReadingManual();
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovopQrCode");
  }

}
