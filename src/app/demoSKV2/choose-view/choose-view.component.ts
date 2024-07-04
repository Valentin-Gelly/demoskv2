import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-view',
  templateUrl: './choose-view.component.html',
  styleUrls: ['./choose-view.component.scss',  '../../app.component.scss']
})
export class ChooseViewComponent implements OnInit {

  arrayViewImage = [{ view: "user", path: "./assets/DemoSKV2/all-pages-icon/user.png" }, { view: "marketing", path: "../../../assets/DemoSKV2/all-pages-icon/salesman.png" }, { view: "tech", path: "../../../assets/DemoSKV2/all-pages-icon/tech.png" }, { view: "advancedTech", path: "../../../assets/DemoSKV2/all-pages-icon/advancedTech.png" }, { view: "ivq", path: "../../../assets/DemoSKV2/all-pages-icon/ivq.png" }];
  
  arrayAccount = [
    { name:"utilisateur", rectangle:"rectangle25", class:"container rectangle25", click:"chooseView('user')", imgId:"userIcons", text:"Utilisateur", imgSrc:"./assets/DemoSKV2/all-pages-icon/user.png", imgClass:"iconsChoiceView userIcons"},
    { name:"marketing", rectangle:"rectangle27", class:"container rectangle27", click:"chooseView('marketing')", imgId:"marketingIcons", text:"Marketing", imgSrc:"./assets/DemoSKV2/all-pages-icon/salesman.png", imgClass:"iconsChoiceView marketingIcons"},
    { name:"technique", rectangle:"rectangle26", class:"container rectangle26", click:"chooseView('tech')", imgId:"techIcons", text:"Technique", imgSrc:"./assets/DemoSKV2/all-pages-icon/tech.png", imgClass:"iconsChoiceView toolIcon"},
    { name:"technique", rectangle:"rectangle28", class:"container rectangle28", click:"chooseView('advancedTech')", imgId:"advancedTechIcons", text:"Technique avancée", imgSrc:"./assets/DemoSKV2/all-pages-icon/tech.png", imgClass:"iconsChoiceView toolIcon", secondImg:"./assets/DemoSKV2/all-pages-icon/plus.png", secondImgId:"plusIcon", imgClass2:"plusIcon" },
    { name:"ivq", rectangle:"rectangle29", class:"container rectangle29", click:"chooseView('ivq')",imgClass:"iconsChoiceView ivqIcons", imgId:"ivq", text:"IVQ", imgSrc:"./assets/DemoSKV2/all-pages-icon/ivq.png"}]
  
  router: Router;
  constructor(private appService: AppService, _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
    console.log("on est dans le onInit de chooseView");
  }

  chooseView(view: string) {
    this.appService.setCurrentView(view);
    console.log(view);
    // Find the object in the array that matches the 'view' parameter
    const imageView = this.arrayViewImage.find(item => item.view === view);

    if (imageView) {
      const imagePath = imageView.path;
      this.appService.currentViewImage = imagePath;
      console.log(imagePath); // The 'imagePath' variable now contains the path of the image.
      // You can use 'imagePath' here as per your requirement.
    }

    this.router.navigate(['/demoSKV2AllPagesApp']);
  }

}
