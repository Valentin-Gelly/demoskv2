import { Component, OnInit } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';

@Component({
  selector: 'app-create-account-hello',
  templateUrl: './create-account-hello.component.html',
  styleUrls: ['./create-account-hello.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountHelloComponent implements OnInit {

  constructor(private moovhopService: MoovhopService) { }
  imgProfile: string =""
  ngOnInit(): void {

    this.imgProfile= this.moovhopService.previewImageProfile;
    
  
  }

}
