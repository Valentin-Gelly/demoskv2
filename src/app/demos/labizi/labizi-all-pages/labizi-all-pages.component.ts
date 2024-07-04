import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { LabiziService } from '../labizi.service';
import { SoftKioskService } from '../../../softkiosk.service';

@Component({
  selector: 'labizi-all-pages',
  templateUrl: './labizi-all-pages.component.html',
  styleUrls: ['./labizi-all-pages.component.scss',
    '../labizi.scss'
  ]
})


export class LabiziAllPagesComponent implements OnInit {

  navigateTo: string = "";
  navigateToPrevious: string = "";
  /**
   * Stockage des status de services SoftKiosk
  */
  appService: any
  currentView: any;
  arrayServiceStatusCritical: string[] = [];
  arrayServiceStatusTempUnavailable: string[] = [];
  arrayServiceStatusWarning: string[] = [];
  arrayServiceStatusUnknown: string[] = [];
  arrayScenarioList: string[] = [];
  arrayServiceStatusNotOk: string[] = [];
  stringServiceStatusNotOk = "";
  stringServiceStatusCritical = "";
  stringServiceStateError = "";

  currentUrl: string;
  constructor(private router: Router, private _appService: AppService, private skService: SoftKioskService, private labiziService: LabiziService) {
    this.appService = _appService;

    this.navigateTo = this.labiziService.nextRoute;
    this.navigateToPrevious = this.labiziService.previousRoute;
    this.currentUrl = this.labiziService.currentUrl;
  }

  ngOnInit(): void {
    let _this = this;

    _this.skService.getServicesList().forEach((service: any) => {

      switch (_this.skService.getStatus(service)) {
        case 'Critical':
          this.stringServiceStatusCritical += service + " " ;
          break;
        case 'TempUnavailable':
          this.arrayServiceStatusTempUnavailable.push(service);
          break;
        case 'Unknown':
          this.arrayServiceStatusUnknown.push(service);
          break;
        case 'Warning':
          this.arrayServiceStatusWarning.push(service);
          break;
      }
    });
  }

  // displayArrayServiceStatusCritical() {
  //   let _this = this;
  //   _this.arrayServiceStatusCritical.forEach((service: any) => {
  //     _this.stringServiceStatusCritical = service + " ";
  //   });
  // }

  // displayArrayServicesNotOk() {
  //   let _this = this;
  //   _this.arrayServiceStatusNotOk.forEach((service: any) => {
  //     _this.stringServiceStatusNotOk = service + " ";
  //   });
  // }

}
