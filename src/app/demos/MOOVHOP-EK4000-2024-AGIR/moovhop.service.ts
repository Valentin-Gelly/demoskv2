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
    route: any = '/AGIR2024/createAccountPersonalInformations';

    currentView = "";

    isScanFinished: boolean = false;
    scanVisited: number = 0;

    LineChoosed: number = 1;

    ActionChoosed: number = 1;

    newerCiImageCapture: string = "";

    QRCodeScaned: boolean = false;


    whatSubscription: string = "1";
    priceSubscription: number = 15;
    textSubscription: string = '<p style="text-align:center;">Abonnement 1 semaine</p>';

    paidWithCB: boolean = false;

    heureCB: string = "";

    textCB: string = '';


    // Gestions Reconnaissance facial
    documentSelected: string = "IdCard";
    faceCapture: string = ""




    private moovHopRouterDic: any = {
        // use case achat d'un pass (création d'un compte)
        '/AGIR2024/homepage': '/AGIR2024/createAccountMenu',
        '/AGIR2024/createAccountMenu': '/AGIR2024/createAccountCamera',
        '/AGIR2024/createAccountScanFinish': '/AGIR2024/createAccountPersonalInformations',
        '/AGIR2024/createAccountPersonalInformations': '/AGIR2024/createAccountHello',
        '/AGIR2024/createAccountHello': '/AGIR2024/createAccountProofAddress',
        '/AGIR2024/createAccountProofAddress': '/AGIR2024/createAccountSubscriptionChoice',
        '/AGIR2024/createAccountSubscriptionChoice': '/AGIR2024/createAccountQRCodeYesNo',
        '/AGIR2024/createAccountQRCodeYesNo': '/AGIR2024/createAccountQRCodeScan',
        '/AGIR2024/createAccountQRCodeScan': '/AGIR2024/paymentChoice',
        '/AGIR2024/paymentChoice': '/AGIR2024/paymentCB',
        '/AGIR2024/paymentCB': '/AGIR2024/thanksPaymentReport',
        '/AGIR2024/subscriptionConfirmation': '/AGIR2024/homepage',
        '/AGIR2024/paymentMobileOp': '/AGIR2024/thanksPaymentReport',
        '/AGIR2024/paymentMobileOpValidation': '/AGIR2024/thanksPaymentReport',
        '/AGIR2024/paymentAppMobile': '/AGIR2024/thanksPaymentReport',

        // use case impression d'une fiche horaire
        '/AGIR2024/printingMenu': '/AGIR2024/printingInformationChoice',
        '/AGIR2024/printingInformationChoice': '/AGIR2024/printingMethodsGettingTimetable',
        '/AGIR2024/printingMethodsGettingTimetable': '/AGIR2024/printingScanQRcode',
        '/AGIR2024/printingScanQRcode': '/AGIR2024/homepage',


        // use cas paiement d'une amende
        '/AGIR2024/identificationMenu': '/AGIR2024/scanQrCode',
        '/AGIR2024/scanQrCode': '/AGIR2024/identificationValidation',
        '/AGIR2024/identificationValidation': '/AGIR2024/informationSummary',
        '/AGIR2024/informationSummary': '/AGIR2024/paymentChoice',
        '/AGIR2024/thanksPaymentReport': '/AGIR2024/homepage',

        '/AGIR2024/waitingScreenPrinting': '/AGIR2024/homepage',
    };


    private moovHopPreviousRouterDict: any = {

    };

    private fcMoovHopRouterDict: any = {

    }
    previewImageScanId: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    nameUser: string = "";
    idUserToCheck: string = "";
    errorFace: boolean = false;
    errorScanId: boolean = false;
    previewImageScanIdA: string = "";
    previewImageScanIdB: string = "";
    previewImageScanIdADef: string = "";
    previewImageScanIdBDef: string = "";
    idChecks: string = "";
    referenceId: string = "";

    timeScanIdA: Date = new Date();
    timeScanIdB: Date = new Date();

    errorSaveIdCard: boolean = false;

    hrefSensitiveData: string = '';

    firstName: string = "";
    birthday: string = "";

    identityValidate: boolean = false;



    constructor(private router: Router, private appService: AppService, private _router: ActivatedRoute) {
        //navigation
        let _this = this;
        this.currentView = appService.getCurrentView();
        window.addEventListener("moovHopNav", function (e: any) {
            _this.navigateAfterDelay(e.detail.delay, e.detail.goTo)
        })
    }

    preloadImages() {

    }

    timeoutNavigation() {
        this.timeout = setTimeout(() => {
            if (this.router.url !== '/AGIR2024/homepage') {
                this.navigateAfterDelay(0, "/AGIR2024/homepage");
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
        if (this.moovHopRouterDic[this.router.url]) {
            return this.moovHopRouterDic[this.router.url];
        }
        else {
            return "/AGIR2024/homepage";
        }
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };


    htmlReceiptContent: string = '';

}