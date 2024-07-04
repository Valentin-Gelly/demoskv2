import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { GenericComponent } from '../../generic/generic.component';

@Component({
  selector: 'app-labizi-qr-code',
  templateUrl: './labizi-qr-code.component.html',
  styleUrls: ['./labizi-qr-code.component.scss', '../labizi.scss']
})
export class LabiziQrCodeComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit(): void {
    console.log("on est dans le ngOnInit de barcode reading");
    console.info(this.skService);
  }

  ngAfterViewInit(): void {
    let _this = this;

    console.log("on s'abonne à l'event barcodeRead de la callback onBarcodeRead");
    _this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    console.log("demande de lecture de code bar");
    _this.skService.barcodeReadingManual();
  }

  override onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':
        console.log("Code barre lu: " + e.data.barcode);
        console.log("je vais changer de page dans 1 seconde");
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("labiziNav", {
          detail: {
            "delay": 1000,
            "goTo": "/labiziRdv"
          }
        });
        window.dispatchEvent(navEvent);
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
            setTimeout( () => {
              this.skService.barcodeReadingManual()
            }, 500);
            this.skService.barcodeReadingManual();
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
  }

}
