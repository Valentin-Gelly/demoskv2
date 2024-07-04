import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from '../../telefonica.service';

@Component({
  selector: 'app-all-page-movistar',
  templateUrl: './all-page-movistar.component.html',
  styleUrls: ['./all-page-movistar.component.scss']
})
export class AllPageMovistarComponent {

  PreviousPage: string = "";

  constructor(private router: Router, private service:AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById("loadingWhite")!.classList.add("removeWhite");
    }, 50);

    this.PreviousPage = this.service.routesBackwards[this.router.url];
    
    if (this.PreviousPage == undefined || this.router.url == "/ES/scanDocumento" ){
      this.PreviousPage = this.router.url;
    }

    document.getElementById("back")!.addEventListener("click", () => {
      if (this.router.url == "ES/faceResult" && this.service.scanVisited==3 ) {
        this.service.scanVisited = 2;
      }
    });

  }


  ngOnDestroy(): void {
    document.getElementById("loadingWhite")!.classList.remove("removeWhite");
   }

}
