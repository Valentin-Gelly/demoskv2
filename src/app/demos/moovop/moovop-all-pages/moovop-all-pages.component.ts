import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoovopService } from '../moovop.service';
import { SoftKioskService } from '../../../softkiosk.service';

import { GenericComponent } from '../../generic/generic.component';

@Component({
  selector: 'moovop-all-pages',
  templateUrl: './moovop-all-pages.component.html',
  styleUrls: ['./moovop-all-pages.component.scss', '../moovop.scss']
})


export class MoovopAllPagesComponent extends GenericComponent implements OnInit, OnDestroy {

  moovopNavigateTo: string = "";
  moovopNavigateToPrevious: string = "";
  moovopCurrentUrl: string = "";
  moovopService: MoovopService;
  stringServiceStatusCritical: string | undefined;
  stringServicesUndefined: string | undefined;
  stringServiceStatusChangedToCritical: string | undefined;
  arrayServiceStatusTempUnavailable: any;
  arrayServiceStatusWarning: any;
  messageBarcode: string = "";
  messageCardDispenser: string = "";

  constructor(moovopService: MoovopService, skService: SoftKioskService) {
    super(skService);
    this.moovopService = moovopService;
    this.skService = skService;
    this.moovopNavigateTo = this.moovopService.nextRoute;
    this.moovopNavigateToPrevious = this.moovopService.previousRoute;
    this.moovopCurrentUrl = this.moovopService.currentUrl;
  }

  override ngOnInit(): void {
    console.log("on est dans le ngOnInit de moovopAllPages");
    this.testStatus();
  }

  onStatusChange = (e: any): void => {
    console.log("Événement statusChange");
    switch (e.data.dataType) {
      case "StatusChanged":
        /**
         * Sur changement de status
         * Champs associés:
         * @param {("Ok" | "Warning" | "Critical" | "Unknown" | "TempUnavailable")} e.data.status - Statut.
         * @param {object} e.data.statusDetail - Statut détaillé.
         * @param {string} e.data.statusDescription - Description du statut.
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log(e.data.status);
        console.log("DataType StatusChanged");
        break;
    }
  }

  testStatus = () => {
    // CardDispenser
    this.skService.addStatusServicesEventListener("CardDispensing", (e: any) => {
      switch (e.data.statusDetail) {
        case 'NearEmpty':
          this.messageBarcode = 'Dépileur Bientôt vide';
          break
        case 'Empty':
          this.messageBarcode = 'Dépileur vide';
          break;
        default:
          this.messageBarcode = '';
      }
    });
    // Barocde Reader
    this.skService.addStatusServicesEventListener("BarcodeReading", (e: any) => {
      switch (e.data.statusDetail) {
        case 'Offline':
          this.messageCardDispenser = 'Barcode Déconnecté';
          break
        default:
          this.messageCardDispenser = '';
      }
    });
  }

  getServiceUndefined = (): void => {
    let moovopServices = ["BarcodeReading", "CardDispensing"];
    let Appservices = this.skService.getServicesList();
    for (let service in moovopServices) {
      if ( Appservices.hasOwnProperty(service) === false ) {
        this.stringServicesUndefined += service + " ";
      }
    };
  }

  getServicesNameCriticalStatusChanged = (): void => {
    this.skService.getServicesList().forEach((srvName: any) => {
      this.skService.addStatusServicesEventListener(srvName, this.onStatusChange);
      if (this.skService.getStatus(srvName) === 'Critical') {
        this.stringServiceStatusCritical += srvName + ", ";
      } else if (this.skService.getStatus(srvName) === 'TempUnavailable') {
        this.arrayServiceStatusTempUnavailable += srvName + ", ";
      } else if (this.skService.getServiceStatusDetail(srvName) === 'NearEmpty') {
        this.arrayServiceStatusWarning += "NearEmpty ";
      } else if (this.skService.getServiceStatusDetail(srvName) === 'Empty') {
        this.arrayServiceStatusWarning += "Empty ";
      } else if (this.skService.getServiceStatusDetail(srvName) === 'BinFull') {
        this.arrayServiceStatusWarning += "BinFull ";
      }
    });
  }

  ngOnDestroy(): void {
    let _this = this;
    console.log("destruction composant moovopAllpages");
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovopAllpages")
  }
}
