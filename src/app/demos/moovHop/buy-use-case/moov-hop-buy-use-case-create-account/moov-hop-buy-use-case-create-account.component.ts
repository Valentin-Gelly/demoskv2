import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-case-create-account',
  templateUrl: './moov-hop-buy-use-case-create-account.component.html',
  styleUrls: ['./moov-hop-buy-use-case-create-account.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyCaseCreateAccountComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  router: any;
  imageCamera: string = "";
  imageCameraCaptured: string = "";
  countdown: number = 5;
  constructor(skService: SoftKioskService, moovhopService: MoovopService, router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let __this = this;

    __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreviewStart);
    __this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    __this.skService.addEventListener("CameraShooting", "imageCapture", this.onImageCapture);
    __this.skService.startCameraPreview();

    // getion du timer et du désabonnement de preview
    __this.timeoutCamera();
  }

  override onPreviewStart = (e: any) => {
    console.log("Événement previewStart");
    switch (e.data.dataType) {
      case "PreviewStarted":
        /**
         * Evènementde succès du démarrage de la prévisualisation
         * Champs associés:
         * @param {string} e.data.serverUrl - Adresse du serveur Websocket  de prévisualisation
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log("DataType PreviewStarted");
        console.log("Lancement de la prévisualisation réussi");

        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);

        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          this.previewCameraImageUpdate(preview);
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {
          console.log("Fermeture du websocket");
        };
        break;
      case "PreviewStartError":
        /**
         * Evènement d'échec du démarrage de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de démarrage de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log("DataType PreviewStartError");
        switch (e.data.code) {
          case "None":
            console.log("Code None - Aucune erreur");
            break;
          case "Disconnected":
            console.log("Code Disconnected - Le périphérique est déconnecté");
            break;
          case "SignalingError":
            console.log("Code SignalingError - Erreur de liaison avec le service signing");
            break;
          case "SignalingState":
            console.log("Code SignalingState - L'etat du service Signing ne permet pas d'executer de commandes");
            break;
        }
      break;
    }
  }

  override onPreviewStop = (e: any) => {
    console.log("Événement previewStop");
    switch (e.data.dataType) {
      case "PreviewStopped":
        /**
         * Evènement de succès de l'arrêt de la prévisualisation
         * Champs associés:
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log("DataType PreviewStopped");
        console.log("capture de l'image");
        setTimeout(() => {
          this.skService.captureCameraImage();
        }, 500);
        this.previewCameraImageUpdate(this.skService.lastCameraCaptureRaw());
        break;
      case "PreviewStopError":
        /**
         * Evènement d'échec de l'arrêt de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande d'arrêt de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log("DataType PreviewStopError");
        switch (e.data.code) {
          case "None":
            console.log("Code None - Aucune erreur");
            break;
          case "Disconnected":
            console.log("Code Disconnected - Le périphérique est déconnecté");
            break;
          case "SignalingError":
            console.log("Code SignalingError - Erreur de liaison avec le service signing");
            break;
          case "SignalingState":
            console.log("Code SignalingState - L'etat du service Signing ne permet pas d'executer de commandes");
            break;
        }
        break;
    }
  }

  timeoutCamera = () => {
    // décompte du timer
    let interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.skService.removeEventListener('CameraShooting', 'previewStart', this.onPreviewStart);
        this.skService.stopCameraPreview();
      }
    }, 1000);
  }

  previewCameraImageUpdate = (preview: any): void => {
    this.imageCamera = 'data:image/png;base64, ' + preview.data;
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", "fin d'écoute de l'event previewStop de la callback onPreviewStop, composant: MoovHopBuyCaseCreateAccountComponent");
    ___this.skService.removeEventListener('DocumentScanning', 'previewStop', this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "captureImage", this.onImageCapture);
  }

}
