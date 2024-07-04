import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from '../../telefonica.service';

@Component({
  selector: 'en-app-all-page-movistar',
  templateUrl: './all-page-movistar.component.html',
  styleUrls: ['./all-page-movistar.component.scss']
})
export class EnAllPageMovistarComponent {

  PreviousPage: string = "";

  constructor(private router: Router, private service:AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById("loadingWhite")!.classList.add("removeWhite");
    }, 50);

    this.PreviousPage = this.service.routesBackwards[this.router.url];
    
    if (this.PreviousPage == undefined || this.router.url == "/EN/scanDocumento" ){
      this.PreviousPage = this.router.url;
    }

  }


  ngOnDestroy(): void {
    document.getElementById("loadingWhite")!.classList.remove("removeWhite");
   }

}
