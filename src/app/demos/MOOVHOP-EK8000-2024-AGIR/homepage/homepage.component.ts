import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../moovhop.service';
declare var Kiosk: any;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../moovhop.component.scss']
})
export class HomepageComponent {

  constructor(private moovhopService: MoovhopService) {
  }

  ngOnInit(): void {
    this.moovhopService.textCB = '';
    this.moovhopService.scanVisited = 0;
    this.moovhopService.isScanFinished = false;
    this.moovhopService.newerCiImageCapture = "";
    this.moovhopService.previewImageScanId = "";
    this.moovhopService.previewImageProfile = "";
    this.moovhopService.whatSubscription = "";
    this.moovhopService.ticketPrice = 1;
    this.moovhopService.bnTickets = 1;
    this.moovhopService.textTickets = '';
    this.moovhopService.textSubscription = '';
    this.moovhopService.ActionChoosed = 1;
    this.moovhopService.TicketChoosed = 1;
    this.moovhopService.htmlReceiptContent = '';

    this.moovhopService.errorFace = false;
    this.moovhopService.errorSaveIdCard = false;
    this.moovhopService.identityValidate = false;

    this.moovhopService.preloadImages();

    var maVariable = localStorage.getItem('automaticCard');
    console.log(maVariable);
    this.moovhopService.automaticCard = maVariable || 'true';
  }

  ngAfterViewInit() {
    Kiosk.Signaling.Leds.set("Green");
  }

  ActionChoosed(num: number) {
    this.moovhopService.ActionChoosed = num;
  }

}
