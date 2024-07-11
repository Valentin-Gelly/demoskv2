/**
 * @title LECTURE SANS CONTACT
 * @description Détection et lecture de carte RFID sans contact
 * @service ContactlessReading (ContactlessReader)
 */


/**
 * Ecoute d'un lecteur sans contact
 */
function star1(){
    console.log("START - Début de l'écoute du lecteur sans contact");
    Kiosk.ContactlessReading.addEventListener('cardDetect', onCardDetect);
}

/**
 * Arrêt de l'écoute d'un lecteur sans contact
 */
function stop1(){
    console.log("STOP - Fin de l'écoute du lecteur sans contact");
    Kiosk.ContactlessReading.removeEventListener('cardDetect', onCardDetect);
}

/**
 * Fonction de rappel associée à l'événement de lecture sans contact
 */
function onCardDetect(e) {
	switch (e.data.dataType) {
		case 'CardDetected':
			console.log("USER - Carte détectée: ATR(" + e.data.atr + ") - UID (" + e.data.uid + ")");
			break;
	}
}
