import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class LabiziService {


  private customerIndexValue: number = 0;
  now = new Array;
  currentView = "";
  private testToDo: string = "Covid";
  private routerDict: any = {
    "/labiziHomepage": "/labiziCarteVitale",
    "/labiziQrCode": "/labiziRdv",
    "/labiziRdv": "/labiziPay",
    "/labiziPay":"/labiziValidatedPayment",
    "/labiziCarteVitale": "/labiziSelectQueue",
    "/labiziSelectQueue": "/labiziValidatedQueue",
    "/labiziValidatedQueue": "/labiziHomepage",
    "/labiziValidatedPayment": "/labiziHomepage"
  };

  // pour permettre le retour à l'écran précédent lorsque l'on est dans la vue marketing
  private previousRouterDict: any = {
    "/labiziQrCode": "/labiziHomepage",
    "/labiziRdv": "/labiziQrCode",
    "/labiziPay":"/labiziRdv",
    "/labiziCarteVitale": "/labiziHomepage",
    "/labiziSelectQueue": "/labiziCarteVitale",
    "/labiziValidatedQueue": "/labiziSelectQueue",
    "/labiziValidatedPayment": "/labiziPay"
  };

  pcRouterDict : any = {
    "/labiziJaiRdv" : "/labiziQrCode",
    "/labiziJePrendsRdv" : "/labiziCarteVitale"
  }

  fcRouterDict : any = {
    "/labiziBarCodeReading" : "/labiziQrCode",
    "/labiziPay" : "/labiziPay",
    "/labiziVitaleCard" : "/labiziCarteVitale",
    "/labiziPrintReceipt" : "/labiziValidatedPayment",
    "/labiziPrintSelectedQueue" : "/labiziValidatedQueue"
  }

  constructor(private router: Router, private appService: AppService, private _router: ActivatedRoute) {
    //navigation
    let _this = this;
    this.currentView = appService.getCurrentView();
    window.addEventListener("labiziNav", function (e: any) {
      _this.navigateAfterDelay(e.detail.delay, e.detail.goTo)
    })

    //nouveau jour
    setInterval(() => {
      this.now.push(new Date().toLocaleTimeString()[0]);
      this.now.push(new Date().toLocaleTimeString()[1]);
      if (this.now.length == 2) {
        console.log(this.now);
      }
      if (this.now[0] == 0 && this.now[1] == 0) {
        console.log("Un nouveau jour commence: réinitialisation...")
        this.customerIndexValue = 0;
      }
      if (this.now.length > 2) {
        this.now.length = 0;
      }
    }, 1200000);
  }

  get currentUrl() {
    let currentUrl = this.router.url;
    return currentUrl;
  }

  get testType() {
    return this.testToDo;
  }

  set testType(test : string) {
    this.testToDo = test;
  }

  get customerIndex() {
    return this.customerIndexValue;
  }

  set customerIndex(customerIndex: number) {
    this.customerIndexValue = customerIndex;
  }

  get nextRoute() {
    return this.routerDict[this.router.url];
  }

  get previousRoute() {
    return this.previousRouterDict[this.router.url];
  }

  navigateAfterDelay(delay: number, goTo: string="") {
    let router = this.router;
    let newRoute = (goTo)? goTo : (this.routerDict[router.url])? this.routerDict[router.url] : "";
    setTimeout(() => {
      if (newRoute) {
        router.navigate([newRoute]);
      }

    }, delay)
  }

}
