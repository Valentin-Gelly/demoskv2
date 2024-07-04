import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.scss', '../../moovhop.component.scss']
})
export class ScanQrCodeComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(private router: Router, skService: SoftKioskService, private moovhopService: MoovhopService) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovopQrCode");
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    _this.skService.barcodeReadingManual();
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovopCongrats terminée");
  }

  override onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':

        // traitement pour le changement de vue

        if (this.router.url == '/AGIR2024/scanQrCode') {
          let loading = document.getElementById("loading");
          let borne = document.getElementById("borne");
          if (loading) { loading.style.setProperty("opacity", "1"); }
          if (borne) { borne.style.setProperty("opacity", "0"); }
          setTimeout(() => {
            if (this.router.url == '/AGIR2024/scanQrCode') {
              this.moovhopService.QRCodeScaned = true;
              this.router.navigate(['/AGIR2024/identificationValidation'])
            }
          }, 2000);
        }

        break;
      case 'BarcodeReadError':
        switch (e.data.code) {
          case 'StatusError':
            break;
          case 'StateError':
            break;
          case 'ConfigError':
            break;
          case 'Timeout':
            setTimeout(() => {
              this.skService.barcodeReadingManual()
            }, 500);
            break;
        }
    }
  }

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.removeEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    __this.skService.addEventListener("BarcodeReading", "barcodeReadStop", this.onBarcodeReadStop);
    __this.skService.stopBarcodeReadingManual();
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovopQrCode");
  }


}
