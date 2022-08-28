import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import { StateServiceVideo } from '../stateServiceVideo';
import { MessageIniVideoService } from '../messages/messageIniVideo.service';
import { MessageIniVideo } from '../messages/messageIniVideo';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent {
  
  @ViewChild('iframeVideo') 
  iframeVideo!: ElementRef;   

  message$: Observable<MessageIniVideo>;

  constructor(
    private http: HttpClient,
    private stateService: StateServiceVideo,
    private renderer: Renderer2,
    private messageService: MessageIniVideoService,
    private router: Router
    ) {
    
      this.message$=messageService.messages;
      messageService.messages.subscribe(m => {
       this.newVideoRoom(m);
      } );
     
       

  }


  private newVideoRoom(message:MessageIniVideo) {
    
    let get_session_url : string = config.SAMPLE_SERVER_BASE_URL;

    let roomName = message['roomName'];
 

    let videoSrc="https://tokbox.com/embed/embed/ot-embed.js?embedId=0c8e23e6-ea79-4005-bed9-0c31d5121c8e&room="+roomName+"&iframe=true";

    this.renderer.setProperty(this.iframeVideo.nativeElement,'width','100%');
    this.renderer.setProperty(this.iframeVideo.nativeElement,'height','100%');

    this.renderer.setProperty(this.iframeVideo.nativeElement,'scrolling','no');
    this.renderer.setProperty(this.iframeVideo.nativeElement,'allow','microphone; camera');
    this.renderer.setProperty(this.iframeVideo.nativeElement, 'src', videoSrc)

      
    }  
    
}
