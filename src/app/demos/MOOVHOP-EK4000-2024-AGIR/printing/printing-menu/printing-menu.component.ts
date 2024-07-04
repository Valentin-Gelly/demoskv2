import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { SoftKioskService } from '../../../../softkiosk.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';

declare var Kiosk: any;
@Component({
  selector: 'app-printing-menu',
  templateUrl: './printing-menu.component.html',
  styleUrls: ['./printing-menu.component.scss', '../../moovhop.component.scss']
})
export class PrintingMenuComponent {

  constructor(private moovhopService: MoovhopService, private skService: SoftKioskService, private router : Router ) {
   }

  Choose(num: number) {
    this.moovhopService.LineChoosed = num;

  }

  printCallback = (e: any): any => {   
    console.log("printCallback");
    let navEvent;
    switch (e.data.dataType) {
      case 'RawPdfPrinted':
        if (this.router.url === "/AGIR2024/printingMenu") {
          // traitement pour le changement de vue
          this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
          navEvent = new CustomEvent("moovHopNav", {
            detail: {
              "delay": 5000,
              "goTo": "/AGIR2024/homepage"
            }
          });
          window.dispatchEvent(navEvent);
        }
        break;
      case 'RawPdfPrintError':
        if (this.router.url === "/AGIR2024/printingMenu") {
          this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
          console.error(e.data.code + ": " + e.data.description);
          // traitement pour le changement de vue
          navEvent = new CustomEvent("moovHopNav", {
            detail: {
              "delay": 0,
              "goTo": "/AGIR2024/homepage"
            }
          });
          window.dispatchEvent(navEvent);
        }
        break;
    }
  }

  navigateToError() {
    Kiosk.demoSKV2.setApplicationStatus({
      "status": "Critical",
      "statusDetail": "",
      "statusDescription": ""
    });
  }
  
  ngOnInit(): void {
    console.log("printing-menu.component.ts");
    this.skService.addEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
  }

  ngOnDestroy(): void {
    this.skService.removeEventListener("DocumentPrinting", "rawPdfPrint", this.printCallback);
  }

}
