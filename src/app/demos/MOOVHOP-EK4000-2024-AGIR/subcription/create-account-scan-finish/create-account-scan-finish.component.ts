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
  
  scanVisited = this.moovhopService.scanVisited;

  previewImageScanIdA = this.moovhopService.previewImageScanIdADef;
  previewImageScanIdB = this.moovhopService.previewImageScanIdBDef;
  previewImageProfile = this.moovhopService.faceCapture;

  override ngOnInit() {
    this.previewImageScanIdA = this.moovhopService.previewImageScanIdADef;
    this.previewImageScanIdB = this.moovhopService.previewImageScanIdBDef;
    this.previewImageProfile = this.moovhopService.faceCapture;
  }



  nextStep() {
    if(this.scanVisited==1){
      this.router.navigate(['/AGIR2024/createAccountCamera']);
    }else if(this.scanVisited==2){
      document.getElementById("loadingLogo")!.style.display = "block";
      document.getElementById("loadingSection")!.style.display = "block";
      this.createUser();
    }else if(this.scanVisited==3){
      document.getElementById("loadingLogo")!.style.display = "block";
      document.getElementById("loadingSection")!.style.display = "block";
      this.addFaceUser(this.moovhopService.faceCapture);
    }
  }



  resetVisits(){
    if((this.moovhopService.documentSelected=="passeport" || this.moovhopService.documentSelected =="oldIdCard") && this.moovhopService.scanVisited==2){
    this.moovhopService.scanVisited -= 2;
    }else{
      this.moovhopService.scanVisited -= 1;
    }
    if (this.moovhopService.scanVisited == 1 || this.moovhopService.scanVisited == 0) {
      this.router.navigate(['/AGIR2024/createAccountCamera']);
    }else if (this.moovhopService.scanVisited == 2) {
      this.router.navigate(['/AGIR2024/createAccountFaceCapture']);
    }
  }

  ngOnDestroy(): void {
    this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
  }

  createUser() {
    let referenceId = new Date().toJSON();
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "userId": referenceId
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        this.moovhopService.idUserToCheck = data.id;
        this.createIdCheck();
      })
      .catch((error) => {
      })
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

    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/"+this.moovhopService.idUserToCheck+"/idchecks", requestOptions)
      .then(response => response.json())
      .then((data) => {
        if (data.httpStatus == "409") {
          let nbTry2 = nbTry + 1;
          this.createIdCheck(nbTry2);
        }else{
          this.moovhopService.idChecks = data.id;
          this.addDocuments();
        }
      })
      .catch(error => {
        console.error('error : ', error);
        let nbTry2 = nbTry + 1;
        this.createIdCheck(nbTry2);
      });
  }



  

  addFaceUser(imageRogneeBase64: string) {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/face/samples", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
      body: JSON.stringify({
        "data": imageRogneeBase64.replace("data:image/png;base64,", ""),
        "format": "JPG"
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.httpStatus === 400) {
          if (this.router.url == "/AGIR2024/createAccountScanFinish") {
            this.moovhopService.errorFace = true;
            this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
          }
        } else if (data.items[0].usable == false) {
          if (this.router.url == "/AGIR2024/createAccountScanFinish") {
            this.moovhopService.errorFace = true;
            this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
          }
        } else {
          if (this.router.url == "/AGIR2024/createAccountScanFinish") {
            this.moovhopService.errorFace = false;
            this.verifyFace();
          }
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  verifyFace() {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idchecks/" + this.moovhopService.idChecks + "/evaluation?evaluationPolicyName=policy-2",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==",
      }
    })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.results.items[0].result === "MATCH") {
        this.moovhopService.identityValidate = true;
        this.router.navigate(['/AGIR2024/createAccountHello']);
      } else {
        this.moovhopService.identityValidate = false;
        this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    })
  }


  addDocuments() {
    var myHeaders = new Headers();
    
    if (this.moovhopService.documentSelected == "passeport" || this.moovhopService.documentSelected == "oldIdCard") {
      fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idchecks/" + this.moovhopService.idChecks + "/documents?isAsync=false",
        {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
          },
          body: JSON.stringify({
            "captured": this.moovhopService.timeScanIdB.toISOString(),
            "clientCapture": {
              "images": [
                {
                  "captured": this.moovhopService.timeScanIdB.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.moovhopService.previewImageScanIdBDef.replace("data:image/png;base64, ", "")
                  },
                  "subtype": "PROCESSED",
                  "type": "FRONT"
                } 
              ]
            }
          })
        })
        .then(response => response.json())
        .then((data) => {
          if (data.processingStatus == "FAILED") {
            this.moovhopService.errorSaveIdCard = true;
            setTimeout(() => {
              this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
              this.moovhopService.previewImageScanIdBDef = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdADef = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdA = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdB = "./assets/loadingPreview.png"
            }, 5000);
          } else {
            this.moovhopService.errorSaveIdCard = false;
            this.moovhopService.hrefSensitiveData = data.serverProcessed.ocrData.sensitiveData.href
            this.getAllInformation();
          }
          
          
        })
        .catch(error => {
          console.error('error', error);
          this.moovhopService.scanVisited = 0;
          document.getElementById("error")!.style.setProperty("display", "block");
          this.moovhopService.errorSaveIdCard = true;

          setTimeout(() => {
            this.router.navigate(['/AGIR2024/createAccountMenu']);
            this.moovhopService.previewImageScanIdBDef = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdADef = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdA = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdB = "./assets/loadingPreview.png"

          }, 5000);
        }
        );

    }
    else {  
      fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.moovhopService.idUserToCheck + "/idchecks/" + this.moovhopService.idChecks + "/documents?isAsync=false",
        {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
          },
          body: JSON.stringify({
            "captured": this.moovhopService.timeScanIdA.toISOString(),
            "clientCapture": {
              "images": [
                {
                  "captured": this.moovhopService.timeScanIdA.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.moovhopService.previewImageScanIdADef.replace("data:image/png;base64, ", "")
                  },
                  "subtype": "PROCESSED",
                  "type": "FRONT"
                },
                {
                  "captured": this.moovhopService.timeScanIdB.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.moovhopService.previewImageScanIdBDef.replace("data:image/png;base64, ", "")
                  },
                  "subtype": "PROCESSED",
                  "type": "BACK"
                }
              ]
            }
          })
        })
        .then(response => response.json())
        .then((data) => {
          
          if (data.processingStatus == "FAILED") {
            this.moovhopService.errorSaveIdCard = true;
            setTimeout(() => {
              this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
              this.moovhopService.previewImageScanIdBDef = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdADef = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdA = "./assets/loadingPreview.png"
              this.moovhopService.previewImageScanIdB = "./assets/loadingPreview.png"
            }, 5000);

          } else {
            this.moovhopService.errorSaveIdCard = false;
            this.moovhopService.hrefSensitiveData = data.serverProcessed.ocrData.sensitiveData.href
            console.log("add id card");
            this.getAllInformation();
          }
        })
        .catch(error => {
          console.error('error', error);
          this.moovhopService.scanVisited = 0;
          document.getElementById("error")!.style.setProperty("display", "block");
          this.moovhopService.errorSaveIdCard = true;
          setTimeout(() => {
            this.router.navigate(['/AGIR2024/createAccountMenu']);
            this.moovhopService.previewImageScanIdBDef = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdADef = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdA = "./assets/loadingPreview.png"
            this.moovhopService.previewImageScanIdB = "./assets/loadingPreview.png"

          }, 5000);
        }
        );
    }
  }


  getAllInformation() {
    fetch("https://cors.18.175.2.71.sslip.io/" + this.moovhopService.hrefSensitiveData,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==",
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.mrz != undefined) {
          for (let key in data.mrz) {
            if (data.mrz.hasOwnProperty(key)) {
              let element = data.mrz[key];            
              switch (element.name) {
                case "Surname":
                  let surname = element.value.split(" ");
                  this.moovhopService.firstName = surname[0];
                  if (surname.length > 1) {
                    this.moovhopService.firstName += surname[1];
                  }
                  break;
                case "Given Names":
                  this.moovhopService.nameUser = element.value;
                  break;
                case "Date of Birth":
                  this.moovhopService.birthday = element.value;
                  break;
                default:
                  break;
              }
            }
          }
        }
        this.router.navigate(['/AGIR2024/createAccountValidationScreen']);
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  

}
