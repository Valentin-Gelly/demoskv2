import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionListComponent } from './option-list/option-list.component'
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { AllPagesAppComponent } from './all-pages-app/all-pages-app.component';
import { CustomerExperienceChoiceComponent } from './customer-experience-choice/customer-experience-choice.component';
import { FeaturesChoiceComponent } from './features-choice/features-choice.component';
import { TestIvqChoiceComponent } from './test-ivq-choice/test-ivq-choice.component';
import { AppDemoChoiceComponent } from './app-demo-choice/app-demo-choice.component';
import { FeatureRunComponent } from './feature-run/feature-run.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

 
@NgModule({
  declarations: [
    HomepageComponent,
    ChooseViewComponent,
    AllPagesAppComponent,
    OptionListComponent,
    CustomerExperienceChoiceComponent,
    FeaturesChoiceComponent,
    TestIvqChoiceComponent,
    AppDemoChoiceComponent,
    FeatureRunComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [
  ]
})
export class DemoSKV2Module { }
