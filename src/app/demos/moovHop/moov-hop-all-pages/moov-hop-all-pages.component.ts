import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoovopService } from '../moovHop.service';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../generic/generic.component';
import { SoftKioskService } from '../../../softkiosk.service';
@Component({
  selector: 'moov-hop-all-pages',
  templateUrl: './moov-hop-all-pages.component.html',
  styleUrls: ['./moov-hop-all-pages.component.scss', '../moovHop.scss']
})
export class MoovHopAllPagesComponent extends GenericComponent implements OnInit, OnDestroy {

  pressTimer: any;
  moovHopNavigateTo: string = "";
  moovHopNavigateToPrevious: string = "";
  moovHopCurrentUrl: string = "";
  stringServiceStatusCritical: string | undefined;
  stringServicesUndefined: string | undefined;
  stringServiceStatusChangedToCritical: string | undefined;
  arrayServiceStatusTempUnavailable: any;
  arrayServiceStatusWarning: any;
  moovopServices = ["BarcodeReading", "CardDispensing"];
  messageBarcode: string = "";
  messageCardDispenser: string = "";
  router: Router;


  constructor(skService: SoftKioskService, private appService: AppService, private moovHopService: MoovopService, _router: Router) {
    super(skService);
    this.moovHopNavigateTo = this.moovHopService.nextRoute;
    this.moovHopNavigateToPrevious = this.moovHopService.previousRoute;
    this.moovHopCurrentUrl = this.moovHopService.currentUrl;
    this.router = _router;
  }

  override ngOnInit(): void {
    this.testStatus();
  }

  restartPopup() {
    let confirmation = window.confirm("Redémarer la borne ?")
    if (confirmation) {
      this.skService.restartKiosk();
    }
  }

  onStatusChange = (e: any): void => {
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

        if (e.data.status === 'Critical') {
          console.log("status: " + e.data.status);
        }
        break;
    }
  }

  getServiceUndefined = (): void => {
    let Appservices = this.skService.getServicesList();
    for (let service in this.moovopServices) {
      if (Appservices.hasOwnProperty(service) === false) {
        this.stringServicesUndefined += service + " ";
      }
    };
  }

  getServicesNameCriticalStatusChanged = (): void => {
    this.moovopServices.forEach((srvName: any) => {
      this.skService.addStatusServicesEventListener(srvName, this.onStatusChange);
      if (this.skService.getStatus(srvName) === 'Critical') {
        this.stringServiceStatusCritical += srvName + ", ";
      }
    });
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

  navigateHomepage = () => {
    this.router.navigate(['/moovHopHomepage']);
  }

  ngOnDestroy(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovHopAllpages")
  }
}
