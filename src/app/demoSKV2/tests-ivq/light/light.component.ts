import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*  */

  /**
   * SIGNALING
   * Allumage des LEDs
  */


  /**
   * Démarrage du template
   */
  async ledOn() {
    // Écoute de l'événement de positionnement des LEDs
    Kiosk.Signaling.addEventListener("ledSet", this.onLedSet);

    // Lancement de l'allumage des LEDs avec un délai de 2s entre chaque couleur
    for (let i in colorOrder) {
      Kiosk.Signaling.setLed({ 'color': colorOrder[i], 'name': 'Leds' });

      await this.sleep(2000);
    }

    // Extinction des LEDs
    Kiosk.Signaling.setLed({ 'color': 'Off', 'name': 'Leds' });

    // Fin d'écoute de l'événement de positionnement
    Kiosk.Signaling.removeEventListener('ledSet', this.onLedSet);
  }

  /**
   * Fonction de rappel associée à l'événement de détection de changement de couleur des LEDs
   */
  onLedSet(e: { data: { dataType: any; color: string; code: string; description: string; }; }) {
    switch (e.data.dataType) {
      case 'LedSet':
        console.log("Couleur d'allumage des LEDs: " + e.data.color);
        break;
      case 'LedSetError':
        console.log(e.data.code + ": " + e.data.description);
        break;
      default:
        break;
    }
  }

  /**
   * Ajout d'un délai entre deux positionnement des LEDs
   * @param {number} time - Temps d'attente en ms
   */
  sleep(time: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

}

/** 
 * Déclaration de variables
 */
declare var Kiosk: any;
// Ordre des couleurs d'allumage des LEDs
let colorOrder = ['Red', 'Green', 'Blue', 'Magenta', 'White', 'Cyan', 'Yellow'];