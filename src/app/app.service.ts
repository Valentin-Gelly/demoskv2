import { OnInit } from '@angular/core';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SoftKioskService } from './softkiosk.service';
@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {

  filename : string = "";
  statusServ: any;
  serviceName: string = "";
  currentAppUrl: string = "";
  currentView: string = "";
  currentViewImage: string = "";
  arrayStatusError = {};
  giveAccessToOptions = [{ key: 'marketing', values: ['demos'] }, { key: 'user', values: ['demos'] }, { key: 'advancedTech', values: ['demos', 'parcoursClients', 'fonctionnalités'] }, { key: 'tech', values: ['demos', 'parcoursClients', 'fonctionnalités'] }, { key: 'ivq', values: ['demos', 'parcoursClients', 'fonctionnalités', 'tests'] }];
  currentMenu: string = "";
  @Output() currentMenuChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentViewChange: EventEmitter<string> = new EventEmitter<string>();
  statusSubject: any;


  constructor(private skService: SoftKioskService, private router: Router) {

    let _this = this;
    let stat: any = {};
    this.currentMenu = localStorage.getItem("currentMenu") ?? "";
    // Récupération des status des services de la borne et écoute de leurs changements
    this.skService.getServicesList().forEach(function (service: any) {
      // Interrogation préalable du status du service
      stat[service] = skService.getStatus(service);
      if (service === "OnscreenKbd") {
        skService.activeKbd(true);
      }
      console.log(`le status du service ${service} est ${stat[service]}`);

      // rempli le tableau stat avec la liste des status de chaque service passé en paramètre

      let onStatusChangeCallBack = function (e: any) {
        console.log("on rentre dans le status change ")
        _this.onStatusChange(e, service)
      };
      skService.addEventListener(service, "statusChange", onStatusChangeCallBack);
    })
    console.log("" + stat);
    this.statusServ = stat;
  };

  ngOnInit(): void {

  }

  onStatusChange(e: any, service: string) {
    console.log("on est dans le status change ")
    // Vérification de la cohérence entre le nom du service et l'expéditeur de l'événement
    let arrayDefaultServ = [];
    if (service === e.sender) {
      // Stockage du nouveau status
      let newStatus = e.data.status;
      this.statusServ[service] = newStatus;
      console.log(`le status du service ${service} est ${newStatus}`);
      // this.statusSubject.next({service, newStatus});
      // remplissage du tableau arrayDefaultServ avec les services en critical
      // if (this.statusServ[service] === 'Critical' || this.statusServ[this.serviceName] === 'TempUnavailable' || this.statusServ[this.serviceName] === 'Unknown') {
      //   arrayDefaultServ = this.statusServ[this.serviceName];
      //   //  return this.serviceName;
      //  }
    }
    console.log("" + this.statusServ);
  }

  getCurrentView() {
    return this.currentView;
  }

  getStatusServ() {
    return this.statusServ;
  }

  setCurrentView(str: string) {
    this.currentView = str;
    this.currentViewChange.emit(str);
    localStorage.setItem("currentView", this.currentView);
  }

  getCurrentRoute() {
    return this.router.url;
  }

  setNextRoute(nextRoute: any) {
    this.router.navigate([nextRoute]);
  }

  setCurrentMenu(menuSelected: string) {
    this.currentMenu = menuSelected;
    this.currentMenuChange.emit(menuSelected);
    localStorage.setItem("currentMenu", this.currentMenu);
  }

  changeView(view: string) {
    this.setCurrentView(view);
  }

}
