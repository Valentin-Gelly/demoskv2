import { Component } from '@angular/core';
import { MoovhopService} from '../../moovhop.service';

@Component({
  selector: 'app-printing-menu',
  templateUrl: './printing-menu.component.html',
  styleUrls: ['./printing-menu.component.scss', '../../moovhop.component.scss']
})
export class PrintingMenuComponent {
  
  constructor( private moovhopService : MoovhopService) { }

  Choose(num : number){
    this.moovhopService.LineChoosed = num;
    
  }

}
