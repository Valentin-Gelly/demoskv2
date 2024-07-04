import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app/app.service';


@Component({
  selector: 'app-all-pages-app',
  templateUrl: './all-pages-app.component.html',
  styleUrls: ['./all-pages-app.component.scss', '../../app.component.scss']
})
export class AllPagesAppComponent implements OnInit {

  currentOption: string = "dm";
  currentView: any;
  currentViewImage: any;
  currentMenuButtonList: any;
  arrayTextButton = [{ name: "tech", values: ["Démos", "Parcours clients", "Fonctionnaltés"] }, { name: "advancedTech", values: ["Démos", "Parcours clients", "Fonctionnaltés"] }, { name: "ivq", values: ["Démos", "Parcours clients", "Fonctionnaltés", "Tests"] }];
  arrayTitle = ["Choisissez une vue:"];
  arrayViewImage = [{ view: "user", path: "./assets/DemoSKV2/all-pages-icon/user.png" }, { view: "marketing", path: "./assets/DemoSKV2/all-pages-icon/salesman.png" }, { view: "tech", path: "./assets/DemoSKV2/all-pages-icon/tech.png" }, { view: "advancedTech", path: "./assets/DemoSKV2/all-pages-icon/advancedTech.png" }, { view: "ivq", path: "./assets/DemoSKV2/all-pages-icon/ivq.png" }];
  isMenuChecked = false;

  constructor(private appService: AppService) {
    this.currentView = appService.currentView;
    this.currentMenuButtonList = appService.currentMenu;
    this.currentViewImage = this.getViewPath();
  }

  ngOnInit(): void {
    console.info("on est dans le ngOnInit de all-pages");
  }

  displayOptions(option: string) {
    this.currentOption = option;
  }

  changeCurrentMenuButtonList(newMenu: string, buttonName: string) {
    this.appService.setCurrentMenu(newMenu);
    this.togglePushEffect(buttonName);
  }

  clickViewMenu() {
    this.isMenuChecked = !this.isMenuChecked;
  }

  changeViewApp(view: string) {
    this.appService.changeView(view);
  }

  changeCurrentView(newView: string) {
    this.currentView = newView;
    this.appService.setCurrentView(newView);
    console.info("Current view: " + this.currentView);
    this.clickViewMenu();
    this.changeUserImage(this.getViewPath());
  }

  getViewPath() {
    let foundViewObject = this.arrayViewImage.find(item => item.view === this.currentView);
    // If the view is found, return its path; otherwise, return null (or any other default value)
    console.info("view: " + this.currentView + ", path: " + foundViewObject?.path);
    return foundViewObject ? foundViewObject.path : null;
  }

  changeUserImage(viewPath: string | null) {
    let userImageElement = document.getElementsByClassName("userImage")![0] as HTMLImageElement;
    console.info(viewPath);
    // check whether userImageElement has a value
    if (userImageElement) {
      if (viewPath) {
        // Set the "src" attribute to the "viewPath" value if it exists
        userImageElement.src = viewPath;
      } else {
        // If "viewPath" is null or empty, you can set a default image URL
        userImageElement.src = "";
      }
    }
  }

  togglePushEffect(buttonName: string) {
    const button = document.querySelector('.' + buttonName);
    button?.classList.toggle('pushed');
  }



}
