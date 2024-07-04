import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoSKV2RoutingModule } from './demoSKV2/demoSKV2-routing.module';
import { LabiziRoutingModule } from './demos/labizi/labizi-routing.module';
import { MoovopRoutingModule as MoovHopEK1000Routing} from './demos/moovop/moovop-routing.module';
import { MoovHopRoutingModule as MoovHopEK8000Routing} from './demos/moovHop/moovHop-routing.module';
import {MoovHop4000RoutingModule as MoovHopEK4000RoutingRNTP} from './demos/MOOVHOP-EK4000-2023-RNTP/moovhop-routing.module';
import { MoovHop8000RoutingModule as MoovHopEK8000RoutingRNTP } from './demos/MOOVHOP-EK8000-2023-RNTP/moovhop-routing.module';
import { TelefonicaEk3000MovistarRoutingModule as TelefonicaEK3000MovistarRouting } from './demos/TELEFONICA-EK3000-2024-MOVISTAR/telefonica-routing.module';
import {MoovHop4000RoutingModuleMWC2024 as MoovHopEK4000RoutingMWC } from './demos/MOOVHOP-EK4000-2024-MWC/moovhop-routing.module';
import { MoovHop4000RoutingModuleAGIR2024 } from './demos/MOOVHOP-EK4000-2024-AGIR/moovhop-routing.module';
import { MoovHop8000RoutingModuleAGIR2024} from './demos/MOOVHOP-EK8000-2024-AGIR/moovhop-routing.module';

const routes: Routes = [
];

@NgModule({
  imports:
  [RouterModule.forRoot(routes),
  DemoSKV2RoutingModule,
  LabiziRoutingModule,
  MoovHopEK1000Routing,
  MoovHopEK8000Routing,
  MoovHopEK4000RoutingRNTP,
  MoovHopEK8000RoutingRNTP,
  TelefonicaEK3000MovistarRouting,
  MoovHopEK4000RoutingMWC,
  MoovHop4000RoutingModuleAGIR2024,
  MoovHop8000RoutingModuleAGIR2024
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
