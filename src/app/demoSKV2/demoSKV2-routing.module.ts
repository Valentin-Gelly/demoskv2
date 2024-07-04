import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OptionListComponent } from './option-list/option-list.component';
import { AllPagesAppComponent } from './all-pages-app/all-pages-app.component';
import { BarcodeComponent } from './tests-ivq/barcode/barcode.component';
import { FormComponent } from './tests-ivq/form/form.component';
import { GalleryComponent } from './tests-ivq/gallery/gallery.component';
import { LightComponent } from './tests-ivq/light/light.component';
import { TouchComponent } from './tests-ivq/touch/touch.component';
import { SketchpadComponent } from './tests-ivq/sketchpad/sketchpad.component';
import { VideoCallComponent } from './tests-ivq/video-call/video-call.component';
import { AppDemoChoiceComponent } from './app-demo-choice/app-demo-choice.component';
import { TestIvqChoiceComponent } from './test-ivq-choice/test-ivq-choice.component';
import { FeaturesChoiceComponent } from './features-choice/features-choice.component';
import { CustomerExperienceChoiceComponent } from './customer-experience-choice/customer-experience-choice.component';
import { FeatureRunComponent } from './feature-run/feature-run.component';
import { VirtualKeyboardFeatureComponent } from './virtual-keyboard-feature/virtual-keyboard-feature.component';


const routes: Routes = [
  {path:'demoSKV2Homepage', component:HomepageComponent},
  {path:'demoSKV2ChooseView', component:ChooseViewComponent},
  {path:'demoSKV2OptionList', component:OptionListComponent},
  {path:'demoSKV2AllPagesApp', component:AllPagesAppComponent},
  {path:'barcodeTest', component:BarcodeComponent},
  {path:'formTest', component:FormComponent},
  {path:'galleryTest', component:GalleryComponent},
  {path:'lightTest', component:LightComponent},
  {path:'touchpadTest', component:TouchComponent},
  {path:'skecthpadTest', component:SketchpadComponent},
  {path:'videoCallTest', component:VideoCallComponent},
  {path:'customerExperienceChoice', component:CustomerExperienceChoiceComponent}, 
  {path:'featuresChoice', component:FeaturesChoiceComponent},
  {path:'testIvqChoice', component:TestIvqChoiceComponent},
  { path: 'appDemoChoice', component: AppDemoChoiceComponent },
  {path:'featureRun', component:FeatureRunComponent},
  {path:'virtualKeyboardFeature', component:VirtualKeyboardFeatureComponent}
];

@NgModule({
  imports:
  [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoSKV2RoutingModule { }


