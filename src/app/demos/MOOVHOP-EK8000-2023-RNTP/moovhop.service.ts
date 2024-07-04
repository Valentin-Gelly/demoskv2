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
    route: any = '/createAccountPersonalInformations';

    currentView = "";

    automaticCard = 'false';


    paidWithCB: boolean = false;
    priceSubscription: number = 0;

    private moovHopRouterDic: any = {
        // use case achat d'un pass (création d'un compte)
        '/homepage':'/buyChoice',
        '/buyChoice': '/paymentChoice8000',
        '/paymentChoice8000': '/paymentCard',
        '/paymentCash': '/waitingScreen',
        '/waitingScreen': '/getTicketReceipt',
        '/getTicketReceipt': '/homepage',

        // use case achat d'un pass (sans création d'un compte)
        'createAccountMenu8000':'/CreateAccountCamera8000',
        '/CreateAccountCamera8000':'/CreateAccountHello8000',
        '/CreateAccountHello8000':'/CreateAccountInformationValidation',
        '/CreateAccountInformationValidation':'/CreateAccountSubscriptionChoice8000',
        '/CreateAccountSubscriptionChoice8000':'/paymentChoice8000',
        
        // use case rechargement d'un pass
        '/reloadIdentification': '/reloadPersonalInformations',
        '/reloadPersonalInformations': '/createAccountSubscriptionChoice8000',

    };


    private moovHopPreviousRouterDict: any = {

    };
    textCB: string = '';
    scanVisited: number = 0;
    isScanFinished: boolean = false;
    newerCiImageCapture: string = '';
    previewImageScanId: string = '';
    previewImageProfile: string = '';
    whatSubscription: string = '';

    ticketPrice: number = 1;
    bnTickets: number = 1;
    textTickets: string = '';
    textSubscription: string = '';
    ActionChoosed: any;
    TicketChoosed: number = 1;
    htmlReceiptContent: string = '';

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
            "./assets/MOOVHOP-EK8000-2023-RNTP/AllerRetour.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/AllerSimple.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Carnet10tickets.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass24H.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass48h.png",
            "./assets/MOOVHOP-EK8000-2023-RNTP/Pass72h.png",
        ];
        for (let i = 0; i < images.length; i++) {
            let img = new Image();
            img.src = images[i];
        }
    }

    timeoutNavigation() {
        this.timeout = setTimeout(() => {
            if(this.router.url !== '/homepage'){
                this.navigateAfterDelay(0, "/homepage");
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

}