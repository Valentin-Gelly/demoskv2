import { Component } from '@angular/core';
import { AppService as telefonicaService } from '../../telefonica.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss','../../telefonica.component.scss']
})
export class homePageTelefonica {

  constructor( private telefonicaService: telefonicaService) { }


  ngOnInit(){
    this.telefonicaService.preloadImages();
  }
}
