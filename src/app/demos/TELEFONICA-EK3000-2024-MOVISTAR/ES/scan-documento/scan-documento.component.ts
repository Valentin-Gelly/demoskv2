import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService as telefonicaService } from '../../telefonica.service';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';

@Component({
  selector: 'app-scan-documento',
  templateUrl: './scan-documento.component.html',
  styleUrls: ['./scan-documento.component.scss', '../../telefonica.component.scss', '../face-result/face-result.component.scss']
})
export class ScanDocumentoComponent extends GenericComponent {
  countdown: any;

  previewImageScanIdA:string = './assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png'
  previewImageScanIdB:string = './assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png'

  constructor(private router: Router, private telefonicaService: telefonicaService, skService: SoftKioskService) {
    super(skService);
  }

 
  interval: any;

  scanVisited: number = this.telefonicaService.scanVisited;

  override ngOnInit() {


  }

  ngAfterViewInit(): void {

    this.previewImageScanIdA = this.telefonicaService.previewImageScanIdA;
    this.previewImageScanIdB = this.telefonicaService.previewImageScanIdB;
    /**
         * Déclenchement de l'appel à DocumentScanning.preview()
          */
    this.telefonicaService.scanVisited++;
    this.scanVisited++;
    let __this = this;
    console.log("scanVisited : ", this.scanVisited);

    __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
    __this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture);
    __this.skService.addEventListener("DocumentScanning", "previewStop", this.onPreview);

    // Démarrage de la prévisualisation
    __this.skService.startDocumentPreview();

    // décompte du timer
    __this.timeoutScanner();
  }


  override onPreview = (e: any) => {
    
    switch (e.data.dataType) {
      case 'PreviewStarted':
        let n=0;
        this.skService.addEventApplication("demoSKV2", "Preview du document réussie");
        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);
        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          if(n==0){
            n++;
          }else{
            // appel à la fonction de traitement de flux vidéo
            this.previewImageUpdate(preview.data);
          }
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {
        };
        break;
      case 'PreviewStopped':
        console.log("PreviewStopped");
        this.skService.removeEventListener("DocumentScanning", 'previewStop', this.onPreview);
        this.skService.addEventApplication("demoSKV2", "arrêt prévisualisation du document");
        this.skService.addEventApplication("demoSKV2", "capture du document");

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
  };

  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':

        if (this.router.url === "/ES/scanDocumento" && this.telefonicaService.scanVisited === 1) {
          setTimeout(() => {
            this.telefonicaService.previewImageProfile = this.skService.lastCaptureImageRaw();
          }, 500);
        } else if (this.telefonicaService.scanVisited === 2 && this.router.url === "/ES/cameraIdentification") {
          setTimeout(() => {
            console.log("capture document A");
            this.telefonicaService.timeScanIdA = new Date();
            this.telefonicaService.previewImageScanIdADef = this.skService.lastCaptureImageRaw();
          }, 500);

        } else if (this.telefonicaService.scanVisited === 3 && this.router.url === "/ES/cameraIdentification") {
          setTimeout(() => {
            console.log("capture document B");
            this.telefonicaService.timeScanIdB = new Date();
            this.telefonicaService.previewImageScanIdBDef = this.skService.lastCaptureImageRaw();
          }, 500);
        }

        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }

  }

  previewImageUpdate = (preview: any): void => {
    if (this.telefonicaService.scanVisited === 2 && this.router.url === "/ES/scanDocumento") {
      this.previewImageScanIdA = 'data:image/png;base64, ' + preview;
      this.telefonicaService.previewImageScanIdA = this.previewImageScanIdA;
    } else if (this.telefonicaService.scanVisited === 3 && this.router.url === "/ES/scanDocumento") {
      this.previewImageScanIdB = 'data:image/png;base64, ' + preview;
      this.telefonicaService.previewImageScanIdB = this.previewImageScanIdB;
    }
  }


  interval2: any = null;

  timeoutScanner = () => {
    this.countdown = 7;
    console.log("timeoutScanner");
    this.interval2 = setInterval(() => {
      if (this.countdown != 0) {
        if (this.countdown) {
          this.countdown--;
        }
      } else {
        if (this.router.url === "/ES/scanDocumento") {
          this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
          this.skService.stopDocumentPreview();
          this.router.navigate(['/ES/faceResult']);
        }
      }
    }
      , 1000);
  }

  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);
    clearInterval(this.interval);
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCameraComponent");
    ___this.skService.removeEventListener("DocumentScanning", "previewStart", this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    ___this.skService.removeEventListener("DocumentScanning", "previewStop", this.onPreview);
    ___this.skService.stopDocumentPreview();
    
  }

}
