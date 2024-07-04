import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AppService {

    routesBackwards: any = {
        "/ES/fullPrepayment": "/ES/prepaidTariffs",
        "/ES/prepaidTariffs": "/ES/homePageTelefonica",
        "/ES/wantContract": "/ES/fullPrepayment",
        "/ES/homeCheckIdentity": "/ES/wantContract",
        "/ES/faceResult": "/ES/homeCheckIdentity",
        "/ES/registryDocument": "/ES/homeCheckIdentity",
        "/ES/scanDocumento": "/ES/registryDocument",
        "/ES/informationConsent": "/ES/registryDocument",
        "/ES/formPersonalInformation": "/ES/informationConsent",
        "/ES/legalCondition": "/ES/formPersonalInformation",
        "/ES/payment": "/ES/legalCondition",
        "/ES/welcome": "/ES/payment",
        "/EN/fullPrepayment": "/EN/prepaidTariffs",
        "/EN/prepaidTariffs": "/EN/homePageTelefonica",
        "/EN/wantContract": "/EN/fullPrepayment",
        "/EN/homeCheckIdentity": "/EN/wantContract",
        "/EN/faceResult": "/EN/homeCheckIdentity",
        "/EN/registryDocument": "/EN/faceResult",
        "/EN/scanDocumento": "/EN/registryDocument",
        "/EN/informationConsent": "/EN/registryDocument",
        "/EN/formPersonalInformation": "/EN/informationConsent",
        "/EN/legalCondition": "/EN/formPersonalInformation",
        "/EN/payment": "/EN/legalCondition",
        "/EN/welcome": "/EN/payment",
    };

    language: string = "ES";

    scanVisited: number = 1;
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdA: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageScanIdB: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    timeScanIdA: Date = new Date();
    timeScanIdB: Date = new Date();
    previewImageScanIdBDef: string = "";
    previewImageScanIdADef: string = "";
    idUserToCheck: string = "QTAz_qk2xElTqJ9ZpKrfsaKymg";
    idChecks: string = "";
    referenceId: string = "";
    errorSaveIdCard: boolean = false;
    hrefSensitiveData: string = "";
    userName: string = "";
    adress: string = "";
    userFirstName: string = "";
    nationality: string = "";
    userSecondName: string = "";
    numDocument: string = "";
    postalCode: string = "";
    documentoSelected: string = "";
    errorFace: boolean = false;
    errorScanId: boolean = false;
    eSIM: string = "";
    identityValidate: boolean = false;


    preloadImages() {
        
        let filesInTheFolder = [
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Background-ES.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-continuar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-contratar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-Doc-no-reverso.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-documento-ID.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-Espana.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-Foto-bien.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-me-interesa.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-pasaporte.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-permiso-conducir.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-Repetir.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-volver-foto.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Bouton-volver-pagina-inicio.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/carre.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Check.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Contractar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/countdown.gif",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Datos-personales.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Direccion.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/england.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/eSIM.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Gotham-Light.otf",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Habla-6.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/ko.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Logo-movistar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Logo-movistar-noir.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Masque-webcam.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/photo.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Picto-internet.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Picto-llamadas.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Picto-roaming.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Picto-verifica-ID.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/prepago total.avif",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Prepago-Plus.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Prepago-Premium.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Prepago-Total.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Promotion.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/QR-code-movistar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Renogare.ttf",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Renogare-Regular.otf",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Resumen-compra-slide14.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Resumen-compra-slide3&15.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/rond.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/SIM.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/spain.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/Tipo-SIM.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/TPE.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Address.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Background-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-back-to-top.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-continue.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-Doc-no-reverse-side.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-driving-licence.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-I-am-interested.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-ID-card.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-I-want-it.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-new.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-passport.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-photo-fine.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-Spain.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Bouton-take-another-photo.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/carre.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Check.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/england.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/eSIM.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Habla-6-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/ko.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Logo-movistar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Masque-webcam-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Personal-details.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/photo.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Picto-internet.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Picto-llamadas.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Picto-roaming.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Picto-verifica-ID.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/prepago total.avif",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Prepago-Plus-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Prepago-Premium-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Prepago-Total.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Prepago-Total-EN.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Promotion.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Purchase.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Purchase-summary-slide14.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Purchase-summary-slide3&15.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/QR-code-movistar.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Resumen-compra-slide14.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Resumen-compra-slide3&15.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/rond.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/SIM.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/SIM-type.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/spain.png",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/Tipo-SIM",
            "./assets/TELEFONICA-EK3000-2024-MOVISTAR/EN/TPE.png",
        ]
        
        let images = []
        for (const file of filesInTheFolder) {
            // Create a new Image object
            let img = new Image()
            // Set the src of the Image object to the current file
            img.src = file
            // Push the Image object to the images array
            images.push(img)
        }
        
    }
    


    constructor(private router: Router, private route: ActivatedRoute) { }

    navigateToHome() {
        this.router.navigate(["/paginaPrincipal"]);
    }

    navigateBack(activeRoute: string) {
        this.router.navigate([this.routesBackwards[activeRoute]]);
    }

}
