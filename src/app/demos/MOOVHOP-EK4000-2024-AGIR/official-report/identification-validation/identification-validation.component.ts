import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-identification-validation',
  templateUrl: './identification-validation.component.html',
  styleUrls: ['./identification-validation.component.scss','../../moovhop.component.scss']
})
export class IdentificationValidationComponent implements OnInit {

  constructor( private moovhopService : MoovhopService ) { }
  QRCodeScaned: boolean = false;
  ngOnInit(): void {
      this.QRCodeScaned = this.moovhopService.QRCodeScaned;
    
  }

}
