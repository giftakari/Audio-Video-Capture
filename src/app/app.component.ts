import { Component } from '@angular/core';
import {RecordRTCPromisesHandler, RecordRTC} from 'recordrtc'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecordRTC-Angular';



  startRecord() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
  }).then((stream)=> {
      let recorder = RecordRTC(stream, {
          type: 'video'
      });
      recorder.startRecording();
 
    }
    )
  
  }

}
