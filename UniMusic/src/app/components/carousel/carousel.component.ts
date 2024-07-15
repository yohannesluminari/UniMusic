import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  imagePaths: string[] = [];
  isAnimationPaused: boolean = false;

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewInit(): void {
    this.preloadImages();
  }

  loadImages(): void {
    for (let i = 1; i <= 74; i++) {
      this.imagePaths.push(`assets/artistiImg/${i}.jpg`);
    }
  }

  toggleSliderAnimation(): void {
    this.isAnimationPaused = !this.isAnimationPaused;
    const sliderItems = document.querySelectorAll('.slider .item');
    sliderItems.forEach(item => {
      (item as HTMLElement).style.animationPlayState = this.isAnimationPaused ? 'paused' : 'running';
    });
  }

  preloadImages(): void {
    this.imagePaths.forEach(imagePath => {
      const img = new Image();
      img.src = imagePath;
    });
  }
}

