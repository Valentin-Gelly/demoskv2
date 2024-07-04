import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService as telefonicaService} from '../../telefonica.service';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.scss', '../../telefonica.component.scss']
})
export class IdentityValidationComponent extends GenericComponent {

  constructor(private router: Router, private service: telefonicaService, skService: SoftKioskService) {
    super(skService);
   }
   identityValidate:boolean =  this.service.identityValidate;
   timeout: any;
  override ngOnInit() {
    this.timeout = setTimeout(() => {
      if(this.router.url == '/ES/identityValidation' && this.identityValidate)
      this.router.navigate(['/ES/informationConsent']);
      else
      this.router.navigate(['/ES/homeCheckIdentity']);
    }, 5000);
  }

  onDestroy() {
    clearTimeout(this.timeout);
  }

}
