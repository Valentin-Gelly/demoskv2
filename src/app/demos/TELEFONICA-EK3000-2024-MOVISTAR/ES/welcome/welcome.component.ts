import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { AppService as telefonicaService } from '../../telefonica.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss', '../../telefonica.component.scss']
})
export class WelcomeComponent extends GenericComponent {

  htmlReceiptContent = "";
  printCallback: any;
  constructor(private router: Router, skService: SoftKioskService, private telefonicaService: telefonicaService) {
    super(skService);
  }

  eSIM: string = this.telefonicaService.eSIM;

  ngAfterViewInit(): void {
    if (this.telefonicaService.eSIM == "eSIM") {
      let _this = this;
      this.htmlReceiptContent = '<html><meta charset="utf-8" >' +
        '<body style="font-family:Arial; font-size: 1.2rem; font-kerning: 2px; text-rendering: optimizeLegibility;">' +
        '<img style="padding-top:25px; margin-left:auto; margin-right:auto; margin-bottom:25px; margin-top:20px; '+
        'width:150px; display:block" src="http://localhost:5000/DemoSKV2/application/assets/Logo-noir.png" >' +
        '<p style="text-align:center;">.....................</p>' +
        '<p style="text-align:center;">Escanee el código QR para obtener tu eSIM.</p>' +
        '<p style="text-align:center;">.....................</p>' +
        '<div style="width:50%; text-align:center; margin-left: auto;margin-right: auto;"><img style="width:100%"'+
        'src="http://localhost:5000/DemoSKV2/application/assets/QR-code.png"></div>' +
        '</body>' +
        '</html>'
      this.skService.addEventListener("ReceiptPrinting", "rawHtmlPrint", this.printCallback)
      this.skService.receiptPrintingPrintRawHtml(this.htmlReceiptContent);
        setTimeout(function () {
          if(_this.router.url === "/ES/welcome"){
            _this.router.navigate(['/ES/homePageTelefonica']);
          }
        }, 10000);
    }else{
      var Kiosk: any;
      let _this = this;
      console.log("on s'abonne à l'event cardDispense de la callback onCardDispense");
      _this.skService.addEventListener("CardDispensing", "cardDispense", this.onCardDispense);
      console.log("demande de distribution de cartes");
      Kiosk.CardDispensing.dispenseCard();
      // tempo pour revenir à l'écran d'accueil
        setTimeout(function () {
          if( _this.router.url === "/ES/welcome"){
            _this.router.navigate(['/ES/homePageTelefonica']);
          }
        }, 10000);
    }
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

  ngOnDestroy(): void {
    this.telefonicaService.scanVisited = 1;
    this.telefonicaService.previewImageProfile = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.telefonicaService.previewImageScanIdBDef = "";
    this.telefonicaService.previewImageScanIdADef = "";
    this.telefonicaService.idChecks = "";
    this.telefonicaService.referenceId = "";
    this.telefonicaService.errorSaveIdCard = false;
    this.telefonicaService.hrefSensitiveData = "";
    this.telefonicaService.userName = "";
    this.telefonicaService.adress = "";
    this.telefonicaService.userFirstName = "";
    this.telefonicaService.nationality = "";
    this.telefonicaService.userSecondName = "";
    this.telefonicaService.numDocument = "";
    this.telefonicaService.postalCode = "";
    this.telefonicaService.documentoSelected = "";
    this.telefonicaService.errorFace = false;
    this.telefonicaService.errorScanId = false;

    if (this.telefonicaService.eSIM == "eSIM") {
      //this.skService.removeEventListener("TicketPrinting", "rawPdfPrint", this.onRawPdfPrint);
      this.skService.removeEventListener("ReceiptPrinting", "rawHtmlPrint", this.onRawHtmlPrint);
    }else{
      let __this = this;
      console.log("on se désabonne à l'event cardDispense de la callback onCardDispense");
      __this.skService.removeEventListener("CardDispensing", "cardDispense", this.onCardDispense);
      __this.skService.addEventApplication("demoSKV2", "fin de vie du composant moovopCongrats");
  
    }
    this.telefonicaService.eSIM = "";
  }
}
