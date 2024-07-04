import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) {
    console.log(this.router.url);
  }

  ngOnInit(): void {
    //document.getElementById("btnClickHere")!.addEventListener("click", this.clickHere);
  }
  clickHere() {
    this.router.navigate(['/demoSKV2ChooseView']);
  }

}
