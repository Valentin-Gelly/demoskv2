import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentSubscriptionConfirmationComponent } from './payment/payment-subscription-confirmation/payment-subscription-confirmation.component';
import {PaymentCardComponent} from './payment/payment-card/payment-card.component';
import {CreateAccountQRCodeYesNoComponent} from './subcription/create-account-qr-code-yes-no/create-account-qr-code-yes-no.component';
import {CreateAccountQRCodeScanComponent} from './subcription/create-account-qr-code-scan/create-account-qr-code-scan.component';
import {PaymentChoiceComponent} from './payment/payment-choice/payment-choice.component';
import {PaymentAppMobileComponent} from './payment/payment-app-mobile/payment-app-mobile.component';
import {PaymentMobileOpComponent} from './payment/payment-mobile-op/payment-mobile-op.component';
import {PaymentMobileOpValidationComponent} from './payment/payment-mobile-op-validation/payment-mobile-op-validation.component';
import {CreateAccountMenuComponent} from './subcription/create-account-menu/create-account-menu.component'
import {CreateAccountCameraComponent} from './subcription/create-account-camera/create-account-camera.component';
import {CreateAccountPersonalInformationsComponent} from './subcription/create-account-personal-informations/create-account-personal-informations.component';
import {CreateAccountProofAddressComponent} from './subcription/create-account-proof-address/create-account-proof-address.component';
import {CreateAccountSubscriptionChoiceComponent} from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import {CreateAccountScanFinishComponent} from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import {CreateAccountHelloComponent} from './subcription/create-account-hello/create-account-hello.component';

import {PrintingMenuComponent} from './printing/printing-menu/printing-menu.component';
import {PrintingInformationChoiceComponent} from './printing/printing-information-choice/printing-information-choice.component';
import { PrintingMethodsGettingTimetableComponent } from './printing/printing-methods-getting-timetable/printing-methods-getting-timetable.component';
import { PrintingThanksComponent } from './printing/printing-thanks/printing-thanks.component';
import { PrintingScanQRcodeComponent } from './printing/printing-scan-qrcode/printing-scan-qrcode.component';
import { InformationSummaryComponent } from './official-report/information-summary/information-summary.component';
import { IdentificationMenuComponent } from './official-report/identification-menu/identification-menu.component';
import { IdentificationValidationComponent } from './official-report/identification-validation/identification-validation.component';
import { ScanQrCodeComponent } from './official-report/scan-qr-code/scan-qr-code.component';
import { WaitingScreenPrintingComponent } from './printing/waiting-screen-printing/waiting-screen-printing.component';
import { ThanksPaymentReportComponent } from './official-report/thanks-payment-report/thanks-payment-report.component';

export const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path:'subScriptionConfirmation', component: PaymentSubscriptionConfirmationComponent},
  {path: 'paymentCB', component: PaymentCardComponent},
  {path:'createAccountQRCodeYesNo', component:CreateAccountQRCodeYesNoComponent},
  {path:'createAccountQRCodeScan', component:CreateAccountQRCodeScanComponent},
  {path:'paymentChoice' , component: PaymentChoiceComponent},
  {path:'paymentAppMobile',component:PaymentAppMobileComponent },
  {path:'paymentMobileOp', component:PaymentMobileOpComponent},
  {path:'paymentMobileOpValidation', component:PaymentMobileOpValidationComponent},
  {path:'createAccountMenu', component: CreateAccountMenuComponent},
  {path:'createAccountCamera', component: CreateAccountCameraComponent},
  {path:'createAccountPersonalInformations', component:CreateAccountPersonalInformationsComponent},
  {path:'createAccountProofAddress', component:CreateAccountProofAddressComponent},
  {path:'createAccountSubscriptionChoice', component:CreateAccountSubscriptionChoiceComponent},
  {path:'createAccountScanFinish', component:CreateAccountScanFinishComponent},
  {path:'createAccountHello', component:CreateAccountHelloComponent},
  {path:'printingMenu', component:PrintingMenuComponent},
  {path:'printingInformationChoice', component:PrintingInformationChoiceComponent},
  {path:'printingMethodsGettingTimetable', component:PrintingMethodsGettingTimetableComponent},
  {path:'printingThanks', component:PrintingThanksComponent},
  {path:'printingScanQRcode', component:PrintingScanQRcodeComponent},
  {path:'informationSummary', component:InformationSummaryComponent},
  {path:'identificationMenu', component:IdentificationMenuComponent},
  {path:'identificationValidation', component:IdentificationValidationComponent},
  {path:'scanQrCode', component:ScanQrCodeComponent},
  {path:'waitingScreenPrinting', component:WaitingScreenPrintingComponent},
  {path:'thanksPaymentReport', component:ThanksPaymentReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop4000RoutingModule { }
