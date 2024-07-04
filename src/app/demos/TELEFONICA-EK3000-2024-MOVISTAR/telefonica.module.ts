import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AllPageMovistarComponent } from './ES/all-page-movistar/all-page-movistar.component';
import { homePageTelefonica } from './ES/pagina-principal/pagina-principal.component';
import { FullPrepaymentComponent } from './ES/full-prepayment/full-prepayment.component';
import { PrepaidTariffsComponent } from './ES/prepaid-tariffs/prepaid-tariffs.component';
import { WantContractComponent } from './ES/want-contract/want-contract.component';
import { HomeCheckIdentityComponent } from './ES/home-check-identity/home-check-identity.component';
import { FaceCaptureComponent } from './ES/face-capture/face-capture.component';
import { FaceResultComponent } from './ES/face-result/face-result.component';
import { RegistryDocumentComponent } from './ES/registry-document/registry-document.component';
import { ScanDocumentoComponent } from './ES/scan-documento/scan-documento.component';
import { IdentityValidationComponent } from './ES/identity-validation/identity-validation.component';

import { InformationConsentComponent } from './ES/information-consent/information-consent.component';
import { FormPersonalInformationComponent } from './ES/form-personal-information/form-personal-information.component';

import { LegalConditionComponent } from './ES/legal-condition/legal-condition.component';
import { PaymentComponent } from './ES/payment/payment.component';
import { WelcomeComponent } from './ES/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ValidationScreenComponent } from './ES/validation-screen/validation-screen.component';
import { EnAllPageMovistarComponent } from './EN/all-page-movistar/all-page-movistar.component';
import { EnHomeCheckIdentityComponent } from './EN/home-check-identity/home-check-identity.component';
import { EnFaceCaptureComponent } from './EN/face-capture/face-capture.component';
import { EnFaceResultComponent } from './EN/face-result/face-result.component';
import { EnRegistryDocumentComponent } from './EN/registry-document/registry-document.component';
import { EnScanDocumentoComponent } from './EN/scan-documento/scan-documento.component';
import { EnIdentityValidationComponent } from './EN/identity-validation/identity-validation.component';
import { EnInformationConsentComponent } from './EN/information-consent/information-consent.component';
import { EnFormPersonalInformationComponent } from './EN/form-personal-information/form-personal-information.component';
import { EnLegalConditionComponent } from './EN/legal-condition/legal-condition.component';
import { EnPaymentComponent } from './EN/payment/payment.component';
import { EnWelcomeComponent } from './EN/welcome/welcome.component';
import { EnValidationScreenComponent } from './EN/validation-screen/validation-screen.component';
import { EnFullPrepaymentComponent } from './EN/full-prepayment/full-prepayment.component';
import { EnPrepaidTariffsComponent } from './EN/prepaid-tariffs/prepaid-tariffs.component';
import { EnWantContractComponent } from './EN/want-contract/want-contract.component';
import { EnHomePageTelefonica } from './EN/pagina-principal/pagina-principal.component';



@NgModule({
  declarations: [
    AllPageMovistarComponent,
    homePageTelefonica,
    FullPrepaymentComponent,
    PrepaidTariffsComponent,
    WantContractComponent,
    HomeCheckIdentityComponent,
    FaceCaptureComponent,
    FaceResultComponent,
    RegistryDocumentComponent,
    ScanDocumentoComponent,
    IdentityValidationComponent,
    InformationConsentComponent,
    FormPersonalInformationComponent,
    LegalConditionComponent,
    PaymentComponent,
    WelcomeComponent,
    ValidationScreenComponent,
    EnHomeCheckIdentityComponent,
    EnFaceCaptureComponent,
    EnFaceResultComponent,
    EnRegistryDocumentComponent,
    EnScanDocumentoComponent,
    EnIdentityValidationComponent,
    EnInformationConsentComponent,
    EnFormPersonalInformationComponent,
    EnLegalConditionComponent,
    EnPaymentComponent,
    EnWelcomeComponent,
    EnValidationScreenComponent,
    EnFullPrepaymentComponent,
    EnPrepaidTariffsComponent,
    EnWantContractComponent,
    EnHomePageTelefonica,
    EnAllPageMovistarComponent

  ],
  exports: [AllPageMovistarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Telefonica3000MovistarModule { }
