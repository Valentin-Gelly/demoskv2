import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload-thanks',
  templateUrl: './reload-thanks.component.html',
  styleUrls: ['./reload-thanks.component.scss', '../../moovhop.component.scss']
})
export class ReloadThanksComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(this.router.url === '/EK80002024AGIR/reloadThanks'){
      setTimeout(()=>{
        this.router.navigate(['EK80002024AGIR/homepage'])
      },5000)
    }
  }
}
