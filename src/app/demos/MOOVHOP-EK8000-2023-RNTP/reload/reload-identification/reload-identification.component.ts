import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../../demos/generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';

@Component({
  selector: 'app-reload-identification',
  templateUrl: './reload-identification.component.html',
  styleUrls: ['./reload-identification.component.scss', '../../moovhop.component.scss']
})
export class ReloadIdentificationComponent extends GenericComponent implements OnInit {

  onCardDetected: any;

  constructor(private router: Router, skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit(): void {
    this.onCardDetected = (e: any): void => {
      switch (e.data.dataType) {
        case 'CardDetected':
        case 'CardDetectedDTO':
          // traitement pour le changement de vue
          if (this.router.url == '/RNTP2023/reloadIdentification') {
            let navEvent = new CustomEvent("moovHopNav", {
              detail: {
                "delay": 0,
                "goTo": "/RNTP2023/reloadPersonalInformations"
              }
            });
            window.dispatchEvent(navEvent);
          }
          break;
        default:
          break;
      }
    }

    this.skService.addEventListener("ContactlessReading", "cardDetect", this.onCardDetected);
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.skService.addEventListener("ContactlessReading", "cardDetect", this.onCardDetected);
  }

}
