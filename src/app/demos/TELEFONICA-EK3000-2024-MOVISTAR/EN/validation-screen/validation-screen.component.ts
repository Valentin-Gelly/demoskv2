import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService as telefonica } from '../../telefonica.service';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';


@Component({
  selector: 'app-validation-screen',
  templateUrl: './validation-screen.component.html',
  styleUrls: ['./validation-screen.component.scss', '../../telefonica.component.scss']
})

export class EnValidationScreenComponent extends GenericComponent {



  constructor(private route: Router, private telefonicaService: telefonica, private softKioskService: SoftKioskService) {
    super(softKioskService);
  }


  errorFace = this.telefonicaService.errorFace;
  errorScanId = this.telefonicaService.errorScanId;
  scanVisited = this.telefonicaService.scanVisited;
  
  timeout :any;

  override ngOnInit(): void {

    console.log("errorFace: " + this.errorFace);
    console.log("errorScanId: " + this.errorScanId);
    console.log("scanVisited: " + this.scanVisited);

    

    if (this.telefonicaService.errorFace == true && this.telefonicaService.scanVisited == 1) {
      this.timeout = setTimeout(() => {
        if (this.route.url == '/EN/validationScreen') {
          this.telefonicaService.scanVisited = 0;
          this.route.navigate(['/EN/faceCapture']);
          this.telefonicaService.previewImageProfile = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdBDef = "";
          this.telefonicaService.previewImageScanIdADef = "";
        }
      }, 5000);


    }else if (this.telefonicaService.errorFace == false  && this.telefonicaService.scanVisited == 1) {
      this.createIdCheck();

    }else if (this.telefonicaService.errorScanId && this.telefonicaService.scanVisited == 3 || this.telefonicaService.errorScanId && this.telefonicaService.scanVisited == 2){
      this.timeout = setTimeout(() => {
        if (this.route.url == '/EN/validationScreen') {
          this.telefonicaService.scanVisited = 1;
          this.route.navigate(['/EN/identityValidation']);

        }
      }, 5000);
    }else if (!this.telefonicaService.errorScanId && this.telefonicaService.scanVisited == 3 ){
      this.timeout = setTimeout(() => {
        if (this.route.url == '/EN/validationScreen') {
          this.route.navigate(['/EN/informationConsent']);

        }
      }, 5000);
    }else if (!this.telefonicaService.errorScanId && this.telefonicaService.scanVisited == 2){
      this.timeout = setTimeout(() => {
        if (this.route.url == '/EN/validationScreen') {
          this.route.navigate(['/EN/scanDocumento']);
          this.telefonicaService.previewImageProfile = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
          this.telefonicaService.previewImageScanIdBDef = "";
          this.telefonicaService.previewImageScanIdADef = "";

        }
      }, 5000);
    }
  }

  createIdCheck(nbTry: number = 1) {
    let referenceId = new Date().toJSON();

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==");
    var raw = JSON.stringify({
      "referenceId": referenceId
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect | undefined
    };

    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.telefonicaService.idUserToCheck+"/idchecks", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.httpStatus == "409") {
          console.log(nbTry);
          let nbTry2 = nbTry + 1;
          this.createIdCheck(nbTry2);
        }else{
          setTimeout(() => {
            console.log("create id check");
            this.telefonicaService.idChecks = data.id;
            this.telefonicaService.referenceId = referenceId;
            this.route.navigate(['/EN/registryDocument']);
          }, 5000);
          
        }
      })
      .catch(error => {
        console.error('error : ', error);
        let nbTry2 = nbTry + 1;
        this.createIdCheck(nbTry2);
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

}
