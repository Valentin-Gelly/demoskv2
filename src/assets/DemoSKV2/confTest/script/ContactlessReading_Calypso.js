/**
 * LECTURE SANS CONTACT
 * Détection et lecture de carte RFID
 */

function start1(){
    console.log("START - écoute du lecteur de carte ")
    Kiosk.ContactlessReading.addEventListener('cardDetect', onCardDetect);
}

function stop1(){
    console.log("STOP - Arrêt de l'écoute du lecteur de carte ")
    Kiosk.ContactlessReading.removeEventListener('cardDetect', onCardDetect);
}

function onCardDetect(e){
    switch (e.data.dataType) {
		case 'CardDetected':
			console.log("USER - Carte détectée: ATR(" + e.data.atr + ") - support (" + e.data.cardType + ")");
      // Ouverture de session Calypso
			console.log("USER - Ouverture de session..."); 
      Kiosk.ContactlessReading.addEventListener("calypsoSessionRun", onCalypsoSessionRun);
      Kiosk.ContactlessReading.runCalypsoSession();
			break;
	}
}



/**
 * Fonction de rappel associée à l'événement calypsoSessionRun
 */
function onCalypsoSessionRun(e) {
	switch (e.data.dataType) {
		case "CalypsoSessionRun":
			console.log(" END - Carte lue: \n calypso kind : " +  e.data.cardSubType 
                + ";\n SN : " +  e.data.cardSerialNumber + ";\n startup informations : " 
                +  e.data.startupInformations + ";\n datas : " +  e.data.datas + ";");
            
			break;

		case "CalypsoSessionRunError":
      console.log("ERROR - "+e.data.dataType + ":" + e.data.code + ": " + e.data.description);
			switch(e.data.code) {
				case "SelectApplicationFailed":
					break;
				case "GetChallengeFailed":
					break;
				case "OpenSessionCardFailed":
					break;
				case "OpenSessionSAMFailed":
					break;
				case "InvalidSignature":
					break;
				case "NoRunningSession":
					break;
			}
			break;
	}
	Kiosk.ContactlessReading.removeEventListener("calypsoSessionRun", onCalypsoSessionRun);
}
