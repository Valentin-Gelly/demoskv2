import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-create-account-face-capture',
  templateUrl: './create-account-face-capture.component.html',
  styleUrls: [
    './create-account-face-capture.component.scss',
    '../../moovhop.component.scss',
  ],
})
export class CreateAccountFaceCaptureComponent
  extends GenericComponent
  implements OnInit
{
  constructor(
    private moovhopService: MoovhopService,
    private router: Router,
    skService: SoftKioskService
  ) {
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
    if (this.router.url === '/EK80002024AGIR/createAccountFaceCapture') {
      __this.skService.addEventListener(
        'CameraShooting',
        'previewStart',
        this.onPreview
      );
      __this.skService.startCameraPreview();
      __this.timeoutCamera();
    }
  }

  override onPreview = (e: any) => {
    switch (e.data.dataType) {
      case 'PreviewStarted':
        console.log('PreviewStarted');
        this.skService.addEventApplication(
          'demoSKV2',
          'Preview du document réussie'
        );
        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);
        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          // appel à la fonction de traitement de flux vidéo
          this.previewImageUpdate(preview.data);
        };
        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {};
        break;
      case 'PreviewStopped':
        this.moovhopService.previewImageProfile = this.faceCapture;
        break;
      case 'PreviewStartError':
        /**
         * Evènement d'échec du démarrage de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de démarrage de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case 'None':
            break;
          case 'Disconnected':
            break;
          case 'SignalingError':
            break;
          case 'SignalingState':
            break;
        }
        break;
      default:
        console.error(e.data.code + ': ' + e.data.description);
        break;
    }
  };

  previewImageUpdate = (preview: any): void => {
    this.faceCapture = 'data:image/png;base64, ' + preview;
    this.moovhopService.previewImageProfile = this.faceCapture;
    this.moovhopService.faceCapture = this.faceCapture;
  };

  timeoutCamera = () => {
    let countdown = document.getElementById('countdown');
    let counter = 0;
    this.interval3 = setInterval(() => {
      if (0 < parseInt(countdown!.innerHTML)) {
        if (countdown) {
          countdown!.innerHTML = (
            parseInt(countdown!.innerHTML) - 1
          ).toString();
        }
      } else {
        if (this.router.url === '/EK80002024AGIR/createAccountFaceCapture') {
          this.skService.stopCameraPreview();
          this.skService.removeEventListener(
            'CameraShooting',
            'previewStart',
            this.onPreview
          );
          this.moovhopService.faceCapture = this.moovhopService.previewImageProfile;

         this.router.navigate(['/EK80002024AGIR/createAccountScanFinish']);
          clearInterval(this.interval3);
        }
      }
    }, 1000);
  };


 

  ngOnDestroy(): void {
    let __this = this;
    __this.skService.stopCameraPreview();
    __this.skService.removeEventListener(
      'CameraShooting',
      'previewStart',
      this.onPreview
    );
    __this.skService.addEventListener(
      'CameraShooting',
      'previewStop',
      this.onPreview
    );
  }
}
