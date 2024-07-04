import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MoovHopAllPagesComponent } from './moov-hop-all-pages/moov-hop-all-pages.component';
import { CreateAccountScanFinishComponent } from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import { CreateAccountPersonalInformationsComponent } from './subcription/create-account-personal-informations/create-account-personal-informations.component';
import { CreateAccountCameraComponent } from './subcription/create-account-camera/create-account-camera.component';
import { CreateAccountHelloComponent } from './subcription/create-account-hello/create-account-hello.component';
import { CreateAccountProofAddressComponent } from './subcription/create-account-proof-address/create-account-proof-address.component';
import { CreateAccountSubscriptionChoiceComponent } from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import { CreateAccountQRCodeYesNoComponent } from './subcription/create-account-qr-code-yes-no/create-account-qr-code-yes-no.component';
import { CreateAccountQRCodeScanComponent } from './subcription/create-account-qr-code-scan/create-account-qr-code-scan.component';
import { PaymentChoiceComponent } from './payment/payment-choice/payment-choice.component';
import { PaymentCardComponent } from './payment/payment-card/payment-card.component';
import { PaymentAppMobileComponent } from './payment/payment-app-mobile/payment-app-mobile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateAccountMenuComponent } from './subcription/create-account-menu/create-account-menu.component';
import { PrintingMenuComponent } from './printing/printing-menu/printing-menu.component';
import { PaymentMobileOpComponent } from './payment/payment-mobile-op/payment-mobile-op.component';
import { PaymentMobileOpValidationComponent } from './payment/payment-mobile-op-validation/payment-mobile-op-validation.component';
import { PaymentSubscriptionConfirmationComponent } from './payment/payment-subscription-confirmation/payment-subscription-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrintingInformationChoiceComponent } from './printing/printing-information-choice/printing-information-choice.component';
import { PrintingMethodsGettingTimetableComponent } from './printing/printing-methods-getting-timetable/printing-methods-getting-timetable.component';
import { PrintingThanksComponent } from './printing/printing-thanks/printing-thanks.component';
import { PrintingScanQRcodeComponent } from './printing/printing-scan-qrcode/printing-scan-qrcode.component';
import { IdentificationMenuComponent } from './official-report/identification-menu/identification-menu.component';
import { IdentificationValidationComponent } from './official-report/identification-validation/identification-validation.component';
import { InformationSummaryComponent } from './official-report/information-summary/information-summary.component';
import { ScanQrCodeComponent } from './official-report/scan-qr-code/scan-qr-code.component';
import { WaitingScreenPrintingComponent } from './printing/waiting-screen-printing/waiting-screen-printing.component';
import { ThanksPaymentReportComponent } from './official-report/thanks-payment-report/thanks-payment-report.component';


@NgModule({
  declarations: [
    MoovHopAllPagesComponent,
    CreateAccountScanFinishComponent,
    CreateAccountPersonalInformationsComponent,
    CreateAccountCameraComponent,
    CreateAccountHelloComponent,
    CreateAccountProofAddressComponent,
    CreateAccountSubscriptionChoiceComponent,
    CreateAccountQRCodeYesNoComponent,
    CreateAccountQRCodeScanComponent,
    PaymentChoiceComponent,
    PaymentCardComponent,
    PaymentAppMobileComponent,
    HomepageComponent,
    CreateAccountMenuComponent,
    PrintingMenuComponent,
    PaymentMobileOpComponent,
    PaymentMobileOpValidationComponent,
    PaymentSubscriptionConfirmationComponent,
    CreateAccountCameraComponent,
    PrintingInformationChoiceComponent,
    PrintingMethodsGettingTimetableComponent,
    PrintingThanksComponent,
    PrintingScanQRcodeComponent,
    IdentificationMenuComponent,
    IdentificationValidationComponent,
    InformationSummaryComponent,
    ScanQrCodeComponent,
    WaitingScreenPrintingComponent,
    ThanksPaymentReportComponent,

  ],
  exports:[MoovHopAllPagesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    //MoovHop4000RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoovHop4000Module { }

