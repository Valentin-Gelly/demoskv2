import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService as telefonicaService } from '../../telefonica.service';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-face-result',
  templateUrl: './face-result.component.html',
  styleUrls: ['./face-result.component.scss', '../../telefonica.component.scss']
})
export class FaceResultComponent extends GenericComponent {

  profileImage: string = this.telefonicaService.previewImageProfile;
  previewImageScanIdA = this.telefonicaService.previewImageScanIdA;
  previewImageScanIdB = this.telefonicaService.previewImageScanIdB;
  previewImageProfile = this.telefonicaService.previewImageProfile;
  imgScanIdA = this.previewImageScanIdA;
  imgScanIdB = this.previewImageScanIdB;
  scanVisited: number = this.telefonicaService.scanVisited;
  documentName: string = "";


  constructor(private router: Router, private telefonicaService: telefonicaService, skService: SoftKioskService) {
    super(skService);
  }


  resetScan() {
    if (this.scanVisited == 1) {
      this.router.navigate(["/ES/faceCapture"]);
    } else if (this.scanVisited == 2 || this.scanVisited == 3) {
      if (this.telefonicaService.scanVisited == 2){
        this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
      }else if (this.telefonicaService.scanVisited == 3){
        this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
      }
      this.telefonicaService.scanVisited -= 1;
      this.router.navigate(["/ES/scanDocumento"]);
    }
  }

