import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  public videos: String[] = []
 
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.GetVideosNames().then((response) => {
      this.videos = response;
    })
  }

  public PlayVideo(video: String): void {
    const videoPlayer = document.getElementById("video-player") as HTMLVideoElement;
    videoPlayer.src = this.backendService.URL().concat(video.toString())
  }
}
