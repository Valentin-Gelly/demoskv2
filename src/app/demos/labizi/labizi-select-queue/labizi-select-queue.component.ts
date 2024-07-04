import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LabiziService } from '../labizi.service';

@Component({
  selector: 'labizi-select-queue',
  templateUrl: './labizi-select-queue.component.html',
  styleUrls: ['./labizi-select-queue.component.scss',
    '../labizi.scss'
  ]
})
export class LabiziSelectQueueComponent implements OnInit {

  constructor(private labiziService : LabiziService){
    
  }

  ngOnInit(): void {
  }

  covidTest() : string {
    this.labiziService.testType = "Covid";
    console.log("Test Covid-19: " + this.labiziService.testType)
    return this.labiziService.testType;
  }

  bloodTest() : string {
    this.labiziService.testType = "Blood";
    console.log("Prise de sang: " + this.labiziService.testType)
    return this.labiziService.testType;
  }

}
