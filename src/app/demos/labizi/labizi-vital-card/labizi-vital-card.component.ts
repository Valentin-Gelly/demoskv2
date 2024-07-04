import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { GenericComponent } from '../../generic/generic.component';

@Component({
  selector: 'labizi-vital-card',
  templateUrl: './labizi-vital-card.component.html',
  styleUrls: ['./labizi-vital-card.component.scss',
    '../labizi.scss'
  ]
})
export class LabiziVitalCardComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("vitaleName") vitaleName: ElementRef = new ElementRef("");
  @ViewChild("vitaleFirstName") vitaleFirstName: ElementRef = new ElementRef("");
  @ViewChild("vitaleBirth") vitaleBirth: ElementRef = new ElementRef("");
  @ViewChild("vitaleId") vitaleId: ElementRef = new ElementRef("");

  constructor(skService: SoftKioskService) {
    super(skService);
  }

  override ngOnInit(): void {
    console.log("on est dans le ngOnInit de vitale card reading");
  }

  ngAfterViewInit(): void {
    let _this = this;
    console.log("on est dans le ngAfterViewInit");
    console.info(this.skService);
    // event cardPresenceCheck
    console.log("on se désabonne de l'event cardPresenceCheck de la callback  onCardPresenceCheck");
    _this.skService.addEventListener("VitaleCardReading", "cardPresenceCheck", this.onCardPresenceCheck);
    // vérification de présence de carte
    _this.skService.checkCardPresence();
  }

  override onCardPresenceCheck = (e: any): void => {
    switch (e.data.dataType) {
      case "CardPresenceChecked":
        if (e.data.isPresent) {
          // event cardRead
          this.skService.addEventListener("VitaleCardReading", "cardRead", this.onCardRead);
          this.skService.readVitale(15);
        } else {
          // event cardRead
          this.skService.addEventListener("VitaleCardReading", "cardRead", this.onCardRead);
        }
        break;
      case "CardPresenceCheckError":
      /**
       * Evènement de test de présence de carte échoué
       * Champs associés:
       * @param {("None" | "ErrorRecupConfig" | "StatusError" | "StateError" | "BadFormat" | "Unknown" | "HttpTimeout" | "AuthenticationError" | "ConnectionError")} e.data.code - Erreur sur test de présence de carte
       * @param {string} e.data.description - description erreur
       * @param {string} e.data.dataType - Type de l'événement (sa classe).
       */
    }
  }

  /** exemple d'appel à SK sans fonctions fléchées */
  override onCardRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardDetected':
        this.skService.addEventListener("VitaleCardReading", "vitaleRead", this.onVitaleRead);
        this.skService.readVitale(15);
        break;
      case 'CardRemoved':
        console.log("carte retirée");
    }
  }
  override onVitaleRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'VitaleRead':
        console.log(e.data.dataType);
        this.handleVitaleRead(e);
        break;
      case 'VitaleReadError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  override handleVitaleRead = (e: any): void => {

    if (e.data.beneficiaires[0].nom != null) {
      this.vitaleName.nativeElement.value = e.data.beneficiaires[0].nom;
    }
    else {
      this.vitaleName.nativeElement.value = "Non renseigne";
    }

    if (e.data.beneficiaires[0].prenom != null) {
      this.vitaleFirstName.nativeElement.value = e.data.beneficiaires[0].prenom;
    }
    else {
      this.vitaleFirstName.nativeElement.value = "Non renseigne"
    }

    if (e.data.beneficiaires[0].dateDeNaissance != null) {
      this.vitaleBirth.nativeElement.value = e.data.beneficiaires[0].dateDeNaissance;
    }
    else {
      this.vitaleBirth.nativeElement.value = "Non renseigne"
    }

    if (e.data.nir != null) {
      this.vitaleId.nativeElement.value = e.data.nir;
    }
    else {
      this.vitaleId.nativeElement.value = "Non renseigne"
    }
    console.log("Carte vitale lue: ATR(" + e.data.atr + ")")
    console.log(e.data.beneficiaires[0].nom);
    console.log(e.data.beneficiaires[0].prenom);
    console.log(e.data.beneficiaires[0].dateDeNaissance);
    console.log(e.data.nir);
  }

  ngOnDestroy = (): void => {

    let __this = this;

    // event cardRead
    console.log("on se désabonne de l'event vitaleRead de la callback  onVitaleRead");
    __this.skService.removeEventListener("VitaleCardReading", "vitaleRead", this.onVitaleRead);

    // event vitaleRead
    console.log("on se désabonne de l'event cardRead de la callback  onCardRead");
    __this.skService.removeEventListener("VitaleCardReading", "cardRead", this.onCardRead);

    // event cardPresenceCheck
    console.log("on se désabonne de l'event cardPresenceCheck de la callback  onCardPresenceCheck");
    __this.skService.removeEventListener("VitaleCardReading", "cardPresenceCheck", this.onCardPresenceCheck);
  }


}


