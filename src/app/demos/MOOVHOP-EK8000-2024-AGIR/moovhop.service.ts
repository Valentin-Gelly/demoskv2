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
    route: any = '/EK80002024AGIR/reloadPersonalInformations';
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
    faceCapture : string =""
    private moovHopRouterDic: any = {
        '/EK80002024AGIR/homepage': '/EK80002024AGIR/buyChoice',
        '/EK80002024AGIR/buyChoice': '/EK80002024AGIR/paymentChoice',
        '/EK80002024AGIR/paymentChoice': '/EK80002024AGIR/paymentCard',
        '/EK80002024AGIR/paymentCard': '/EK80002024AGIR/getTicketReceipt',
        '/EK80002024AGIR/createAccountScanFinish': '/EK80002024AGIR/createAccountSubscriptionChoice',
        '/EK80002024AGIR/paymentOpMobile': '/EK80002024AGIR/createAccountThanks',
        '/EK80002024AGIR/paymentOpMobileValidation': '/EK80002024AGIR/createAccountThanks',
        '/EK80002024AGIR/paymentAppMobile': '/EK80002024AGIR/createAccountThanks',
        '/EK80002024AGIR/paymentCash': '/EK80002024AGIR/createAccountThanks',


        '/EK80002024AGIR/createAccountMenu': '/EK80002024AGIR/createAccountCamera',
        '/EK80002024AGIR/createAccountHello': '/EK80002024AGIR/createAccountSubscriptionChoice',
        '/EK80002024AGIR/createAccountSubscriptionChoice': '/EK80002024AGIR/paymentChoice',

        '/EK80002024AGIR/reloadIdentification': '/EK80002024AGIR/reloadPersonalInformations',
        '/EK80002024AGIR/reloadPersonalInformations': '/EK80002024AGIR/createAccountSubscriptionChoice',


    };
    private moovHopPreviousRouterDict: any = {};
    private fcMoovHopRouterDict: any = {}
    textTickets: string = '';
    ticketPrice: number = 0;
    bnTickets: number = 1;
    automaticCard: string = 'true';
    TicketChoosed: number = 1;
    previewImageScanId: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    previewImageProfile: string = "./assets/MOOVHOP-EK4000-2023-RNTP/loadingPreview.png";
    nameUser: string = "";
    idUserToCheck: string ="";
    errorFace: boolean = false;
    errorScanId: boolean = false;
    previewImageScanIdA: string ="";
    previewImageScanIdB: string ="";
    previewImageScanIdADef: string ="";
    previewImageScanIdBDef: string ="";
    idChecks:string = "";
    referenceId:string = "";
    timeScanIdA:Date = new Date();
    timeScanIdB:Date = new Date();
    errorSaveIdCard:boolean = false;
    hrefSensitiveData:string = '';
    firstName:string = "";
    birthday:string = "";
    identityValidate:boolean = false;

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
            "./assets/MOOVHOP-EK4000-2024-RNTP/cite1.png",
            "./assets/MOOVHOP-EK4000-2024-RNTP/cite2.png",
            "./assets/MOOVHOP-EK4000-2024-RNTP/cite3.png",
            "./assets/MOOVHOP-EK4000-2024-RNTP/cite4.png",
        ];
        for (let i = 0; i < images.length; i++) {
            let img = new Image();
            img.src = images[i];
        }
    }

    timeoutNavigation() {
        this.timeout = setTimeout(() => {
            if(this.router.url !== '/EK80002024AGIR/homepageEK4000'){
                this.navigateAfterDelay(0, "/EK80002024AGIR/homepageEK4000");
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
            return "/EK80002024AGIR/homepage";
        }
    };

    get previousRoute() {
        return this.moovHopPreviousRouterDict[this.router.url];
    };

    
    htmlReceiptContent: string = '';

 
    





}