import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabiziService } from '../labizi.service';
import { SoftKioskService } from '../../../softkiosk.service';

@Component({
  selector: 'labizi-homepage',
  templateUrl: './labizi-homepage.component.html',
  styleUrls: ['./labizi-homepage.component.scss']
})
export class LabiziHomepageComponent implements OnInit {

  skService: SoftKioskService;

  constructor(private router: Router, private labiziService: LabiziService, skService: SoftKioskService) {
    console.log("appel au constructeur du composant labiziHomepage");
    this.skService = skService;
  }

  ngOnInit(): void {
    console.log("appel de la méthode ngOnInit du composant labiziHomepage");

    let _this = this;

    this.labiziService.testType = "Covid";

    //console.log("liste des scenarios disponibles: " + _this.skService.getScenarioList());
    console.log("liste des services disponibles: "  + _this.skService.getServicesList());
  }

  jaiRdvClick(): void {
    let _this = this;
    let jaiRdvVar = "jaiRdv";
    console.log("démarrage parcours client jaiRdv");
    //_this.skService.activeSoftkioskScenario("CardPayment_Debit_Without_ReceiptPrinting.json");
    console.log("Enregistrement de l'information " + jaiRdvVar + " dans le journal de session");
    _this.skService.addEventApplication("demoSKV2", jaiRdvVar);
  }

  jePrendsRdvClick(): void{
    let _this = this;
    let jePrendsRdvVar = "jePrendsRdv";
    console.log("démarrage parcours client jePrendsRdv");
    console.log("Enregistrement de l'information " + jePrendsRdvVar + " dans le journal de session");
    _this.skService.addEventApplication("demoSKV2", jePrendsRdvVar);
  }
}
