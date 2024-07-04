import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-condition',
  templateUrl: './legal-condition.component.html',
  styleUrls: ['./legal-condition.component.scss','../../telefonica.component.scss']
})
export class EnLegalConditionComponent {
  
    constructor(private route: Router) { }

    ngOnInit() {
      document.getElementById("continuarBtn")!.addEventListener("click", () => {
        let allinput = document.getElementsByTagName("input")
        for (let index = 0; index < allinput.length; index++) {
          const element = allinput[index];
          console.log(element.checked);
          if(element.checked){
            this.route.navigate(['/EN/payment']);
          }else{
            element.style.border = "2em solid red";
          }
        }
      });
    }
}
