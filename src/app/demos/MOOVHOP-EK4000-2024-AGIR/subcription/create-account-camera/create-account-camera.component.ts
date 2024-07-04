import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';

@Component({
  selector: 'app-create-account-camera',
  templateUrl: './create-account-camera.component.html',
  styleUrls: ['./create-account-camera.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountCameraComponent extends GenericComponent implements OnInit, AfterViewInit {

  constructor(private moovhopService: MoovhopService, private router: Router, skService: SoftKioskService) {
    super(skService);
  }
  interval: any = null;
  identityPicture: any = this.moovhopService.identityPicture;
  route: any = this.moovhopService.route;
  isScanFinished: boolean = false;
  
  previewImageScanIdA: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  previewImageScanIdB: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";


  countdown: number = 5;
  imageCapture: string = "";
  isImageCaptured: boolean = false;

  scanVisited: number = this.moovhopService.scanVisited;


  override ngOnInit(): void {
    if (this.moovhopService.documentSelected=="passeport" || this.moovhopService.documentSelected=="oldIdCard") {
      this.moovhopService.scanVisited++;
    }
    this.moovhopService.scanVisited++;
    console.log(this.moovhopService.scanVisited);
    this.scanVisited = this.moovhopService.scanVisited;
    
    if (this.moovhopService.scanVisited === 2) {
      this.moovhopService.isScanFinished = false;

    }else {
      this.moovhopService.isScanFinished = true;
    }
    this.isScanFinished = this.moovhopService.isScanFinished;
    console.log(this.route);
  }



  ngAfterViewInit(): void {
    /**
     * Déclenchement de l'appel à DocumentScanning.preview()
      */
    let __this = this;
    if (this.router.url === "/AGIR2024/createAccountCamera") {
      // Écoute de l'événement de surveillance de la transaction Cash
      __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
      __this.skService.addEventListener("DocumentScanning", "previewStop", this.onPreview);
      __this.skService.addEventListener("DocumentScanning", "imageCapture", this.onCapture);

      // Démarrage de la prévisualisation
      __this.skService.startDocumentPreview();

      // décompte du timer
      __this.timeoutScanner();
    }

  }

  override onPreview = (e: any) => {
    switch (e.data.dataType) {
      case 'PreviewStarted':
        this.skService.addEventApplication("demoSKV2", "Preview du document réussie");
        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);
        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          // appel à la fonction de traitement de flux vidéo
          this.previewImageUpdate(preview.data);
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {
        };
        break;
      case 'PreviewStopped':
        setTimeout(() => {
          this.skService.addEventApplication("demoSKV2", "arrêt prévisualisation du document");
          this.skService.addEventApplication("demoSKV2", "capture du document");
          this.skService.removeEventListener("DocumentScanning", "previewStop", this.onPreview);
          if(this.scanVisited === 1){
          this.moovhopService.timeScanIdA = new Date();
          }else if (this.scanVisited === 2){
            this.moovhopService.timeScanIdB = new Date();
          }
          this.skService.captureImageDocument();
        }, 500);
        break;
      case "PreviewStartError":
        /**
         * Evènement d'échec du démarrage de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de démarrage de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "None":
            break;
          case "Disconnected":
            break;
          case "SignalingError":
            break;
          case "SignalingState":
            break;
        }
        break;
      default:
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  previewImageUpdate = (preview: any): void => {
    if (this.router.url === "/AGIR2024/createAccountCamera") {
      if(this.scanVisited === 1){
        this.previewImageScanIdA = 'data:image/png;base64, ' + preview;
        this.moovhopService.previewImageScanIdA = this.previewImageScanIdA;
      }else if (this.scanVisited === 2){
        this.previewImageScanIdB = 'data:image/png;base64, ' + preview;
        this.moovhopService.previewImageScanIdB = this.previewImageScanIdB;
      }
      
      
    } 
  }
  interval2: any = null;
  timeoutScanner = () => {
    let countdown = document.getElementById("countdown");
    let counter = 0;
    this.interval2 = setInterval(() => {
      if (counter <= 5) {
        if (countdown) {
          countdown.innerHTML = "" + (5 - counter);
        }
        counter++;
      } else {
        if (this.router.url === "/AGIR2024/createAccountCamera") {
          this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
          this.skService.stopDocumentPreview();
          console.log("fin de prévisualisation vidéo");
          clearInterval(this.interval2);
        }
      }
    }
      , 1000);
  }
  

  onCapture = (e: any) => {
    console.log("Capture Image");
    
    console.log(e.data.dataType);
    
    switch (e.data.dataType) {
      case 'ImageCaptured':
        if (this.router.url === "/AGIR2024/createAccountCamera") {
          this.imageCapture = 'data:image/png;base64, ' + this.skService.lastCaptureImageRaw();
          this.moovhopService.previewImageScanId = this.imageCapture;
          if(this.scanVisited === 1){
            console.log("Capture Image 1");
            this.moovhopService.timeScanIdA = new Date();
            this.moovhopService.previewImageScanIdADef= this.imageCapture;
            console.log(this.moovhopService.previewImageScanIdADef);
          }
          if(this.scanVisited === 2){
            console.log("Capture Image 2");
            this.moovhopService.timeScanIdB = new Date();
            this.moovhopService.previewImageScanIdBDef= this.imageCapture;
            console.log(this.moovhopService.previewImageScanIdBDef);
          }
          this.isImageCaptured = true;
          this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onCapture)
          this.router.navigate(['/AGIR2024/createAccountScanFinish'])
        }
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }


  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);

    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCameraComponent");
    ___this.skService.stopDocumentPreview();

    ___this.skService.removeEventListener("DocumentScanning", "previewStart", this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    ___this.skService.removeEventListener("DocumentScanning", "previewStop", this.onPreview);
  }
}
