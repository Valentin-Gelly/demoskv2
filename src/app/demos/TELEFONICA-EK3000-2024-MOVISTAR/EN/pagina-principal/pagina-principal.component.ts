import { Component } from '@angular/core';
import { AppService as telefonicaService } from '../../telefonica.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss','../../telefonica.component.scss']
})
export class EnHomePageTelefonica {

  constructor(private telefonicaService: telefonicaService) { }

  ngOnInit(): void {
    this.telefonicaService.previewImageProfile = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.telefonicaService.previewImageScanIdA = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    this.telefonicaService.previewImageScanIdB = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
  }

}
