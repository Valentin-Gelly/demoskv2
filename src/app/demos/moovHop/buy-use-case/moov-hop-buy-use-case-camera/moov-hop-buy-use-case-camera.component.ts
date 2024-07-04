import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
@Component({
  selector: 'app-moov-hop-buy-use-case-camera',
  templateUrl: './moov-hop-buy-use-case-camera.component.html',
  styleUrls: ['./moov-hop-buy-use-case-camera.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseCameraComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  previewImage: string = "";
  errorPopup: boolean = false;
  constructor(skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseCameraComponent");
    let countdown = document.getElementById("countdown");
    //let _this = this;
    let counter = 0;
    const interval = setInterval(() => {
      if (counter <= 5) {
        if (countdown){
          countdown.innerHTML = "" + (5-counter);
        }
        counter++;
        console.log("test");
        
      } else {
        
        
        
      }
    }, 1000);
  }

  ngAfterViewInit(): void {
    let __this = this;
    __this.skService.addEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    __this.skService.startCameraPreview();
  }

  override onPreviewStart = (e: any) => {
    switch (e.data.dataType) {
      case "PreviewStarted":
        /**
         * Evènementde succès du démarrage de la prévisualisation
         * Champs associés:
         * @param {string} e.data.serverUrl - Adresse du serveur Websocket  de prévisualisation
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */

        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);

        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          this.previewImageUpdate(preview.data);        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = () => {
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
    }
  }

  previewImageUpdate = (preview: any): void => {
    this.previewImage = 'data:image/png;base64, ' + preview;
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.removeEventListener("CameraShooting", "previewStart", this.onPreviewStart)
    ___this.skService.addEventListener("CameraShooting", "previewStop", this.onPreviewStop);
    ___this.skService.addEventApplication("demoSKV2", "fin de prévisualisation vidéo");
    ___this.skService.stopCameraPreview();
    ___this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopBuyUseCaseCameraComponent");

  }

}
