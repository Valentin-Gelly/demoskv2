import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoovhopService } from '../../moovhop.service';
@Component({
  selector: 'app-printing-information-choice',
  templateUrl: './printing-information-choice.component.html',
  styleUrls: ['./printing-information-choice.component.scss', '../../moovhop.component.scss']
})
export class PrintingInformationChoiceComponent implements OnInit {

  constructor(private moovhopService: MoovhopService, private router: Router) { }
  selected = false;
  selected2 = false;
  selected3 = false;
  allInformationsGood: boolean = false;

  nbStationSelected = 0;
  periodsSelected = false;


  listSelected: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  ngOnInit() {
    document.getElementsByTagName("body")[0].style.setProperty("width", "100%");
  }
  allInputs = document.getElementsByTagName("input");
  selectedCheckboxes: number[] = [];



  limitSelection(event: any) {
    if (event.target.checked) {
      if (this.selectedCheckboxes.length < 1) {
        this.listSelected[parseInt(event.target.value) - 1] = 1;
        this.selectedCheckboxes.push(event.target.value);
        console.log(event.target.value, this.listSelected);
        this.nbStationSelected++;

      } else if (this.selectedCheckboxes.length === 1) {
        this.listSelected[parseInt(event.target.value) - 1] = 1;

        console.log('test' + this.listSelected, this.listSelected.indexOf(1));
        let posFirstSelected = this.listSelected.indexOf(1);
        let index = posFirstSelected + 1;
        this.selectedCheckboxes.push(event.target.value);
        while (this.listSelected[index] != 1) {
          this.allInputs[index].checked = true;
          this.allInputs[index].disabled = true;

          index++;
          console.log("test2" + index);
        }
        this.nbStationSelected++;
      }
      else {
        event.target.checked = false;
        console.log(event.target.value);
      }
    } else {
      const index = this.selectedCheckboxes.indexOf(event.target.value);
      if (index > -1) {
        this.selectedCheckboxes.splice(index, 1);
        this.listSelected[event.target.value - 1] = 0;
      }
      this.nbStationSelected--;
      console.log(this.listSelected);
      for (let index = 0; index < this.listSelected.length; index++) {
        const element = this.listSelected[index];
        if (element == 0) {
          this.allInputs[index].checked = false;
          this.allInputs[index].disabled = false;

        }
      }
    }
    if (this.nbStationSelected == 2 && this.periodsSelected) {
      document.getElementById("NextStep")?.style.setProperty("display", "block");
      document.getElementById("NextStepFalse")?.style.setProperty("display", "none");
      this.allInformationsGood = true;
    }
  }

  Selected(event: any) {
    console.log(event.target.value);
    if (event.target.classList.contains("selected")) {
      if (event.target.id == "week-button") {
        this.selected = false;

      } else if (event.target.id == "week-end-button") {
        this.selected2 = false;
      } else if (event.target.id == "holydays-button") {
        this.selected3 = false;
      }
      this.periodsSelected = false;
      if (this.nbStationSelected == 2 && !this.periodsSelected) {
        document.getElementById("NextStep")?.style.setProperty("display", "none");
        document.getElementById("NextStepFalse")?.style.setProperty("display", "block");
        this.allInformationsGood = false
      }
    } else {
      if (event.target.id == "week-button") {
        this.selected = true;
        this.selected3 = false;
        this.selected2 = false;

      } else if (event.target.id == "week-end-button") {
        this.selected2 = true;
        this.selected = false;
        this.selected3 = false;
      } else if (event.target.id == "holydays-button") {
        this.selected3 = true;
        this.selected = false;
        this.selected2 = false;
      }
      this.periodsSelected = true;
    }

    if (this.nbStationSelected == 2 && this.periodsSelected) {
      document.getElementById("NextStep")?.style.setProperty("display", "block");
      document.getElementById("NextStepFalse")?.style.setProperty("display", "none");
      this.allInformationsGood = true;
    }
  }

  Reset() {
    let allInputs = document.getElementsByTagName("input");
    this.selected = false;
    this.selected2 = false;
    this.selected3 = false;

    this.nbStationSelected = 0;
    for (let index = 0; index < allInputs.length; index++) {
      const element = allInputs[index];
      element.checked = false;
      element.disabled = false;
    } 
    this.listSelected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    document.getElementById("NextStep")?.style.setProperty("display", "none");
    document.getElementById("NextStepFalse")?.style.setProperty("display", "block");
    this.allInformationsGood = false;
    this.selectedCheckboxes = [];
    this.periodsSelected = false;
    
  }

}
