import { Component } from '@angular/core';
import { MoovhopService } from '../moovhop.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../moovhop.component.scss']
})
export class HomepageComponent {
  constructor( private moovhopService: MoovhopService) { }

  ngOnInit() {
    //préchargement des images
    this.moovhopService.preloadImages();

    this.moovhopService.identityPicture = false;
    this.moovhopService.route = '/AGIR2024/createAccountPersonalInformations';
    this.moovhopService.currentView = "";
    this.moovhopService.isScanFinished = false;
    this.moovhopService.scanVisited = 0;
    this.moovhopService.LineChoosed = 1;
    this.moovhopService.ActionChoosed = 1;
    this.moovhopService.newerCiImageCapture = "";
    this.moovhopService.QRCodeScaned = false;
    this.moovhopService.whatSubscription = "";
    this.moovhopService.paidWithCB = false;
    this.moovhopService.priceSubscription = 0;
    this.moovhopService.textSubscription = '<p style="text-align:center;">';
    this.moovhopService.heureCB = "";
    this.moovhopService.textCB = '';
    this.moovhopService.previewImageScanId = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.moovhopService.previewImageProfile = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.moovhopService.nameUser = "";
    this.moovhopService.idUserToCheck ="";
    this.moovhopService.errorFace = false;
    this.moovhopService.errorScanId = false;
    this.moovhopService.previewImageScanIdA ="";
    this.moovhopService.previewImageScanIdB ="";
    this.moovhopService.previewImageScanIdADef ="";
    this.moovhopService.previewImageScanIdBDef ="";
    this.moovhopService.idChecks= "";
    this.moovhopService.referenceId= "";
    this.moovhopService.timeScanIdA = new Date();
    this.moovhopService.timeScanIdB = new Date();
    this.moovhopService.errorSaveIdCard = false;
    this.moovhopService.hrefSensitiveData= '';
    this.moovhopService.firstName= "";
    this.moovhopService.birthday= "";
    this.moovhopService.identityValidate = false;
    document.getElementsByTagName('body')[0].style.width = 'fit-content';
    document.getElementsByTagName('body')[0].style.height = 'fit-content';
    console.log("document.getElementsByTagName('body')[0].style.height");
    console.log(document.getElementsByTagName('body')[0].style.height);
    console.log("document.getElementsByTagName('body')[0].style.height ");
    console.log(document.getElementsByTagName('body')[0].style.height);
  }

  Choix(num : number){
    this.moovhopService.ActionChoosed = num;
  }

}
