/**
 * @title Camera Shooting
 * @description Ce script permet de prendre des photos avec la caméra. Prise d'une photo, preview de la photo, preview + prise de photo.
 * @service CameraShooting (Camera)
 */

var timeout;

/**
 * Prise d'une photo
 */
function start1(){
    console.log("START - lancement de la capture de la photo");
    Kiosk.CameraShooting.addEventListener("imageCapture", onImageCameraCapture);
    Kiosk.CameraShooting.captureImage();
}


/**
 * Preview de la photo
 */
function start2(){
    console.log("START - lancement de la preview de la camera");    
    Kiosk.CameraShooting.addEventListener("previewStart", onPreview);
    Kiosk.CameraShooting.startPreview();
    timeoutCamera();
}

/**
 * Preview + prise de photo
 */
function start3(){
    console.log("START - lancement de la preview de la camera + capture de la photo");
    Kiosk.CameraShooting.addEventListener("previewStart", onPreview);
    Kiosk.CameraShooting.startPreview();
    timeoutCameraBeforeCapture();
}

function onPreview(e) {
    switch (e.data.dataType) {
        case 'PreviewStarted':
            console.log("USER - Preview de la caméra en cours");
            let previewWebsocket = new WebSocket(e.data.serverUrl);
            previewWebsocket.onmessage = (preview) => {
                console.log("PREVIEW - " + preview.data);
            };
            previewWebsocket.onclose = function () {
            };
            break;
        case 'PreviewStopped':
            
            break;
        default:
            console.error(e.data.code + ": " + e.data.description);
            break;
    }
}


function timeoutCameraBeforeCapture(){
    timeout = setTimeout(() => {
        Kiosk.CameraShooting.stopPreview();
        Kiosk.CameraShooting.addEventListener("imageCapture", onImageCameraCapture);
        Kiosk.CameraShooting.captureImage();
    }, 5000);
}

function timeoutCamera() {
    timeout = setTimeout(() => {
        Kiosk.CameraShooting.stopPreview();
        Kiosk.CameraShooting.removeEventListener( "previewStart", onPreview);
        console.log("END - preview de la camera arrete");
    }, 5000);
}


function onImageCameraCapture(e){
    switch (e.data.dataType) {
        case 'ImageCaptured':
            console.log("USER - Image de la caméra capturée");
            console.log("CAPTURE - " + Kiosk.CameraShooting.lastCapture.raw);
            console.log("END - Arret de la capture de la caméra");
            Kiosk.CameraShooting.removeEventListener("imageCapture", onImageCameraCapture);
            break;
        case 'ImageCaptureError':
            console.error("ERROR - " + e.data.code + ": " + e.data.description);
            Kiosk.CameraShooting.removeEventListener("imageCapture", onImageCameraCapture);
            break;
    }
}

function stop1(){
    console.log("END - Arret de la capture de la caméra")
    Kiosk.CameraShooting.removeEventListener("imageCapture", onImageCameraCapture);
    clearTimeout(timeout);
}

function stop2(){
    console.log("END - Arret de la preview de la caméra");
    Kiosk.CameraShooting.removeEventListener("previewStart", onPreview); 
    Kiosk.CameraShooting.stopPreview();
}

function stop3(){
    console.log("END - Arret de la preview de la camera + capture de la photo");
    Kiosk.CameraShooting.removeEventListener("previewStart", onPreview); 
    Kiosk.CameraShooting.stopPreview();
    Kiosk.CameraShooting.removeEventListener("imageCapture", onImageCameraCapture);
    clearTimeout(timeout);
}

