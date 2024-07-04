/**
 * @title  LECTURE D'UN CODE BARRE
 * @description lecture d'un code barre
*/

/**
 * lancement de la lecture de code barre 
 */
function start1(){
    console.log("START - Lancement de la lecture de code barre");
    Kiosk.BarcodeReading.addEventListener('barcodeRead', onBarcodeRead);
    Kiosk.BarcodeReading.readBarcode();
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