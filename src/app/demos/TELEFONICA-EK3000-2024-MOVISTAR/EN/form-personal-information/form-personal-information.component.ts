import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { AppService as telefonica } from '../../telefonica.service';

@Component({
  selector: 'app-form-personal-information',
  templateUrl: './form-personal-information.component.html',
  styleUrls: ['./form-personal-information.component.scss','../../telefonica.component.scss']
})
export class EnFormPersonalInformationComponent implements AfterViewInit{

  allGood: boolean = true;
  canContinue: boolean = false;
  eSIM: any;
  nombre = this.telefonica.userName;
  apellido = this.telefonica.userFirstName;
  segundoApellido = this.telefonica.userSecondName;
  direccion = this.telefonica.adress;
  nationality = this.telefonica.nationality;
  numDocument = this.telefonica.numDocument;
  postalCode = this.telefonica.postalCode;
  typeDocument = this.telefonica.documentoSelected;



  constructor(private route: Router, private telefonica: telefonica) { }

  ngOnInit(): void {
    console.log(this.nombre);
    console.log(this.apellido);
    console.log(this.segundoApellido);
    console.log(this.direccion);
    console.log(this.nationality);
    console.log(this.numDocument);
    console.log(this.postalCode);
    console.log(this.typeDocument);
  }

  ngAfterViewInit(): void {
    let btnContinuar = document.getElementById('btnContinuar');
    btnContinuar!.addEventListener('click', this.continuar);
    let allInput = document.querySelectorAll('input');
    for (let index = 0; index < allInput.length; index++) {
      const element = allInput[index];
      if ( element.type != "radio"){
        element.addEventListener('focus', this.focus);
        element.addEventListener('blur', this.blur);
      }
    }

  }

  continuar(): void {
    let allInput = document.querySelectorAll('input');
    this.allGood= true;

    for (let index = 0; index < allInput.length; index++) {
      const element = allInput[index];
      if (element.value == ""  && element.name != 'segundoapellido'){
        element.placeholder = "Please fill in this field";
        element.style.borderBottom = "SOLID 1px red";
        this.allGood= false;
      }
    } 
  }

  



  focus(event: any): void {
    if(event.target.value == "" && event.target.type != "radio"){
      event.target.style.border = "none";
      event.target.style.borderBottom = "SOLID 1px #ccc";
    }
    document.getElementsByTagName("form")[0].style.transition = "0.7s";
    document.getElementsByTagName("form")[0].style.top = "45%";
  }

  blur(event: any): void {
    if(event.target.value != "" && event.target.type != "radio"){
      event.target.style.border = "none";
      event.target.style.borderBottom = "SOLID 1px #2ECC71";
      this.canContinue= true;
      for (let index = 0; index < document.getElementsByTagName("input").length; index++) {
        const element = document.getElementsByTagName("input")[index];
        if(element.value == "" && element.type != "radio" && element.name != 'segundoapellido'){
          this.canContinue= false;
        }
      }
      if(this.canContinue){
        document.getElementById("continuarSection")!.style.display = "none";
        document.getElementById("continuarSection2")!.style.display = "block";
        
      }
    }else{
      if(event.target.name != 'segundoapellido'){
        event.target.style.border = "none";
        event.target.style.borderBottom = "SOLID 1px red";     
      }
    }
    document.getElementsByTagName("form")[0].style.top = "55%";
  }


  saveValue() {
    this.telefonica.adress = this.direccion;
    this.telefonica.userName = this.nombre;
    this.telefonica.userFirstName = this.apellido;
    this.telefonica.userSecondName = this.segundoApellido;
    this.telefonica.numDocument = this.numDocument;
    this.telefonica.postalCode = this.postalCode;
    this.telefonica.nationality = this.nationality;
    this.telefonica.documentoSelected = this.typeDocument;
    this.telefonica.eSIM = this.eSIM;

    this.route.navigate(['/EN/legalCondition']);

  }
}
