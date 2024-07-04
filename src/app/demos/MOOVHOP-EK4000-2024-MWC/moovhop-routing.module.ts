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
  {path:'MWC2024/homepage', component: HomepageComponent},
  {path:'MWC2024/subScriptionConfirmation', component: PaymentSubscriptionConfirmationComponent},
  {path:'MWC2024/paymentCB', component: PaymentCardComponent},
  {path:'MWC2024/createAccountQRCodeYesNo', component:CreateAccountQRCodeYesNoComponent},
  {path:'MWC2024/createAccountQRCodeScan', component:CreateAccountQRCodeScanComponent},
  {path:'MWC2024/paymentChoice' , component: PaymentChoiceComponent},
  {path:'MWC2024/paymentAppMobile',component:PaymentAppMobileComponent },
  {path:'MWC2024/paymentMobileOp', component:PaymentMobileOpComponent},
  {path:'MWC2024/paymentMobileOpValidation', component:PaymentMobileOpValidationComponent},
  {path:'MWC2024/createAccountMenu', component: CreateAccountMenuComponent},
  {path:'MWC2024/createAccountCamera', component: CreateAccountCameraComponent},
  {path:'MWC2024/createAccountPersonalInformations', component:CreateAccountPersonalInformationsComponent},
  {path:'MWC2024/createAccountProofAddress', component:CreateAccountProofAddressComponent},
  {path:'MWC2024/createAccountSubscriptionChoice', component:CreateAccountSubscriptionChoiceComponent},
  {path:'MWC2024/createAccountScanFinish', component:CreateAccountScanFinishComponent},
  {path:'MWC2024/createAccountHello', component:CreateAccountHelloComponent},
  {path:'MWC2024/printingMenu', component:PrintingMenuComponent},
  {path:'MWC2024/printingInformationChoice', component:PrintingInformationChoiceComponent},
  {path:'MWC2024/printingMethodsGettingTimetable', component:PrintingMethodsGettingTimetableComponent},
  {path:'MWC2024/printingThanks', component:PrintingThanksComponent},
  {path:'MWC2024/printingScanQRcode', component:PrintingScanQRcodeComponent},
  {path:'MWC2024/informationSummary', component:InformationSummaryComponent},
  {path:'MWC2024/identificationMenu', component:IdentificationMenuComponent},
  {path:'MWC2024/identificationValidation', component:IdentificationValidationComponent},
  {path:'MWC2024/scanQrCode', component:ScanQrCodeComponent},
  {path:'MWC2024/waitingScreenPrinting', component:WaitingScreenPrintingComponent},
  {path:'MWC2024/thanksPaymentReport', component:ThanksPaymentReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop4000RoutingModuleMWC2024 { }
