import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovopService } from '../../moovHop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-hop-buy-use-case-scan-newer-identity-two-progressing',
  templateUrl: './moov-hop-buy-use-case-scan-newer-identity-two-progressing.component.html',
  styleUrls: ['./moov-hop-buy-use-case-scan-newer-identity-two-progressing.component.scss', '../../moovHop.scss']
})
export class MoovHopBuyUseCaseScanNewerIdentityTwoProgressingComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  previewImage: string = "";
  countdown: number = 5;
  isImageCaptured: boolean = false;
  constructor(skService: SoftKioskService, private moovHopService: MoovopService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant MoovHopBuyUseCaseScanNewerIdentityCardScanProgressingComponent");
  }

  ngAfterViewInit(): void {
    let __this = this;
    // Écoute de l'événement de surveillance de la transaction Cash
    __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
    __this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    __this.skService.addEventListener("DocumentScanning", "previewStop", this.onPreview);
    // Démarrage de la prévisualisation
    __this.skService.startDocumentPreview();
    // décompte du timer
    __this.timeoutScanner();
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
      default:
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        this.isImageCaptured = true;
        setTimeout(() => {
          this.moovHopService.newerCiImageCaptureTwo = this.skService.lastCaptureImageRaw();
        }, 500);
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("moovHopNav", {
          detail: {
            "delay": 2000,
            "goTo": "/moovHopBuyUseCaseNewerCIScanFinished"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  previewImageUpdate = (preview: any): void => {
    this.previewImage = 'data:image/png;base64, ' + preview;
  }

  timeoutScanner = () => {
    let intervalScanner = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
        this.skService.stopDocumentPreview();
        clearInterval(intervalScanner);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    let ___this = this;
    ___this.skService.addEventApplication("demoSKV2", "fin d'écoute de l'event previewStop de la callback onPreview, composant: MoovHopBuyUseCaseScanNewerIdentityCardComponent");
    ___this.skService.removeEventListener('DocumentScanning', 'previewStop', this.onPreview);
    ___this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture);
  }

}
