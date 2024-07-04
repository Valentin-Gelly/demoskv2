import { AfterViewInit, Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovhopService } from '../../moovhop.service';
@Component({
  selector: 'app-create-account-proof-address',
  templateUrl: './create-account-proof-address.component.html',
  styleUrls: ['./create-account-proof-address.component.scss', '../../moovhop.component.scss']
})

export class CreateAccountProofAddressComponent extends GenericComponent implements OnInit, AfterViewInit{
  
  constructor(private router: Router,skService: SoftKioskService, private moovhopService: MoovhopService) {
    super(skService);
  }
  
  previewImage: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  countdown: number = 5;

  ngAfterViewInit(){
    let ValidateButton = document.getElementById("ValidateButton");
    let ScanButton = document.getElementById("ScanButton");
    let ScanAdded = document.getElementById("textAdd");
    if(ValidateButton!=undefined && ScanAdded!=undefined && ScanButton!=undefined){
      ValidateButton.style.opacity="0";
      ScanAdded.style.opacity="0";
      ScanButton.style.opacity="0";
    } 
      /**
     * Déclenchement de l'appel à DocumentScanning.preview() et traitement vidéo pendant 5 sec puis capture
      */
    let __this = this;
    // Écoute de l'événement de surveillance de la transaction Cash
    __this.skService.addEventListener("DocumentScanning", "previewStart", this.onPreview);
    
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
        break;
      default:
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }


  previewImageUpdate = (preview: any): void => {
    this.previewImage = 'data:image/png;base64, ' + preview;
  }
  timeOut: any;

  timeoutScanner = () => {
    this.timeOut = setTimeout(() => {
      if (this.router.url === "/createAccountProofAddress") {
        this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
        this.skService.stopDocumentPreview();
        let ValidateButton = document.getElementById("ValidateButton");
        let ScanButton = document.getElementById("ScanButton");
        let ScanAdded = document.getElementById("textAdd");
        if(ValidateButton!=undefined && ScanAdded!=undefined && ScanButton!=undefined){
          ValidateButton.style.opacity="1";
          ScanAdded.style.opacity="1";
          ScanButton.style.opacity="1";
        } 
      }
    }, 5000);
  }


  ngOnDestroy(){
    this.skService.removeEventListener('DocumentScanning', 'previewStart', this.onPreview);
    this.skService.stopDocumentPreview();
    clearTimeout(this.timeOut);
  }
}
