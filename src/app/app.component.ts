import { Component, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RecordRTCPromisesHandler, RecordRTC } from 'recordrtc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('video') video: any;
  private stream: MediaStream;
  private recordRTC: any;
  mediaConstraints;


  
  

  constructor(private domSanitizer: DomSanitizer) {
  }
  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  startRecording() {
   this.mediaConstraints = {
      type:this.video,
      video: {
        mandatory: {
          minWidth: 560,
          minHeight: 400
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}

  
successCallback(stream: MediaStream) {
  var options = {
        mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 128000,
        bitsPerSecond: 128000 // if this line is provided, skip above two
      };
      this.stream = stream;
      this.recordRTC = RecordRTC(stream, options);
      this.recordRTC.startRecording();
      let video: HTMLVideoElement = this.video.nativeElement;
      video.src = window.URL.createObjectURL(stream);
      this.toggleControls();
}
  
toggleControls() {
  let video: HTMLVideoElement = this.video.nativeElement;
  video.muted = !video.muted;
  video.controls = !video.controls;
  video.autoplay = !video.autoplay;
}

stopRecording() {
  let recordRTC = this.recordRTC;
  recordRTC.stopRecording(this.processVideo.bind(this));
  let stream = this.stream;
  stream.getAudioTracks().forEach(track => track.stop());
  stream.getVideoTracks().forEach(track => track.stop());
}
  
processVideo(audioVideoWebMURL) {
  let video: HTMLVideoElement = this.video.nativeElement;
  let recordRTC = this.recordRTC;
  video.src = audioVideoWebMURL;
  this.toggleControls();
  var recordedBlob = recordRTC.getBlob();
  recordRTC.getDataURL(function (dataURL) { });
}
download() {
  this.recordRTC.save('video.webm');
}
  
errorCallback() {
  //handle error here
  console.log('Error not found')
}

}