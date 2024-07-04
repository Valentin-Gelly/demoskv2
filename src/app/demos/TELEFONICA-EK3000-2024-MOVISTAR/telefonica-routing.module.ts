import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Spanish part
import { homePageTelefonica } from './ES/pagina-principal/pagina-principal.component';
import { PrepaidTariffsComponent } from './ES/prepaid-tariffs/prepaid-tariffs.component';
import { FullPrepaymentComponent } from './ES/full-prepayment/full-prepayment.component';
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
import { ValidationScreenComponent } from './ES/validation-screen/validation-screen.component';

// English part
import { EnHomePageTelefonica } from './EN/pagina-principal/pagina-principal.component';
import { EnPrepaidTariffsComponent } from './EN/prepaid-tariffs/prepaid-tariffs.component';
import { EnFullPrepaymentComponent } from './EN/full-prepayment/full-prepayment.component';
import { EnWantContractComponent } from './EN/want-contract/want-contract.component';
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

export const routes: Routes = [
  { path: 'ES/homePageTelefonica', component: homePageTelefonica },
  { path: 'ES/fullPrepayment', component: FullPrepaymentComponent },
  { path: 'ES/prepaidTariffs', component: PrepaidTariffsComponent },
  { path: 'ES/wantContract', component: WantContractComponent },
  { path: 'ES/homeCheckIdentity', component: HomeCheckIdentityComponent },
  { path: 'ES/faceCapture', component: FaceCaptureComponent },
  { path: 'ES/faceResult', component: FaceResultComponent },
  { path: 'ES/registryDocument', component: RegistryDocumentComponent },
  { path: 'ES/scanDocumento', component: ScanDocumentoComponent },
  { path: 'ES/identityValidation', component: IdentityValidationComponent },
  { path: 'ES/informationConsent', component: InformationConsentComponent },
  { path: 'ES/formPersonalInformation', component: FormPersonalInformationComponent },
  { path: 'ES/legalCondition', component: LegalConditionComponent },
  { path: 'ES/payment', component: PaymentComponent },
  { path: 'ES/welcome', component: WelcomeComponent },

  { path: 'ES/validationScreen', component: ValidationScreenComponent },
  { path: 'EN/homePageTelefonica', component: EnHomePageTelefonica },
  { path: 'EN/fullPrepayment', component: EnFullPrepaymentComponent },
  { path: 'EN/prepaidTariffs', component: EnPrepaidTariffsComponent },
  { path: 'EN/wantContract', component: EnWantContractComponent },
  { path: 'EN/homeCheckIdentity', component: EnHomeCheckIdentityComponent },
  { path: 'EN/faceCapture', component: EnFaceCaptureComponent },
  { path: 'EN/faceResult', component: EnFaceResultComponent },
  { path: 'EN/registryDocument', component: EnRegistryDocumentComponent },
  { path: 'EN/scanDocumento', component: EnScanDocumentoComponent },
  { path: 'EN/identityValidation', component: EnIdentityValidationComponent },
  { path: 'EN/informationConsent', component: EnInformationConsentComponent },
  { path: 'EN/formPersonalInformation', component: EnFormPersonalInformationComponent },
  { path: 'EN/legalCondition', component: EnLegalConditionComponent },
  { path: 'EN/payment', component: EnPaymentComponent },
  { path: 'EN/welcome', component: EnWelcomeComponent },
  { path: 'EN/validationScreen', component: EnValidationScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TelefonicaEk3000MovistarRoutingModule { }
