import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService as telefonicaService  } from '../../telefonica.service';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';


@Component({
  selector: 'app-face-capture',
  templateUrl: './face-capture.component.html',
  styleUrls: ['./face-capture.component.scss', '../../telefonica.component.scss']
})
export class FaceCaptureComponent extends GenericComponent implements OnInit {
  countdown: any;
  previewImageProfile: string =  "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";

  constructor(private route: Router, private service: telefonicaService, skService: SoftKioskService) {
    super(skService);
   }

  override ngOnInit(): void {
    this.service.scanVisited=1;
    
  }

  resetScan(){
    this.service.scanVisited--;
    this.route.navigate(['/ES/faceCapture']);
  }

  ngAfterViewInit(): void {
    let __this = this;
    this.previewImageProfile = this.service.previewImageProfile;
    if (this.route.url === "/ES/faceCapture") {
      __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreview)
      __this.skService.startCameraPreview();
      __this.timeoutCamera();
    }
  }

  interval2: any = null;
  timeoutCamera = () => {
    this.countdown = 8;
    this.interval2 = setInterval(() => {
      if(this.countdown == 0 && this.route.url == '/ES/faceCapture' ) {
        if (this.route.url === "/ES/faceCapture") {
          this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreview);
          this.skService.stopCameraPreview();
          this.route.navigate(['/ES/faceResult'])
          clearInterval(this.interval2);
        }
      }else{
        this.countdown = this.countdown-1;
      }
    }, 1000);
  }

  override onPreview = (e: any) => {
    switch (e.data.dataType) {
      case 'PreviewStarted':
        let n = 0;
        this.skService.addEventApplication("demoSKV2", "Preview du document réussie");
        let previewWebsocket = new WebSocket(e.data.serverUrl);
        previewWebsocket.onmessage = (preview) => {
          if(n==0){
            n++;
          }else{
            this.previewImageUpdate(preview.data);
          }
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
  };

  previewImageUpdate = (preview: any): void => {
    if (this.route.url === "/ES/faceCapture") {
      this.previewImageProfile = 'data:image/png;base64, ' + preview;
      this.service.previewImageProfile = this.previewImageProfile;
    }
  }


  ngOnDestroy(): void {
    let ___this = this;
    clearInterval(this.interval2);

    ___this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    ___this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.stopCameraPreview();
  }

}
