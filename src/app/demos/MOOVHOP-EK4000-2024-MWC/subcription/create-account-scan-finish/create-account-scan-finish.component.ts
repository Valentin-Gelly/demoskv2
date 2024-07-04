import { Component } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../../demos/generic/generic.component';


@Component({
  selector: 'app-create-account-scan-finish',
  templateUrl: './create-account-scan-finish.component.html',
  styleUrls: ['./create-account-scan-finish.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountScanFinishComponent extends GenericComponent {

  constructor(private moovhopService: MoovhopService, private router: Router, skService: SoftKioskService) {
    super(skService);
  }
  route : any = this.moovhopService.route;
  isScanFinished : boolean = false;

  previewImageScanId = this.moovhopService.previewImageScanId;
  previewImageProfile = this.moovhopService.previewImageProfile;

  override ngOnInit() {
    this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
    console.log(this.route);
    this.isScanFinished = this.moovhopService.isScanFinished;
    let confirmButton = document.getElementById("confirmButton");

    
    if (confirmButton!=null) {
      console.log(confirmButton);
      confirmButton.addEventListener("click", () => {
          console.log("testIf");
          this.route = '/createAccountHello';
          this.moovhopService.route = "/createAccountHello"
        
      });
    }

    if(this.moovhopService.scanVisited === 2){
      let img = document.getElementById("capture");
      if(img!=null){
        img.style.setProperty("clip", "rect(250px, auto, auto, auto)");
      }
    }
    else{
      this.skService.captureImageDocument();
    }

  }

  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        this.previewImageScanId = 'data:image/png;base64, '  + this.skService.lastCaptureImageRaw();
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  resetVisits(){
    this.moovhopService.scanVisited -= 1;
  }

  ngOnDestroy(): void {
    this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
  }
}
