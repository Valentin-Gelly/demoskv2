import { Component } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-scan-finish',
  templateUrl: './create-account-scan-finish.component.html',
  styleUrls: ['./create-account-scan-finish.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountScanFinishComponent {

  constructor(private moovhopService: MoovhopService, private router: Router) { }
  route : any = this.moovhopService.route;
  isScanFinished : boolean = this.moovhopService.isScanFinished;

  previewImageScanId = this.moovhopService.previewImageScanId;
  previewImageProfile = this.moovhopService.previewImageProfile;

  ngOnInit() {
    console.log(this.route);
    this.isScanFinished = this.moovhopService.isScanFinished;
    let confirmButton = document.getElementById("confirmButton");

    
    if (confirmButton!=null) {
      console.log(confirmButton);
      confirmButton.addEventListener("click", () => {
          this.route = '/RNTP2023/createAccountHello8000';
          this.moovhopService.route = "/RNTP2023/createAccountHello8000";
      });
    }
  }

  resetVisits(){
    this.moovhopService.scanVisited -= 1;
    this.moovhopService.navigateAfterDelay(0, "/RNTP2023/createAccountCamera8000");
  }
}
