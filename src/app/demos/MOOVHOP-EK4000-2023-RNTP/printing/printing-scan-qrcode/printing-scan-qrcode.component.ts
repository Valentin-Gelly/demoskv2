import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';
@Component({
  selector: 'app-printing-scan-qrcode',
  templateUrl: './printing-scan-qrcode.component.html',
  styleUrls: ['./printing-scan-qrcode.component.scss', '../../moovhop.component.scss']
})
export class PrintingScanQRcodeComponent implements OnInit {

  timeOut: any;

  constructor(private router: Router, private moovhopService:MoovhopService) { }
  lineChoosed: any = null;
  img ="";
  ngOnInit(): void {
    this.lineChoosed = this.moovhopService.LineChoosed;
    this.img="./assets/MOOVHOP-EK4000-2023-RNTP/QRcode_fiche"+this.lineChoosed+".png"
    this.timeOut = setTimeout(() => {
      if(this.router.url=="/printingScanQRcode"){
        this.router.navigate(['/printingThanks']);
      }
    }, 10000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }

}
