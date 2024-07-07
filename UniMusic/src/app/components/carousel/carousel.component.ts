import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Artist {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  artists: Artist[] = [];
  isAnimationPaused: boolean = false; // Variabile per tracciare lo stato dell'animazione

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  ngAfterViewInit(): void {
    // Pre-caricamento delle immagini
    this.preloadImages();
  }

  loadArtists(): void {
    this.http.get<Artist[]>('./assets/artisti.json')
      .subscribe(data => {
        this.artists = data;
      });
  }

  toggleSliderAnimation(): void {
    this.isAnimationPaused = !this.isAnimationPaused;
    const sliderItems = document.querySelectorAll('.slider .item');
    sliderItems.forEach(item => {
      (item as HTMLElement).style.animationPlayState = this.isAnimationPaused ? 'paused' : 'running';
    });
  }

  // Funzione per pre-caricare tutte le immagini
  preloadImages(): void {
    this.artists.forEach(artist => {
      const img = new Image();
      img.src = artist.image;
    });
  }
}
