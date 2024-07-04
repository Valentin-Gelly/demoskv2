import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { GenericComponent } from '../../../demos/generic/generic.component';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent extends GenericComponent implements OnInit, AfterViewInit, OnDestroy {

  isTestLaunched: boolean = false;
  isContinuousReading: boolean = false;
  barcodeReadingStateValue: string = '';
  barcodeReadingStatusValue: string = '';
  barcodeReadInfo: string = '';
  constructor(skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventListener("BarcodeReading", "statusChange", this.onStatusChange);
    _this.skService.addEventListener("BarcodeReading", "stateChange", this.onStateChange);
    setInterval(() => {
      this.barcodeReadingStatusValue = _this.skService.getServiceStatus("BarcodeReading");
      this.barcodeReadingStateValue = _this.skService.getServiceState("BarcodeReading");
    }, 500);
  }

  testBarcode = () => {
    this.isTestLaunched = true;
    this.skService.addEventListener("BarcodeReading", "barcodeRead", this.onBarcodeRead);
    console.log("demande de lecture de code bar en mode manuel");
    this.skService.barcodeReadingManual();
  }

  stopBarcodeTest = () => {
    this.isTestLaunched = true;
    this.skService.addEventListener("BarcodeReading", "barcodeReadStop", this.onBarcodeReadStop);
    console.log("demande d'arrêt de lecture de code bar en mode manuel");
    this.skService.stopBarcodeReadingManual();
  }

  continousReading = (e: any) => {
    if (e.target.checked) {
      this.isContinuousReading = true;
    }
  }

  override onBarcodeRead = (e: any): void => {
    this.barcodeReadInfo = '';
    switch (e.data.dataType) {
      case 'BarcodeRead':
        console.log("Code barre lu: " + e.data.barcode);
        this.barcodeReadInfo = 'Code barre lu:' + e.data.barcode;
        break;
      case 'BarcodeReadError':
        console.log("Erreur de lecture de code barre: " + e.data.code);
        switch (e.data.code) {
          case 'StatusError':
            console.log("Erreur de status");
            this.barcodeReadInfo = 'Erreur de status';
            break;
          case 'StateError':
            console.log("Erreur de state");
            this.barcodeReadInfo = 'Erreur de state';
            break;
          case 'ConfigError':
            console.log("Erreur de config");
            this.barcodeReadInfo = 'Erreur de config';
            break;
          case 'Timeout':
            console.log("Timeout utilisateur de lecture de code bar dépassé");
            this.barcodeReadInfo = 'Timeout utilisateur de lecture de code bar dépassé';
            if (this.isContinuousReading === true) {
              console.log("Relance immédiate de la lecture");
              this.barcodeReadInfo = 'Relance immédiate de la lecture';
              setTimeout(() => {
                this.skService.barcodeReadingManual()
              }, 500);
              break;
            }
        }
    }
  }

  onStatusChange = (e: any) => {
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
        console.log("DataType StatusChanged");
        console.log("barcode current status : " + e.data.status);
        console.log("Status detail: " + e.data.statusDetail);
        break;
    }
  }

  onStateChange = (e: any) => {
    console.log("Événement stateChange");
    switch (e.data.dataType) {
      case "StateChanged":
        /**
         * Sur changement de state
         * Champs associés:
         * @param {("Pending" | "Ready" | "Processing" | "Stop")} e.data.state - Etat en cours du composant.
         * @param {object} e.data.stateDetail - Détail de l'état (mot-clé).
         * @param {string} e.data.stateDescription - Description de l'état.
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log("DataType StateChanged");
        console.log("barcode reader current state: " + e.data.state);
        console.log("State detail: " + e.data.stateDetail);
        console.log("DataType StateChanged");
        break;
    }
  }

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.removeEventListener("BarcodeReading", "statusChange", this.onStatusChange);
    __this.skService.removeEventListener("BarcodeReading", "stateChange", this.onStateChange);
  }

}
