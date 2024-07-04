import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';

@Component({
  selector: 'app-validation-screen',
  templateUrl: './validation-screen.component.html',
  styleUrls: ['./validation-screen.component.scss', '../../moovhop.component.scss']
})

export class validationScreen extends GenericComponent {



  constructor(private route: Router, private moovhopService: MoovhopService, private softKioskService: SoftKioskService) {
    super(softKioskService);
  }

  errorFace = this.moovhopService.errorFace;
  errorSaveIdCard = this.moovhopService.errorSaveIdCard;
  scanVisited = this.moovhopService.scanVisited;
  identityValidate = this.moovhopService.identityValidate;

  timeout: any;

  override ngOnInit(): void {
    this.errorFace = this.moovhopService.errorFace;
    this.errorSaveIdCard = this.moovhopService.errorSaveIdCard;
    this.scanVisited = this.moovhopService.scanVisited;
    this.identityValidate = this.moovhopService.identityValidate;


    if (this.scanVisited === 3 && this.identityValidate) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountHello']);
      }, 5000);
    }else if (this.errorFace && this.scanVisited === 3) {
      this.timeout = setTimeout(() => {
        this.moovhopService.scanVisited--;
        this.route.navigate(['/EK80002024AGIR/createAccountFaceCapture']);
      }, 5000);
    }else if (this.scanVisited === 2 && !this.moovhopService.errorSaveIdCard) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountFormPersonalInformations']);
      }, 5000);
    }else if (this.scanVisited === 3 && !this.identityValidate) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountMenu']);
      }, 5000);
    }else if(this.moovhopService.errorSaveIdCard){
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountMenu']);
      }, 5000);
    }

    if (this.scanVisited === 3 && this.identityValidate) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['EK80002024AGIR/createAccountHello']);
      }, 5000);
    }else if(this.moovhopService.errorSaveIdCard){
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountMenu']);
      }, 5000);
    }else if (!this.errorFace && this.scanVisited === 3) {
      this.timeout = setTimeout(() => {
        this.moovhopService.scanVisited--;
        this.route.navigate(['/EK80002024AGIR/createAccountFaceCapture']);
      }, 5000);
    }else if (this.scanVisited === 2 && !this.moovhopService.errorSaveIdCard) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountFormPersonalInformations']);
      }, 5000);
    }else if (this.scanVisited === 3 && !this.identityValidate) {
      this.timeout = setTimeout(() => {
        this.route.navigate(['/EK80002024AGIR/createAccountMenu']);
      }, 5000);
    }
  }
  
  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

}
