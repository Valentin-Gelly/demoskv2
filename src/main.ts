import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { SoftKioskService } from './app/softkiosk.service';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const skService = moduleRef.injector.get(SoftKioskService);
    let serviceList = skService.getServicesList();
    serviceList.forEach((service: any) => {
      if (serviceList.hasOwnProperty(service)) {
        console.log(service + " is present in serviceList.");
      } else {
        console.log(service + " is not present in serviceList.");
      }
    });
    skService.setAppStatus("demoSKV2", "Ok", "", "");
  })
  .catch(err => console.error(err));
