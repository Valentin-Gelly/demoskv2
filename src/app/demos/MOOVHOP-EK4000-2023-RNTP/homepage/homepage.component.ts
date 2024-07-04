import { Component } from '@angular/core';
import { MoovhopService } from '../moovhop.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../moovhop.component.scss']
})
export class HomepageComponent {
  constructor( private moovhopService: MoovhopService) { }

  ngOnInit() {
    //préchargement des images
    this.moovhopService.preloadImages();

    this.moovhopService.identityPicture = false;
    this.moovhopService.route = '/createAccountPersonalInformations';
    this.moovhopService.currentView = "";
    this.moovhopService.isScanFinished = false;
    this.moovhopService.scanVisited = 0;
    this.moovhopService.LineChoosed = 1;
    this.moovhopService.ActionChoosed = 1;
    this.moovhopService.newerCiImageCapture = "";
    this.moovhopService.QRCodeScaned = false;
    this.moovhopService.whatSubscription = "";
    this.moovhopService.paidWithCB = false;
    this.moovhopService.priceSubscription = 0;
    this.moovhopService.textSubscription = '<p style="text-align:center;">';
    this.moovhopService.heureCB = "";
    this.moovhopService.textCB = '';
    document.getElementsByTagName('body')[0].style.width = 'fit-content';
    document.getElementsByTagName('body')[0].style.height = 'fit-content';
    console.log("document.getElementsByTagName('body')[0].style.height");
    console.log(document.getElementsByTagName('body')[0].style.height);
    console.log("document.getElementsByTagName('body')[0].style.height ");
    console.log(document.getElementsByTagName('body')[0].style.height);
  }

  Choix(num : number){
    this.moovhopService.ActionChoosed = num;
  }

}
