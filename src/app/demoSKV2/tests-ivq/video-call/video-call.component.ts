import { state } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {


  constructor(private router: Router) { }

  arrayButtonCall = ["telephone-call.png", "finish-call.png"];
  arrayButtonOnCall: any = [{ name: 'finish', on: "finish-call.png" }, { name: 'camera', on: "camera-on.png", off: "camera-off.png", current: "on" }, { name: 'micro', on: "micro-on.png", off: "micro-off.png", current: "on" }];
  title: any = { receiveCall: "VOUS RECEVEZ UN APPEL VIDEO", onCall: "APPEL EN COURS" };
  state: string = "receiveCall";
  n = <any>navigator;
  stream: any; 

  
  ngOnInit(): void {
  }

  onClickImageReceive(name: string): void {
    switch (name) {
      case "telephone-call.png":
        this.state = 'onCall';
        console.log(navigator.mediaDevices.getSupportedConstraints());
        break;
      case "finish-call.png":
        this.state = 'refusedCall'; // OK 
        break;
    }
  }


  hasUserMedia() {
    //check if the browser supports the WebRTC 
    return !!(this.n.getUserMedia || this.n.webkitGetUserMedia ||
      this.n.mozGetUserMedia);
  }

  onClickImageCall(index: number): void {
    switch (index) {
      case 0:
        this.state = 'refusedCall'; // OK 
        break;
      case 1:
        if (this.arrayButtonOnCall[index].current === "on") {
          if (!this.hasUserMedia()) {
            this.n.getUserMedia = this.n.getUserMedia || this.n.webkitGetUserMedia
              || this.n.mozGetUserMedia;
           // ouvrir la caméra
           alert("WebRTC is not supported"); 

          } else {
            navigator.mediaDevices.getUserMedia({
              video: true});
            
          this.arrayButtonOnCall[index].current = "off";
            } 
        
           } else {
          // fermer caméra 
          navigator.mediaDevices.getUserMedia({
            video: false
          });
          this.arrayButtonOnCall[index].current = "on";
        }
        break;
      case 2:
        if (this.arrayButtonOnCall[index].current === "on") {
          if (!this.hasUserMedia()) {
            this.n.getUserMedia = this.n.getUserMedia || this.n.webkitGetUserMedia
              || this.n.mozGetUserMedia;
              alert("WebRTC is not supported"); 
          } else {
              navigator.mediaDevices.getUserMedia({
                audio: true
               });
          this.arrayButtonOnCall[index].current = "off";
              }
        }
        else {
          navigator.mediaDevices.getUserMedia({
            audio: false
          });
          this.arrayButtonOnCall[index].current = "on";
        }
        break;
    }
  }

  backToMenu(): void {
    this.router.navigate(["/menu"]);
  }

  myVideoClick(): void {
    navigator.mediaDevices.getUserMedia({
      video: true, audio: true
    });
  }


  getSupportedConstraints(arg0: { video: boolean; }) {
    throw new Error('Function not implemented.');

  }


}