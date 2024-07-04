import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-thanks',
  templateUrl: './create-account-thanks.component.html',
  styleUrls: ['./create-account-thanks.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountThanksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      if (this.router.url === '/RNTP2023/createAccountThanks8000') {
        this.router.navigate(['/RNTP2023/homepage'])
      }
    }, 5000);

  }
}
