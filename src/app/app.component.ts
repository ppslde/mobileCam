import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeviceService } from './services/device.service';
import { Device } from './models/device';

// https://x-team.com/blog/webcam-image-capture-angular/
// https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
// https://webrtc.github.io/samples/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'mobilecam';

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  public devices: Array<Device>;

  selected = 'option2';

  constructor(private deviceSrv: DeviceService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.deviceSrv.getDevices().then(v => {
      this.devices = v;
    }).catch(e => {

    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.video.nativeElement.srcObject = stream; //window.URL.createObjectURL(stream);
          this.video.nativeElement.play();
        }, error => {

        });
    }
  }



  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }
}
