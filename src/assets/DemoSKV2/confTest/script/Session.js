/**
 * SESSION
 * Détection de fin de session
 */


/**
 * Ecoute de l'événement de lecture de code barre
 */
function start1(){
    console.log("START - Surveillance de l'inactivité de session")
    Kiosk.Session.addEventListener('inactivityChange', onInactivityChange);
}

/**
 * Fonction de rappel associée à l'événement de session
 */
function onInactivityChange(e) {

	switch (e.data.dataType) {
		case 'MarkerReached':
			// 1er marker
			// Utilisateur de la borne toujours présent ?
			// Popup "Etes-vous toujours là ?"
			// value
            console.log("USER - "+e.data.dataType + " Première alerte");
			break;
		case 'Timeout':
			// Affichage du screensaver si paramétré
			// Retour à l'accueil à réaliser explicitement
			// changePage("home");
            console.log("USER - "+e.data.dataType + " affichage du screensaver, baisse de la luminositée à 0% dans 2 secondes");
            setTimeout(() => {
                Kiosk.PanelPC.brightness = 0;
            }, 2000);
			break;
		
		case 'WatchReset':
			console.log("USER - "+e.data.dataType + "");
			break;

		case 'UserActivity':
			console.log("USER - "+ e.data.dataType + " Utilisateur actif");
			break;
	}
}

function stop1(){
    console.log("END - Fin de la surveillance de l'inactivité de session");
    Kiosk.Session.removeEventListener('inactivityChange', onInactivityChange);
}