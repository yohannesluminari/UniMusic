import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audio: HTMLAudioElement | null = null;

  play(audioSrc: string): void {
    // Se c'è un audio in riproduzione, interrompilo prima di riprodurre il nuovo audio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    // Crea un nuovo elemento audio e avvia la riproduzione
    this.audio = new Audio(audioSrc);
    this.audio.load();
    this.audio.play();
  }

  pause(): void {
    // Interrompi la riproduzione dell'audio corrente
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
