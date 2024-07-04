import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { LabiziService } from '../labizi.service';



@Component({
  selector: 'app-labizi-rdv',
  templateUrl: './labizi-rdv.component.html',
  styleUrls: ['./labizi-rdv.component.scss',
'../labizi.scss'
]
})
export class LabiziRdvComponent implements OnInit {


  finalDateToDisplay: string = "";
  finalHourToDisplay: string = "";

  constructor(private router : Router) {
  }

  ngOnInit(): void {
    this.printToday();
  }

  printToday() {

    const date = new Date();
    const hour = date;

    date.setDate(date.getDate());
    hour.setHours(hour.getMinutes() + 1);

    let options : any = {weekday: "long", year:"numeric", month: "long", day: "numeric"};

    let options2 : any = {hour: "numeric", minutes: "numeric"};

    // British English uses day-month-year order and 24-hour time without AM/PM
    this.finalDateToDisplay = (date.toLocaleString('fr-FR', options));
    this.finalHourToDisplay = (hour.toLocaleString('fr-FR', options2));

  }  }

