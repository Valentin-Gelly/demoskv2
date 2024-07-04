import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss', '../../app.component.scss']
})
export class OptionListComponent implements OnInit {

  currentMenu: string = "";
  currentViewImage: any;
  optionsArrays: any = {
    "dm": [{ name: 'Moov\'HoP version EK1000CVM', description: 'Démo d\' une application de transports', image: './assets/DemoSKV2/Moovop/Logo.png', route: '' }, { name: 'Moov\'HoP version EK8000', description: 'Démo d\' une application de transports', image: './assets/DemoSKV2/MoovHop/Logo.png', route: '' }, { name: 'Labizi', description: 'Démo d\' une application de santé', image: './assets/DemoSKV2/Labizi/Logo.png', route: '/labiziHomepage' }],
    "pc": [{ name: 'LabiziJaiRdv', description: 'Parcours client de paiment de rdv: Lecture de code Bar puis paiment', image: '', route: '' }, { name: 'LabiziJePrendsRdv', description: 'Parcours client de prise de rdv: Lecture de carte vital et impression de reçu', image: '', route: '' }],
    "fc": [{ name: 'LabiziBarCodeReading', description: 'Lecture de QR code de Labizi parcours jaiRdv', image: '', route: '' }, { name: 'LabiziPay', description: 'Paiement par carte de Labizi parcours JaiRdv', image: '', route: '' }, { name: 'LabiziVitaleCard', description: 'Lecture de carte vitale de Labizi parcours JePrendsRdv', image: '', route: '' }, { name: 'LabiziPrintReceipt', description: 'Impression de tickets de paiement de Labizi parcours JaiRdv', route: '' }, { name: 'LabiziPrintSelectedQueue', description: 'Impression de tickets de la file choisie pour Labizi parcours JePrendsRdv', route: '' }],
    "ts": [{ name: 'form', description: 'Formulaire HTML à remplir, utilisation du clavier oskbd et impression d\'un ticket', image: '', route: '' }, { name: 'gallery', description: 'gallerie d\'images', image: '', route: '' }, { name: 'light', description: 'Allumage des lumières de la borne, pour tester le service signaling pour certaines bornes', image: '', route: '' }, { name: 'sketchpad', description: 'écran pour dessiner, utile pour tester la réactivité de l\'écran', image: '', route: '' }, { name: 'touch', description: 'Jeu avec la corbeille, pour tester le tactile', image: '', route: '' }, { name: 'videoCall', description: 'Simulation d\'appel vidéo, pour tester la caméra, entrée/sorties son', image: '', route: '' }]
  }
  featuresArray: any = [{ imgPath: './assets/Labizi/Logo.png', title: 'Labizi - scan de qr code' }, { imgPath: './assets/Labizi/Logo.png', title: 'Labizi - Paiment simulé' }, { imgPath: './assets/Labizi/Logo.png', title: 'Labizi - Lecture de carte vitale' }, { imgPath: './assets/Labizi/Logo.png', title: 'Labizi - impression de reçu (suite à un paiement)' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK1000 - scan de qr code' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK1000 - distribution de carte RFID' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - distribution de carte RFID' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - Impression de tickets' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - formulaire d\'utilisation du clavier' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - Scan de carte d\'identité (ancien format)' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - Scan de carte d\'identité (nouveau format)' }, { imgPath: './assets/MoovHop/logo-app.png', title: 'Moov\'Hop version EK8000 - Lecture de carte RFID' }];

  constructor(private appService: AppService) {
    this.currentMenu = appService.currentMenu;
    this.currentViewImage = appService.currentViewImage;
  }

  ngOnInit(): void {
    this.appService.currentMenuChange.subscribe((value: string) => {
      console.log('Received real-time menu value from app:', value);
      this.currentMenu = value;
    });
    this.appService.currentViewChange.subscribe((value: string) => {
      console.log('Received real-time view value from app:', value);
      this.currentViewImage = value;
    })
  }

}
