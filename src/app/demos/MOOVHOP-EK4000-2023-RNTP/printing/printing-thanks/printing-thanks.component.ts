import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../../softkiosk.service';
import { GenericComponent } from '../../../generic/generic.component';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printing-thanks',
  templateUrl: './printing-thanks.component.html',
  styleUrls: ['./printing-thanks.component.scss', '../../moovhop.component.scss']
})
export class PrintingThanksComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private router: Router, private moovHopService : MoovhopService, skService : SoftKioskService) { 
    super(skService)
  }

  override ngOnInit(): void {
  }
  timeOut: any;
  ngAfterViewInit(): void {
    let __this = this;
    this.timeOut = setTimeout(() => {
      if (__this.router.url === '/printingThanks') {
        __this.router.navigate(['/homepage']);
      }
    }, 6000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }




}
