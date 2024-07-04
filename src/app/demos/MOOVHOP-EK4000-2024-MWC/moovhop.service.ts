import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { SoftKioskService } from '../../softkiosk.service';

@Injectable({
    providedIn: 'root'
})

export class MoovhopService {

    timeout: any = null;
    identityPicture: boolean = false;
    route: any = '/MWC2024createAccountPersonalInformations';

    currentView = "";

    isScanFinished: boolean = false;
    scanVisited: number = 0;

    LineChoosed: number = 1;

    ActionChoosed: number = 1;

    newerCiImageCapture: string = "";

    QRCodeScaned: boolean = false;


    whatSubscription: string = "";
    paidWithCB: boolean = false;
    priceSubscription: number = 0;


    textSubscription: string = '<p style="text-align:center;">';

    heureCB: string = "";

    textCB: string = '';


    private moovHopRouterDic: any = {
        // use case achat d'un pass (création d'un compte)
        '/MWC2024homepage"': '/MWC2024createAccountMenu',
        '/MWC2024createAccountMenu': '/MWC2024createAccountCamera',
        '/MWC2024createAccountCamera': '/MWC2024createAccountScanFinish',
        '/MWC2024createAccountScanFinish': '/MWC2024createAccountPersonalInformations',
        '/MWC2024createAccountPersonalInformations': '/MWC2024createAccountHello',
        '/MWC2024createAccountHello': '/MWC2024createAccountProofAddress',
        '/MWC2024createAccountProofAddress': '/MWC2024/reateAccountSubscriptionChoice',
        '/MWC2024createAccountSubscriptionChoice': '/MWC2024createAccountQRCodeYesNo',
        '/MWC2024createAccountQRCodeYesNo': '/MWC2024createAccountQRCodeScan',
        '/MWC2024createAccountQRCodeScan': '/MWC2024paymentChoice',
        '/MWC2024paymentChoice': '/MWC2024paymentCB',
        '/MWC2024paymentCB': '/MWC2024subScriptionConfirmation',
        '/MWC2024subScriptionConfirmation': '/MWC2024homepage"',

        // use case impression d'une fiche horaire
        '/MWC2024printingMenu': '/MWC2024/printingInformationChoice',
        '/MWC2024/printingInformationChoice': '/MWC2024/printingMethodsGettingTimetable',
        '/MWC2024/printingMethodsGettingTimetable': '/MWC2024/printingScanQRcode',
        '/MWC2024/printingScanQRcode': '/MWC2024homepage"',


        // use cas paiement d'une amende
        '/MWC2024/identificationMenu': '/MWC2024/scanQrCode',
        '/MWC2024/scanQrCode': '/MWC2024/identificationValidation',
        '/MWC2024/identificationValidation': '/MWC2024/informationSummary',
        '/MWC2024/informationSummary': '/MWC2024paymentChoice',
        '/MWC2024/thanksPaymentReport': '/MWC2024homepage"',


    };


    private moovHopPreviousRouterDict: any = {

    };

    private fcMoovHopRouterDict: any = {

    }
    previewImageScanId: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";


    constructor(private router: Router, private appService: AppService, private _router: ActivatedRoute) {
        //navigation
        let _this = this;
        this.currentView = appService.getCurrentView();
        window.addEventListener("moovHopNav", function (e: any) {
            _this.navigateAfterDelay(e.detail.delay, e.detail.goTo)
        })
    }

    preloadImages() {
        let images = [
            "./assets/MOOVHOP-EK4000-2024-MWC/Bouton-line1.png",
            "./assets/MOOVHOP-EK4000-2024-MWC/Bouton-line2.png",
            "./assets/MOOVHOP-EK4000-2024-MWC/Bouton-line3.png",
            "./assets/MOOVHOP-EK4000-2024-MWC/Bouton-line4.png",
        ];
        for (let i = 0; i < images.length; i++) {
            let img = new Image();
            img.src = images[i];
        }
    }

    timeoutNavigation() {
        this.timeout = setTimeout(() => {
            if(this.router.url !== '/MWC2024homepage'){
                this.navigateAfterDelay(0, "/MWC2024homepage");
            }
        }, 120000);
    }

    resetTimeoutNavigation() {
        clearTimeout(this.timeout);
    }


    navigateAfterDelay(delay: number, goTo: string = "") {
        let router = this.router;
        let newRoute = (goTo) ? goTo : (this.moovHopRouterDic[router.url]) ? this.moovHopRouterDic[router.url] : "";
        setTimeout(() => {
            if (newRoute) {
                router.navigate([newRoute]);
            }
        }, delay)
    }

    get currentUrl() {
        return this.router.url;
    };

    get nextRoute() {
        return this.moovHopRouterDic[this.router.url];
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };

    
    htmlReceiptContent: string = '';

 
    





}