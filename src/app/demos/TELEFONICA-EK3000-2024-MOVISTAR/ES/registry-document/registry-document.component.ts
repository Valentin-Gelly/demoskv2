import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../generic/generic.component';
import { SoftKioskService } from '../../../../softkiosk.service';
import { AppService as telefonicaService  } from '../../telefonica.service';



@Component({
  selector: 'app-registry-document',
  templateUrl: './registry-document.component.html',
  styleUrls: ['./registry-document.component.scss','../../telefonica.component.scss']
})
export class RegistryDocumentComponent extends GenericComponent{

  constructor(private router: Router, skService: SoftKioskService, private telefonicaService: telefonicaService) {
    super(skService);
   }

   override ngOnInit(): void {
    this.telefonicaService.previewImageScanIdA = './assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png'
    this.telefonicaService.previewImageScanIdB = './assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png'
    this.telefonicaService.scanVisited = 1;
  }

   
  selectDocument(documento: string){
    
    this.telefonicaService.documentoSelected = documento;
    this.router.navigate(["/ES/scanDocumento"]);
  }

}
