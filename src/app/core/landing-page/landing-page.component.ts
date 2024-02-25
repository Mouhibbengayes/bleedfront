import { Component, HostListener, ElementRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router, private elRef: ElementRef) { }

  ngOnInit(): void {
    
  }

  play() {
    const videoElement = this.elRef.nativeElement.querySelector('#vid');
    if (videoElement) {
      videoElement.muted = true; // Set the video to be muted
      videoElement.play();
    }
  }
}
