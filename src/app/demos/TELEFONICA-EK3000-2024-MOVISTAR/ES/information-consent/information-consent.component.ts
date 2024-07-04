import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService as telefonicaService } from '../../telefonica.service';

@Component({
  selector: 'app-information-consent',
  templateUrl: './information-consent.component.html',
  styleUrls: ['./information-consent.component.scss','../../telefonica.component.scss']
})
export class InformationConsentComponent {
  
  saveDataBool: string ="";

  constructor(private route: Router, private service: telefonicaService) { }

  
  
  saveData() {
    let listRadio = document.getElementsByTagName("input");
    for (let index = 0; index < listRadio.length; index++) {
      const element = listRadio[index];
      console.log(element);
      if(element.checked){
        this.saveDataBool = element.value;
      }
    }
    console.log(this.saveDataBool);
    
    if(this.saveDataBool=="yes"){
      this.route.navigate(['/ES/formPersonalInformation']);
    }else{
      document.getElementById("loading")!.style.setProperty("display", "block");
      document.getElementById("loadingSection")!.style.setProperty("display", "block");
      this.deleteUser();
    }
  }


  deleteUser() {
    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/"+this.service.idUserToCheck, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ=="
      },
  
    })
    .then((response) => {
      console.log("user deleted");
      this.route.navigate(['/ES/formPersonalInformation']);
    });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic Y2VkcmljLndhcnRlbEBpcG1mcmFuY2UuY29tOjA5REJCNTQ2QkRkIQ==");


    fetch("https://cors.18.175.2.71.sslip.io/https://emea.identityx-cloud.com/ipmfrance/IdentityXServices/rest/v1/users/"+this.service.idUserToCheck, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    }     )
      .then(response => response.text())
      .then((result) => {
        console.log("user deleted");
        this.route.navigate(['/ES/formPersonalInformation']);
      })
      .catch(error => console.log('error', error));


  }

  ngOnDestroy() {
    document.getElementById("loading")!.style.setProperty("display", "none");
    document.getElementById("loadingSection")!.style.setProperty("display", "none");
  }


}
