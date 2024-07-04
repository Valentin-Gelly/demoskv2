import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DemoSKV2Module } from './demoSKV2/demoSKV2.module';
import { LabiziModule } from './demos/labizi/labizi.module';
import { MoovopModule } from './demos/moovop/moovop.module';
import { MoovopModule as MoovHopModule8000 } from './demos/moovHop/moovHop.module';
import { MoovHop4000Module as MoovHopModule4000 } from './demos/MOOVHOP-EK4000-2023-RNTP/moovhop.module';
import { Telefonica3000MovistarModule as Telefonica3000 } from './demos/TELEFONICA-EK3000-2024-MOVISTAR/telefonica.module';
import { MoovHopModule4000MWC as MoovHopModule4000MWC } from './demos/MOOVHOP-EK4000-2024-MWC/moovhop.module';
import { RouterModule, Routes } from '@angular/router';
import {CustomPreloadingStrategy} from './custom-preloading-strategy';
import { MoovHopModule4000AGIR2024 } from './demos/MOOVHOP-EK4000-2024-AGIR/moovhop.module';
import { MoovHop8000ModuleAGIR2024 } from './demos/MOOVHOP-EK8000-2024-AGIR/moovhop.module';
import { VirtualKeyboardFeatureComponent } from './demoSKV2/virtual-keyboard-feature/virtual-keyboard-feature.component';

const routes: Routes = [
    {
      path: 'homepageEK8000',
      loadChildren: () => import('./demos/MOOVHOP-EK8000-2023-RNTP/moovhop.module').then(m => m.MoovHop8000Module)
    }
  ];


@NgModule({
    declarations: [
        AppComponent,
        VirtualKeyboardFeatureComponent,
        
    ],
    providers: [CustomPreloadingStrategy],
    bootstrap: [AppComponent],
    imports: [
        [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        LabiziModule,
        DemoSKV2Module,
        MoovopModule,
        MoovHopModule8000,
        MoovHopModule4000,
        Telefonica3000,
        MoovHopModule4000MWC,
        MoovHopModule4000AGIR2024,
        MoovHop8000ModuleAGIR2024
    ],
})
export class AppModule { }
