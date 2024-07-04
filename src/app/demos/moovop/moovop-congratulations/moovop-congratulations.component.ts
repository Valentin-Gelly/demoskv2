import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MoovopService } from '../moovop.service';
import { SoftKioskService } from '../../../softkiosk.service';

import { GenericComponent } from '../../generic/generic.component';
declare var Kiosk: any;
@Component({
  selector: 'app-moovop-congratulations',
  templateUrl: './moovop-congratulations.component.html',
  styleUrls: ['./moovop-congratulations.component.scss', '../moovop.scss']
})
export class MoovopCongratulationsComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  moovopService: MoovopService

  constructor(moovopService: MoovopService, skService: SoftKioskService) {
    super(skService);
    this.moovopService = moovopService;
  }

  override ngOnInit(): void {
    let _this = this;
    console.log("on est dans le ngonInit de moovopCongrat");
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant moovopCongrats");
  }

  override onCardDispense = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardScanned': //CardPrepared
        console.log("Prochaine carte à distribuer : " + e.data.tag);
        break;
      case 'CardReady': //CardPresented
        console.log("Merci de prendre votre carte : " + e.data.tag);
        break;
      case 'CardDispensed':
        console.log("Carte retirée");
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("moovopNav", {
          detail: {
            "delay": 3000,
            "goTo": "/moovopRecupCard"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'CardDispenseError':
        switch (e.data.code) {
          case "Jam": //DispenseJam
            break;
          case "TagUnreadable":
            break;
          case "Holdback": //DispenseHoldback
            break;
          default:
            console.error("Erreur de distribution : " + e.data.code + " - " + e.data.description);
            break;
        }
        break;
      default:
        break;
    }
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "appel depuis moovopCongrat vers cardDispenseing");

    console.info("Valeur de _this: " + _this);

    console.log("on s'abonne à l'event cardDispense de la callback onCardDispense");
    _this.skService.addEventListener("CardDispensing", "cardDispense", this.onCardDispense);

    console.log("demande de distribution de cartes");
    _this.skService.cardDispensingDispense();

    // tempo pour revenir à l'écran d'accueil
    _this.moovopService.navigateAfterDelay(5000, "/moovopRecupCard");
  }

  ngOnDestroy(): void {
    let __this = this;
    console.log("on se désabonne à l'event cardDispense de la callback onCardDispense");
    __this.skService.removeEventListener("CardDispensing", "cardDispense", this.onCardDispense);
    __this.skService.removeEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovopCongrats");
  }

}
