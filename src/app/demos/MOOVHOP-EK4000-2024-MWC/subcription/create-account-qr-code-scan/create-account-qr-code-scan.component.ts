import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-account-qr-code-scan',
  templateUrl: './create-account-qr-code-scan.component.html',
  styleUrls: ['./create-account-qr-code-scan.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountQRCodeScanComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private router: Router, skService: SoftKioskService, private moovhopService: MoovhopService) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de moovopQrCode");
  }

  ngAfterViewInit(): void {
    let _this = this;
    this.moovhopService.htmlReceiptContent='<html><meta charset="utf-8" >' +
    '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
    '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
    '<h4 style="text-align:center"> Confirmation d\'achat</h4>' +
    '<p style="text-align:center;">' + this.moovhopService.textSubscription + '</p>' +
    '<p style="text-align:center;">' + this.moovhopService.priceSubscription + '</p>' +
    '<p style="text-align:center;">.....................</p>' +
    '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovhopService.textCB + '</p>' +
    '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">.....................</p>' +
    '<img src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK4000-2023-RNTP/qr_ticket.jpg">'+
    '<p style="text-align:center;">Récupérez votre carte d\'abonné en agence ou sur une borne de Click & Collect en scannant ce QR code !</p>' +
    '</body>' +
    '</html>';
    _this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    _this.skService.barcodeReadingManual();
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovopCongrats terminée");
    
  }

  override onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':
        if (this.router.url == '/MWC2024/createAccountQRCodeScan') {
          document.getElementById('textAdd')?.style.setProperty('opacity', '1');
          this.moovhopService.priceSubscription = this.moovhopService.priceSubscription*0.85
          let textSubscription = this.moovhopService.textSubscription;
          setTimeout(() => {
            if (this.router.url == '/MWC2024/createAccountQRCodeScan') {
              let _this = this;
              _this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
              _this.skService.barcodeReadingManual();
              _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant moovopCongrats terminée");
              console.log("barcodeRead", this.moovhopService.textSubscription, this.moovhopService.priceSubscription );
              
              this.moovhopService.htmlReceiptContent='<html><meta charset="utf-8" >' +
              '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
              '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/MoovHop/logo-app-print.png" >' +
              '<h4 style="text-align:center"> Confirmation d\'achat</h4>' +
              '<p style="text-align:center;">' + textSubscription + '</p>' +
              '<p style="text-align:center;">' + this.moovhopService.priceSubscription + '</p>' +
              '<p style="text-align:center;">.....................</p>' +
              '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">' + this.moovhopService.textCB + '</p>' +
              '<p style="text-align:center;" *ngIf="this.textCB!=\'\' ">.....................</p>' +
              '<img src="http://localhost:5000/DemoSKV2/application/assets/MOOVHOP-EK4000-2023-RNTP/qr_ticket.jpg">'+
              '<p style="text-align:center;">Récupérez votre carte d\'abonné en agence ou sur une borne de Click & Collect en scannant ce QR code !</p>' +
              '</body>' +
              '</html>';
              this.router.navigate(['/MWC2024/paymentChoice']);

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
