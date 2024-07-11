/**
 * @title  LECTURE D'UN CODE BARRE
 * @description lecture d'un code barre
 * @service BarcodeReading (BarcodeReader)
 * @service ReceiptPrinting 
*/


let html = '<html><meta charset="utf-8">' +
	'<body style="font-size:80%; font-family:Tahoma; margin: 0px 20px;">' +
	'<h1>Exemple de reçu</h1>' +
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

/**
 * Lancement de la lecture de code barre 
 */
function start1(){
    console.log("START - Lancement de la lecture de code barre");
    Kiosk.BarcodeReading.addEventListener('barcodeRead', onBarcodeRead);
    Kiosk.BarcodeReading.readBarcode();
}

/**
 * Lancement d'une impression de reçu
 */
function start2(){
    console.log("START - Impression du reçu");
    Kiosk.ReceiptPrinting.addEventListener('rawHtmlPrint', onRawHtmlPrint);
    Kiosk.ReceiptPrinting.printRawHtml({
        html: html
    });
}

/**
 * Fonction de rappel associée à l'événement d'impression de reçu
 */
function onRawHtmlPrint(e) {
	switch (e.data.dataType) {
		case 'RawHtmlPrinted':
			console.log("END - Reçu imprimé");
			break;

		case 'RawHtmlPrintError':
			console.error(e.data.code + ": " + e.data.description);
			// Le cas Timout est à traiter comme un cas fonctionnel dégradé
			if (e.data.code == 'Timeout') {
				console.log("ERROR Ticket imprimé, sans détection de la fin d'impression");
			}
			break;
	}
	// Fin d'écoute de l'événement d'impression
	Kiosk.ReceiptPrinting.removeEventListener('rawHtmlPrint', onRawHtmlPrint);
}

function stop2(){
    console.log("END - Arret de l'impression du reçu")
    Kiosk.ReceiptPrinting.removeEventListener('rawHtmlPrint', onRawHtmlPrint);
}




function onBarcodeRead(e) {
	switch (e.data.dataType) {
		case 'BarcodeRead':
			console.log("CAPTURE - Code barre lu: " + e.data.barcode);
            Kiosk.BarcodeReading.removeEventListener('barcodeRead', onBarcodeRead);
            console.log("END - Arret de la lecture de code barre");
			break;
		default:
			break;
	}
}

function stop1(){
    console.log("END - Arret de la lecture de code barre")
    Kiosk.BarcodeReading.stopReadBarcode();
    Kiosk.BarcodeReading.removeEventListener('barcodeRead', onBarcodeRead);
}