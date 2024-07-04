import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { MoovopService } from '../../moovHop.service';
import { GenericComponent } from '../../../../demos/generic/generic.component';

@Component({
  selector: 'app-moov-hop-reload-use-case-connection',
  templateUrl: './moov-hop-reload-use-case-connection.component.html',
  styleUrls: ['./moov-hop-reload-use-case-connection.component.scss', '../../moovHop.scss']
})
export class MoovHopReloadUseCaseConnectionComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(skService: SoftKioskService) {
    super(skService)
  }

  override ngOnInit(): void {
    let _this = this;
    _this.skService.addEventApplication("demoSKV2", "début de vie du composant de MoovHopReloadUseCaseConnection");
  }

  ngAfterViewInit(): void {
    let _this = this;
    _this.skService.addEventListener("ContactlessReading", "cardRead", this.onCardRead);
    _this.skService.addEventApplication("demoSKV2", "initialiation des vue du composant MoovHopReloadUseCaseConnection terminée");
  }

  override onCardRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardDetected':
        this.skService.addEventApplication("demoSKV2", "Lecture de carte RFID réussie! Passage à la vue suivante: moovHopReloadUseCaseSummary");
        // traitement pour le changement de vue
        let navEvent = new CustomEvent("moovHopNav", {
          detail: {
            "delay": 1000,
            "goTo": "/moovHopReloadUseCaseSummary"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case 'CardRemoved':
    }
  }

  ngOnDestroy(): void {
    let __this = this;

    __this.skService.addEventListener("ContactlessReading", "cardRead", this.onCardRead);
    __this.skService.addEventApplication("demoSKV2", "fin de vie du composant MoovHopReloadUseCaseConnection");
  }
}
