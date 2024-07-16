import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';
import { AudioService } from '../service/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  users: IUser[] = [];

  constructor(private authSvc:AuthService,private audioService:AudioService) { }

  currentAudioIndex: number | null = null;

  audioFiles: string[] = [
    'Cartoon.mp3', 'Diviners.mp3', 'InfiNoise.mp3', 'Jone.mp3', 'Last Heroes x TwoWorldsApar.mp3',
    'Lost.mp3', 'Xaia.mp3', 'seNeVaNayt.mp3', 'seNeVaNayt.mp3', 'RELAX.mp3',
    'seNeVaNayt.mp3', 'seNeVaNayt.mp3', 'seNeVaNayt.mp3', 'RELAX.mp3', 'seNeVaNayt.mp3', // primo nayt
    'seNeVaNayt.mp3', 'RELAX.mp3', 'seNeVaNayt.mp3', 'seNeVaNayt.mp3', 'RELAX.mp3',
    'RELAX.mp3', 'seNeVaNayt.mp3', 'RELAX.mp3', 'RELAX.mp3'
  ];


  toggleAudio(index: number): void {
    // Verifica se lo stesso cubo è stato premuto di nuovo senza premere altri cubi prima
    if (this.currentAudioIndex === index) {
      this.audioService.pause();
      this.currentAudioIndex = null;
    } else {
      const audioSrc = `./assets/${this.audioFiles[index]}`;


      this.audioService.play(audioSrc);
      this.currentAudioIndex = index; // Salva l'indice dell'audio corrente
    }
  }
}

