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

  previewImageScanId: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";


  countdown: number = 5;
  imageCapture: string = "";
  isImageCaptured: boolean = false;


  override ngOnInit(): void {
    this.moovhopService.scanVisited++;
    if (this.moovhopService.scanVisited === 2) {
      this.moovhopService.isScanFinished = false;
      let img = document.getElementById("capture");
      if (img != null) {
        img.style.setProperty("clip", "rect(250px, auto, auto, auto)");
      }
    }
    else {
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
    if (this.isScanFinished && this.router.url === "/createAccountCamera") {
      // Écoute de l'événement de surveillance de la transaction Cash
      __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
      __this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
      __this.skService.addEventListener("DocumentScanning", "previewStop", this.onPreview);

      // Démarrage de la prévisualisation
      __this.skService.startDocumentPreview();

      // décompte du timer
      __this.timeoutScanner();
    } else if (!this.isScanFinished && this.router.url === "/createAccountCamera") {

      __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreview)
      __this.skService.startCameraPreview();

      __this.timeoutCamera();
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
    if (this.isScanFinished && this.router.url === "/createAccountCamera") {
      this.previewImageScanId = 'data:image/png;base64, ' + preview;
      //on récupère l'id loadingPreview dans le html et on le change à preview
      let img = document.getElementById("loadingPreview");
      if (img != null) {
        img.setAttribute("id", "preview");
      }
      this.moovhopService.previewImageScanId = this.previewImageScanId;
    } else if (!this.isScanFinished && this.router.url === "/createAccountCamera") {
      this.previewImageProfile = 'data:image/png;base64, ' + preview;
      this.moovhopService.previewImageProfile = this.previewImageProfile;
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
        if (this.router.url === "/createAccountCamera") {
          this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
          this.skService.stopDocumentPreview();
          this.router.navigate(['/createAccountScanFinish'])
          clearInterval(this.interval2);
        }
      }
    }
      , 1000);
  }

  interval3: any = null;

  timeoutCamera = () => {
    let countdown = document.getElementById("countdown");
    let counter = 0;
    this.interval3 = setInterval(() => {
      if (counter <= 5) {
        if (countdown) {
          countdown.innerHTML = "" + (5 - counter);
        }
        counter++;
      } else {
        if (this.router.url === "/createAccountCamera") {
          this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreviewStart);
          this.skService.stopCameraPreview();
          this.router.navigate(['/createAccountScanFinish'])
          clearInterval(this.interval3);
        }
      }
    }
      , 1000);
  }


  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);
    clearInterval(this.interval3);

    ___this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    ___this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.stopCameraPreview();
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCameraComponent");
    ___this.skService.removeEventListener("DocumentScanning", "previewStart", this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    ___this.skService.removeEventListener("DocumentScanning", "previewStop", this.onPreview);
    ___this.skService.stopDocumentPreview();
  }
}
