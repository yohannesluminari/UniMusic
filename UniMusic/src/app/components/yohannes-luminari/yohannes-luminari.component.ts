import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-yohannes-luminari',
  templateUrl: './yohannes-luminari.component.html',
  styleUrl: './yohannes-luminari.component.scss'
})
  export class YohannesLuminariComponent implements AfterViewInit {
    roles: string[] = ['Full Stack Developer', 'Front-end Developer', 'Back-end Developer'];
    currentRole: string = this.roles[0];
    currentIndex: number = 0;

    animatedArtists: number = 0;
    animatedTracks: number = 0;

    private maxArtists: number = 188;
    private maxTracks: number = 600;

    @ViewChild('contactSection') contactSection!: ElementRef; // Initialize with type assertion

    constructor() { }

    ngOnInit(): void {
      this.startRoleRotation();
      this.animateNumbers();
    }

    ngAfterViewInit(): void {
      // Now you can safely access this.contactSection
      console.log(this.contactSection.nativeElement); // Example usage
    }

    startRoleRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        this.currentRole = this.roles[this.currentIndex];
      }, 3000); // Change every 3 seconds
    }

    scrollToContact() {
      if (this.contactSection.nativeElement.style.display === 'block') {
        this.contactSection.nativeElement.style.display = 'none'; // Hide the contact section
      } else {
        this.contactSection.nativeElement.style.display = 'block'; // Show the contact section
        this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    animateNumbers() {
      const duration = 2000; // Animation duration in milliseconds
      const steps = 60; // Number of steps in the animation
      const artistIncrement = this.maxArtists / steps;
      const trackIncrement = this.maxTracks / steps;

      let currentArtist = 0;
      let currentTrack = 0;
      let stepCount = 0;

      const interval = setInterval(() => {
        if (stepCount >= steps) {
          clearInterval(interval);
          this.animatedArtists = this.maxArtists;
          this.animatedTracks = this.maxTracks;
        } else {
          currentArtist += artistIncrement;
          currentTrack += trackIncrement;
          this.animatedArtists = Math.floor(currentArtist);
          this.animatedTracks = Math.floor(currentTrack);
          stepCount++;
        }
      }, duration / steps);
    }
  }
