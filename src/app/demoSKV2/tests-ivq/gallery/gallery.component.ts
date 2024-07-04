import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    checked: string = ""
    arrayCheck = [{ img1: "adventure.jpg", img2: "alberta.jpg", img3: "iceland.jpg" }, { img4: "mountain.jpg", img5: "mountains.jpg", img6: "norway.jpg" }, { img7: "sunrise.jpg", img8: "way.jpg", img9: "winter.jpg" }]

    idImg: number = 0

    constructor() { }

    ngOnInit(): void {
    }


    onclickImage(image: string) {

        if (image === this.checked) {
            this.checked = ""
        }
        else {
            this.checked = image
        }
    }

    /**

        for (let i = 1; i < 10; i++) {
            if (document.getElementById("btnControl" + i).checked == true) {
                if (document.getElementById("btnControl1")) {
                    for (u = 2; u < 10; u++) {
                        document.getElementById("img" + u).style.display = "none";
                    }
                }
                else {
                    for (j = 1; j < 10; j++) {
                        if (j != i) {
                            document.getElementById("img" + i).style.display = "none";
                        }
                    }
                }

            }
            document.getElementById()
        }
        */

}
