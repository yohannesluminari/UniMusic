import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';
import { AudioService } from '../service/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: IUser[] = [];

  constructor(private authSvc:AuthService,private audioService:AudioService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authSvc.getAllUsers().subscribe(
      (users: IUser[]) => {
        this.users = users;
      }
    );
  }

  currentAudioIndex: number | null = null;

  audioFiles: string[] = [
    'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3',
    'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3',
    'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3',
    'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3',
    'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3', 'RELAX.mp3'
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

