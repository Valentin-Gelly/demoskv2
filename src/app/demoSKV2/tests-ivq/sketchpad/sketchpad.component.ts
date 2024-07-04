import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {



  @ViewChild("sketchpad", { static: true })
  sketchpad!: ElementRef;
  mouseX: number = 0
  mouseY: number = 0
  mouseDown: number = 0
  touchX: number = 0
  touchY: number = 0
  size : number = 25
  selectedR : number = 0
  selectedG : number = 0
  selectedB : number = 0

  lastX: number = -1
  lastY: number = -1;


  texts: any = [
    "Dessinez",
    "Inventez",
    "(Re)pensez",
    "Softkiosk V2",
    "",
    "",
    ""
  ];


  textIndex = this.texts.length - 1
  time: Date = new Date()
  morph: number = 0
  cooldown = 0.2
  morphTime = 1
  cooldownTime = 0.25
  textStyle1: any = {}
  textStyle2: any = {}



  ngOnInit(): void {
    this.animate();
  }

  ngAfterViewInit(): void {
    this.sketchpad.nativeElement.width = window.innerWidth * 1;
    this.sketchpad.nativeElement.height = window.innerHeight * 0.96;
  }

  // Keep track of the old/last position when drawing a line
  // We set it to -1 at the start to indicate that we don't have a good value for it yet

  // Draws a line between the specified position on the supplied canvas name
  // Parameters are: A canvas context, the x position, the y position, the size of the dot
  drawLine(type: string): void {
    let ctx = this.sketchpad.nativeElement.getContext('2d');

    let x = 0;
    let y = 0;
    switch (type) {
      case "mouse":
        x = this.mouseX;
        y = this.mouseY;
        break
      case "touch":
        x = this.touchX;
        y = this.touchY;
        break
    }
    // If lastX is not set, set lastX and lastY to the current position 
    if (this.lastX == -1) {
      this.lastX = x;
      this.lastY = y;
    }

    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    const r = this.selectedR; const g = this.selectedG; const b = this.selectedB; const a = 255;

    // Select a fill style
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

    // Set the line "cap" style to round, so lines at different angles can join into each other
    ctx.lineCap = "round";
    //ctx.lineJoin = "round";


    // Draw a filled line
    ctx.beginPath();

    // First, move to the old (previous) position
    ctx.moveTo(this.lastX, this.lastY);

    // Now draw a line to the current touch/pointer position
    ctx.lineTo(x, y);

    // Set the line thickness and draw the line
    ctx.lineWidth = this.size;
    ctx.stroke();

    ctx.closePath();

    // Update the last position to reference the current position
    this.lastX = x;
    this.lastY = y;
  }



  // Clear the canvas context using the canvas width and height
  clearCanvas(): void {
    let ctx = this.sketchpad.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.sketchpad.nativeElement.width, this.sketchpad.nativeElement.height);
  }

  sketchpad_mouseDown(e: any): void {
    this.mouseDown = 1;
    this.drawLine("mouse");
  }

  // Keep track of the mouse button being released
  sketchpad_mouseUp(): void {
    this.mouseDown = 0;
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    this.lastX = -1;
    this.lastY = -1;
  }

  // Keep track of the mouse position and draw a dot if mouse button is currently pressed
  sketchpad_mouseMove(e: any): void {
    // Update the mouse co-ordinates when moved
    this.getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (this.mouseDown == 1) {
      this.drawLine("mouse");
    }
  }

  // Get the current mouse position relative to the top-left of the canvas
  getMousePos(e: any): void {
    if (e) {
      if (e.offsetX) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
      }
      else if (e.layerX) {
        this.mouseX = e.layerX;
        this.mouseY = e.layerY;
      }
    }
  }

  // Get the touch position relative to the top-left of the canvas
  // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
  // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
  // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
  getTouchPos(e: any): void {
    if (e && e.touches && e.touches.length == 1) {
      // Only deal with one finger
      let touch = e.touches[0]; // Get the information for finger #1
      this.touchX = touch.pageX - touch.target.offsetLeft;
      this.touchY = touch.pageY - touch.target.offsetTop;
    }
  }


  // Draw something when a touch start is detected
  sketchpad_touchStart(e: any): void {
    // Update the touch co-ordinates
    this.getTouchPos(e);

    this.drawLine("touch");

    // Prevents an additional mousedown event being triggered
    e.preventDefault();
  }

  sketchpad_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    this.lastX = -1;
    this.lastY = -1;
  }

  // Draw something and prevent the default scrolling when touch movement is detected
  sketchpad_touchMove(e: any) {
    // Update the touch co-ordinates
    this.getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawLine("touch");

    // Prevent a scrolling action as a result of this touchmove triggering.
    e.preventDefault();
  }


  valueChanged(e: any){
    console.log("taille du trait: "+ e.target.value + " /100");
    this.size = e.target.value;
  }

  colorChanged(e: any){
    let color : any = []
    for (let i = 1; i < e.target.value.length; i++){
      color.push(e.target.value[i]);
    }
    this.selectedR = parseInt(''+color[0]+color[1],16);
    this.selectedG = parseInt(''+color[2]+color[3],16);
    this.selectedB = parseInt(''+color[4]+color[5],16);
    console.log("couleur: " + this.selectedR + ", "+ this.selectedG + ", " + this.selectedB );
  }

  /** ------------------------- PARTIE AFFICHAGE -------------------------- */



  doMorph(): void {
    this.morph -= this.cooldown;
    this.cooldown = 0;

    let fraction = this.morph / this.morphTime;

    if (fraction > 1) {
      this.cooldown = this.cooldownTime;
      fraction = 1;
    }

    this.setMorph(fraction);
  }

  setMorph(fraction: any): void {


    this.textStyle2.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    this.textStyle2.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    this.textStyle1.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    this.textStyle1.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  }


  doCooldown(): void {
    this.morph = 0;

    this.textStyle2.filter = "";
    this.textStyle2.opacity = "100%";

    this.textStyle1.filter = "";
    this.textStyle1.opacity = "0%";
  }

  animate(): void {
    //requestAnimationFrame(this.animate);

    let newTime = new Date();
    let shouldIncrementIndex = this.cooldown > 0;
    let dt = (newTime.getTime() - this.time.getTime()) / 1000;
    this.time = newTime;

    this.cooldown -= dt;

    if (this.cooldown <= 0) {
      if (shouldIncrementIndex) {
        this.textIndex++;
      }

      this.doMorph();
    } else {
      this.doCooldown();
    }
  }

  
}