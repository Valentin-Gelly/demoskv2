import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../../demos/generic/generic.component';


@Component({
  selector: 'app-create-account-face-capture',
  templateUrl: './create-account-face-capture.component.html',
  styleUrls: ['./create-account-face-capture.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountFaceCaptureComponent extends GenericComponent implements OnInit {

  constructor( private moovhopService: MoovhopService, private router :Router, skService: SoftKioskService ) {
    super(skService);

   }

  interval3: any = null;
  faceCapture: any = './assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png';
  scanVisited: number = this.moovhopService.scanVisited;

  override ngOnInit(): void {
    let __this = this;
    this.moovhopService.scanVisited++;
    this.scanVisited = this.moovhopService.scanVisited;    
  }

  ngAfterViewInit(): void {
    let __this = this;
    if(this.router.url === "/AGIR2024/createAccountFaceCapture"){
      __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreview)
      __this.skService.startCameraPreview();
      __this.timeoutCamera();
    }
  }

  override onPreview = (e: any) => {
    switch (e.data.dataType) {
      case 'PreviewStarted':
        console.log("PreviewStarted");
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
        
        this.moovhopService.previewImageProfile = this.faceCapture;
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
  
  previewImageUpdate = (preview: any): void => {
    
    this.faceCapture = 'data:image/png;base64, ' + preview;
    this.moovhopService.previewImageProfile = this.faceCapture;
  }

  timeoutCamera = () => {
    let countdown = document.getElementById("countdown");
    let counter = 0;
    this.interval3 = setInterval(() => {
      if ( 0 < parseInt(countdown!.innerHTML)) {
        if (countdown) {
          countdown!.innerHTML = (parseInt(countdown!.innerHTML)-1).toString();
        }
      } else {
        if (this.router.url === "/AGIR2024/createAccountFaceCapture") {
          this.skService.stopCameraPreview();
          this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreview);

          this.rognerImageBase64(this.moovhopService.previewImageProfile, 203, 35, 248, 411, (imageRogneeBase64) => {
            let image2 = "data:image/png;base64, " + imageRogneeBase64;
            this.increaseImageSize(image2, 3)
              .then((resizedBase64) => {
                this.moovhopService.faceCapture = resizedBase64;
                this.router.navigate(['/AGIR2024/createAccountScanFinish']);
              })
              .catch((error) => {
                console.error(error);
              });
          });
          clearInterval(this.interval3);
        }
      }
    }
      , 1000);
  }


  rognerImageBase64(imageBase64: string, x: number, y: number, largeur: number, hauteur: number, callback: (imageRogneeBase64: string) => void): void {
    const image = new Image();
    image.src = imageBase64;
    let self = this;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = largeur;
      canvas.height = hauteur;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, x, y, largeur, hauteur, 0, 0, largeur, hauteur);

        const imageRogneeBase64 = canvas.toDataURL("image/png").split(',')[1];
        // Appeler la fonction de rappel avec la chaîne base64 modifiée en paramètre
        callback(imageRogneeBase64);

      }

    };

  }

  increaseImageSize(base64Image: string, scaleFactor: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = base64Image;

      img.onload = function () {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Unable to get 2D context");
          return;
        }

        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        let dataURL = canvas.toDataURL("image/png", quality);

        resolve(dataURL);
      };
    });
  }


  ngOnDestroy(): void {
    let __this = this;
    __this.skService.stopCameraPreview();
    __this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreview)
    __this.skService.addEventListener("CameraShooting", "previewStop", this.onPreview);
  }

}