  override ngOnInit() {
    if(this.telefonicaService.documentoSelected == "pasaporte"){
      this.documentName = "pasaporte";
    }else if (this.telefonicaService.documentoSelected == "documentoDeIdentidad"){
      this.documentName = "documento de identidad";
    } else {
      this.documentName = "permiso de conducir";
    }

    this.scanVisited = this.telefonicaService.scanVisited;
    if (this.scanVisited === 2 || this.scanVisited === 3) {
      this.skService.addEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)
      this.skService.captureImageDocument();
    }

  }

  ngAfterViewInit() {
    if (this.scanVisited == 1) {
      document.getElementById("validFoto")!.style.setProperty("opacity", "1");
      document.getElementById("btnValidRetry")!.style.setProperty("display", "block"); 
    }
  }


  nextStep() {
    if (this.scanVisited === 1) {
      document.getElementById("loading")!.style.setProperty("display", "block");
      document.getElementById("loadingSection")!.style.setProperty("display", "block");
      this.createUser();
    } else if (this.scanVisited === 2 && this.telefonicaService.documentoSelected != "pasaporte") {
      this.router.navigate(["/ES/scanDocumento"]);
    } else if (this.scanVisited === 3 && this.telefonicaService.documentoSelected != "pasaporte") {
      document.getElementById("loading")!.style.setProperty("display", "block");
      document.getElementById("loadingSection")!.style.setProperty("display", "block");
      this.addScanIdA();
    } else if (this.scanVisited === 2 && this.telefonicaService.documentoSelected == "pasaporte") {
      document.getElementById("loading")!.style.setProperty("display", "block");
      document.getElementById("loadingSection")!.style.setProperty("display", "block");
      this.addScanIdA();
    }
  }


  override onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        if (this.telefonicaService.scanVisited === 2) {
          this.telefonicaService.previewImageScanIdADef = 'data:image/png;base64, ' + this.skService.lastCaptureImageRaw();
          this.imgScanIdA = this.telefonicaService.previewImageScanIdADef;
          document.getElementById("btnValidRetry")!.style.setProperty("display", "block"); 
          //document.getElementById("images")!.innerHTML = "<img src='" + this.telefonicaService.previewImageScanIdADef + "' alt='image' style='width: 100%; height: 100%;'>";
          //console.log("previewImageScanIdADef : ", this.telefonicaService.previewImageScanIdADef);
        } else if (this.telefonicaService.scanVisited === 3) {
          this.telefonicaService.previewImageScanIdBDef = 'data:image/png;base64, ' + this.skService.lastCaptureImageRaw();
          this.imgScanIdB = this.telefonicaService.previewImageScanIdBDef;
          document.getElementById("btnValidRetry")!.style.setProperty("display", "block"); 
          //document.getElementById("images")!.innerHTML = "<img src='" + this.telefonicaService.previewImageScanIdBDef + "' alt='image' style='width: 100%; height: 100%;'>";
          //console.log("previewImageScanIdBDef : ", this.telefonicaService.previewImageScanIdBDef);
        }

        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  resetVisits() {
    if (this.scanVisited == 1) {
      this.router.navigate(["/ES/faceCapture"]);
    } else if (this.scanVisited == 2 || this.scanVisited == 3) {
      if (this.telefonicaService.scanVisited == 2){
        this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
      }else if (this.telefonicaService.scanVisited == 3){
        this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
      }
      this.telefonicaService.scanVisited -= 1;
      this.router.navigate(["/ES/scanDocumento"]);
    }
  }

  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
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
        this.telefonicaService.idUserToCheck = data.id;
        await this.rognerImageBase64(this.telefonicaService.previewImageProfile, 203, 35, 248, 411, (imageRogneeBase64) => {
          let image2 = "data:image/png;base64, " + imageRogneeBase64;
          this.increaseImageSize(image2, 3)
            .then((resizedBase64) => {
              // Utilisez la base64 de l'image agrandie comme nécessaire
              this.addFaceUser(resizedBase64);
            })
            .catch((error) => {
              console.error(error);
            });
        })


      })
      .catch((error) => {
      })
  }


  rognerImageBase64(imageBase64: string, x: number, y: number, largeur: number, hauteur: number, callback: (imageRogneeBase64: string) => void): void {
    const image = new Image();
    image.src = imageBase64;

    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = largeur;
      canvas.height = hauteur;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, x, y, largeur, hauteur, 0, 0, largeur, hauteur);

        const imageRogneeBase64 = canvas.toDataURL("image/png").split(',')[1];

        // Appeler la fonction de rappel avec la chaîne base64 modifiée en paramètre
        callback(imageRogneeBase64);

      }

    };

  }

  increaseImageSize(base64Image: string, scaleFactor: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = base64Image;

      img.onload = function () {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Unable to get 2D context");
          return;
        }

        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        let dataURL = canvas.toDataURL("image/png", quality);

        resolve(dataURL);
      };
    });


  }

  addFaceUser(imageRogneeBase64: string) {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/" + this.telefonicaService.idUserToCheck + "/face/samples", {
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
          console.error("error");
          if (this.router.url == "/ES/faceResult") {
            this.telefonicaService.errorFace = true;
            this.router.navigate(['/ES/validationScreen']);
          }
        } else if (data.items[0].usable == false) {

          if (this.router.url == "/ES/faceResult") {
            this.telefonicaService.errorFace = true;
            this.router.navigate(['/ES/validationScreen']);
          }

        } else {
          if (this.router.url == "/ES/faceResult") {
            this.telefonicaService.errorFace = false;
            this.router.navigate(['/ES/validationScreen']);
          }
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  addScanIdA() {
    var myHeaders = new Headers();

    if (this.telefonicaService.documentoSelected == "pasaporte") {
      fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.telefonicaService.idUserToCheck + "/idchecks/" + this.telefonicaService.idChecks + "/documents?isAsync=false",
        {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
          },
          body: JSON.stringify({
            "captured": this.telefonicaService.timeScanIdA.toISOString(),
            "clientCapture": {
              "images": [
                {
                  "captured": this.telefonicaService.timeScanIdA.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.telefonicaService.previewImageScanIdADef.replace("data:image/png;base64, ", "")
                  },
                  "subtype": "PROCESSED",
                  "type": "FRONT"
                }
              ]
            }
          })
        }
      )
        .then(response => response.json())
        .then((data) => {
          if (data.processingStatus == "FAILED") {
            this.telefonicaService.scanVisited = 1;
            document.getElementById("error")!.style.setProperty("display", "block");
            this.telefonicaService.errorSaveIdCard = true;

            setTimeout(() => {
              this.router.navigate(['/ES/scanDocumento']);
              this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.scanVisited = 1;
            }, 5000);
          } else {
            this.telefonicaService.hrefSensitiveData = data.serverProcessed.ocrData.sensitiveData.href
            this.checkValidation()
          }
        })
        .catch(error => {
          console.error('error', error);
          this.telefonicaService.scanVisited = 1;
          document.getElementById("error")!.style.setProperty("display", "block");
          this.telefonicaService.errorSaveIdCard = true;

          setTimeout(() => {
            this.router.navigate(['/ES/scanDocumento']);
            this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"

          }, 5000);
        }
        );

    }
    else {
      fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.telefonicaService.idUserToCheck + "/idchecks/" + this.telefonicaService.idChecks + "/documents?isAsync=false",
        {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
          },
          body: JSON.stringify({
            "captured": this.telefonicaService.timeScanIdA.toISOString(),
            "clientCapture": {
              "images": [
                {
                  "captured": this.telefonicaService.timeScanIdA.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.telefonicaService.previewImageScanIdADef.replace("data:image/png;base64, ", "")
                  },
                  "subtype": "PROCESSED",
                  "type": "FRONT"
                },
                {
                  "captured": this.telefonicaService.timeScanIdA.toISOString(),
                  "sensitiveData": {
                    "imageFormat": "JPG",
                    "value": this.telefonicaService.previewImageScanIdBDef.replace("data:image/png;base64, ", "")
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
            this.telefonicaService.scanVisited = 1;
            document.getElementById("error")!.style.setProperty("display", "block");
            this.telefonicaService.errorSaveIdCard = true;

            setTimeout(() => {
              this.router.navigate(['/ES/registryDocument']);
              this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
              this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"

            }, 5000);

          } else {
            this.telefonicaService.hrefSensitiveData = data.serverProcessed.ocrData.sensitiveData.href
            console.log("add id card");
            this.checkValidation()
          }
        })
        .catch(error => {
          console.error('error', error);
          this.telefonicaService.scanVisited = 1;
          document.getElementById("error")!.style.setProperty("display", "block");
          this.telefonicaService.errorSaveIdCard = true;

          setTimeout(() => {
            this.router.navigate(['/ES/scanDocumento']);
            this.telefonicaService.previewImageScanIdBDef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdADef = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"
            this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png"

          }, 5000);
        }
        );
    }
  }

  checkValidation() {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/DigitalOnBoardingServices/rest/v1/users/" + this.telefonicaService.idUserToCheck + "/idchecks/" + this.telefonicaService.idChecks + "/evaluation?evaluationPolicyName=policy-2",
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
        console.log(data);

        if (data.results.items[0].result !== "MATCH") {
          console.log(data.results.items[0].result)
          this.telefonicaService.identityValidate = false;
          this.router.navigate(['/ES/identityValidation']);
        } else {
          if (this.router.url === "/ES/faceResult") {
            this.getAllInformation();
            this.telefonicaService.identityValidate = true;
          }
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  getAllInformation() {
    fetch("https://cors.18.175.2.71.sslip.io/" + this.telefonicaService.hrefSensitiveData,
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
        console.log("get All informations");


        for (let key in data.mrz) {
          if (data.mrz.hasOwnProperty(key)) {
            let element = data.mrz[key];            
            switch (element.name) {
              case "Personal Number":
                this.telefonicaService.numDocument = element.value;
                break; 
              case "Surname":
                let surname = element.value.split(" ");
                this.telefonicaService.userFirstName = surname[0];
                if (surname.length > 1) {
                  this.telefonicaService.userSecondName = surname[1];
                }
                break;
              case "Given Names":
                this.telefonicaService.userName = element.value;
                break;
              
              case "Issuing State Code":
                this.telefonicaService.nationality = element.value;
                break;
              // Ajoutez d'autres cas pour d'autres propriétés si nécessaire
              default:
                // Traitez les autres cas si nécessaire
                break;
            }
          }
        }

        for (let key in data.mrz) {
          if (data.mrz.hasOwnProperty(key)) {
            let element = data.mrz[key];
            switch (element.name) {
              case "Address":
                let adress = element.value.replace("^", " ");
                this.telefonicaService.adress = adress;
                this.telefonicaService.postalCode = adress.split(" ")[adress.split(" ").length - 2];
                break;
            }
          }
        }
        this.router.navigate(['/ES/identityValidation']);
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }


  ngOnDestroy() {
    this.skService.removeEventListener("DocumentScanning", "imageCapture", this.onImageDocumentCapture)

  }

}
