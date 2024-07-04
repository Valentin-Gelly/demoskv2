import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class MoovopService {

  currentView = "";
  private moovopRouterDict: any = {
    "/moovopRecupCard": "/moovopQrCode",
    "/moovopQrCode": "/moovopCongratulations",
    "/moovopCongratulations": "/moovopRecupCard"
  };

  private moovopPreviousRouterDict: any = {
    "/moovopQrCode": "/moovopRecupCard",
    "/moovopCongratulations": "/moovopQrCode",
    "/moovopRecupCard": "/moovopCongratulations"
  };

  private fcMoovopRouterDict: any = {
    "MoovopRecupCard" : "/moovopCongratulations",
    "MoovopBarCodeReading": "/moovopQrCode",
  }

  constructor(private router: Router, private appService: AppService) {
    //navigation
    let _this = this;
    this.currentView = appService.getCurrentView();
    // this.appService.statusSubject.subscribe((statusEventObject) => {
    //   // traitement spécifique
    //   console.log(statusEventObject);
    // });
    window.addEventListener("moovopNav", function (e: any) {
      _this.navigateAfterDelay(e.detail.delay, e.detail.goTo)
    })
  }

  navigateAfterDelay(delay: number, goTo: string="") {
    let router = this.router;
    let newRoute = (goTo)? goTo : (this.moovopRouterDict[router.url])? this.moovopRouterDict[router.url] : "";
    setTimeout(() => {
      if (newRoute) {
        router.navigate([newRoute]);
      }

    }, delay)
  }

  get currentUrl() {
    return this.router.url;
  }

  get nextRoute() {
    return this.moovopRouterDict[this.router.url];
  }

  get previousRoute() {
    return this.moovopPreviousRouterDict[this.router.url];
  }

}

