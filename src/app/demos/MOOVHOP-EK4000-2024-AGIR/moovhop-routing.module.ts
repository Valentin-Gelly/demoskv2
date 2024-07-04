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
import { CreateAccountFaceCaptureComponent } from './subcription/create-account-face-capture/create-account-face-capture.component';
import { CreateAccountValidationScreen } from './subcription/validation-screen/validation-screen.component';

export const routes: Routes = [
  {path:'AGIR2024/homepage', component: HomepageComponent},
  {path:'AGIR2024/subScriptionConfirmation', component: PaymentSubscriptionConfirmationComponent},
  {path:'AGIR2024/paymentCB', component: PaymentCardComponent},
  {path:'AGIR2024/createAccountQRCodeYesNo', component:CreateAccountQRCodeYesNoComponent},
  {path:'AGIR2024/createAccountQRCodeScan', component:CreateAccountQRCodeScanComponent},
  {path:'AGIR2024/paymentChoice' , component: PaymentChoiceComponent},
  {path:'AGIR2024/paymentAppMobile',component:PaymentAppMobileComponent },
  {path:'AGIR2024/paymentMobileOp', component:PaymentMobileOpComponent},
  {path:'AGIR2024/paymentMobileOpValidation', component:PaymentMobileOpValidationComponent},
  {path:'AGIR2024/createAccountMenu', component: CreateAccountMenuComponent},
  {path:'AGIR2024/createAccountCamera', component: CreateAccountCameraComponent},
  {path:'AGIR2024/createAccountPersonalInformations', component:CreateAccountPersonalInformationsComponent},
  {path:'AGIR2024/createAccountProofAddress', component:CreateAccountProofAddressComponent},
  {path:'AGIR2024/createAccountSubscriptionChoice', component:CreateAccountSubscriptionChoiceComponent},
  {path:'AGIR2024/createAccountScanFinish', component:CreateAccountScanFinishComponent},
  {path:'AGIR2024/createAccountHello', component:CreateAccountHelloComponent},
  {path:'AGIR2024/printingMenu', component:PrintingMenuComponent},
  {path:'AGIR2024/printingInformationChoice', component:PrintingInformationChoiceComponent},
  {path:'AGIR2024/printingMethodsGettingTimetable', component:PrintingMethodsGettingTimetableComponent},
  {path:'AGIR2024/printingThanks', component:PrintingThanksComponent},
  {path:'AGIR2024/printingScanQRcode', component:PrintingScanQRcodeComponent},
  {path:'AGIR2024/informationSummary', component:InformationSummaryComponent},
  {path:'AGIR2024/identificationMenu', component:IdentificationMenuComponent},
  {path:'AGIR2024/identificationValidation', component:IdentificationValidationComponent},
  {path:'AGIR2024/scanQrCode', component:ScanQrCodeComponent},
  {path:'AGIR2024/waitingScreenPrinting', component:WaitingScreenPrintingComponent},
  {path:'AGIR2024/thanksPaymentReport', component:ThanksPaymentReportComponent},
  {path:'AGIR2024/createAccountFaceCapture', component:CreateAccountFaceCaptureComponent},
  {path:'AGIR2024/createAccountValidationScreen', component:CreateAccountValidationScreen}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop4000RoutingModuleAGIR2024 { }
