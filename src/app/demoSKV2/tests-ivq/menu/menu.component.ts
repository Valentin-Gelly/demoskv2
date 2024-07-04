import { Component, OnInit } from '@angular/core';
import { ɵNgSelectMultipleOption } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isActive: boolean = false
  menu = [{ icon: "home", route: "" }, { icon: "touch_app", route: "touch" }, {icon: "draw", route: "sketchpad"}, { icon: "video_library", route: "gallery" }, { icon: "assignment", route: "form" }, { icon: "video_chat", route: "video-call" }, { icon: "lightbulb", route: "light" }]
  selectedItem: string = "home"


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    (function makeItAppears() {
      setTimeout(function () {
        document.querySelector("i")!.style.visibility = "visible";
      }, 100);
    })();
  }

}