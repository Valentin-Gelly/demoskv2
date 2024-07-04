import { Component } from '@angular/core';
import { MoovhopService } from '../../moovhop.service';


@Component({
  selector: 'app-create-account-hello',
  templateUrl: './create-account-hello.component.html',
  styleUrls: ['./create-account-hello.component.scss', '../../moovhop.component.scss']
})
export class CreateAccountHelloComponent {

  constructor(private moovhopService: MoovhopService) { }
  imgProfile: string = "./assets/MOOVHOP-EK8000-2023-RNTP/loadingPreview.png"
  nameUser: string = this.moovhopService.nameUser;


  ngOnInit(): void {

    this.imgProfile = this.moovhopService.faceCapture;

    

  }

}
