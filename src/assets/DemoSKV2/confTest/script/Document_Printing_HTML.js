/**
 * @title  IMPRESSION D'UN DOCUMENT HTML
 * @description Impression d'un fichier sous format HTML
 * @service DocumentPrinting (DocumentPrinter)
 * 
*/


/**
 * Contenu HTML du document à imprimer
 * Charset à préciser. L'encodage par défaut de la fonction printRawHtml() est iso-8859-1.
 */
let html = '<html><meta charset="utf-8">' +
	'<body style="font-size:80%; font-family:Tahoma; margin: 0px 20px;">' +
	'<h1>Exemple de document</h1>' +
	'<h2>Votre commande</h2>' +
	'<hr />' +
	'<ul>' +
	'<li>Formule Plus</li>' +
	'<li>10.00</li>' +
	'</ul>' +
	'<p>Votre code</p>' +
	'<p>PIN code: 0000</p>' +
	'<hr />' +
	'</body>' +
	'</html>';


function start1(){
    console.log("START - Lancement de l'impression du document");
    Kiosk.DocumentPrinting.addEventListener("rawHtmlPrint", onRawHtmlPrint);
    Kiosk.DocumentPrinting.printRawHtml({
        html: html
    });

}

function stop1(){
    console.log("STOP - Arret de l'impression du document");
    Kiosk.DocumentPrinting.removeEventListener("rawHtmlPrint", onRawHtmlPrint);
}

/**
* Fonction de rappel associée à l'événement d'impression de document
*/
function onRawHtmlPrint(e) {
	console.log(e.data.dataType);
	switch (e.data.dataType) {
		case 'RawHtmlPrinted':
			console.log("END - Document imprimé");
			break;
		case 'RawHtmlPrintError':
			console.error("ERROR - " + e.data.code + ": " + e.data.description);
			break;
	}

	// Fin d'écoute de l'événement d'impression
	Kiosk.DocumentPrinting.removeEventListener('rawHtmlPrint', onRawHtmlPrint);
}
