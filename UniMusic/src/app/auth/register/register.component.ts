import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../../models/i-user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData: Partial<IUser> = {};
  showError: { [key in keyof IUser]?: boolean } = {};

  constructor(private authSvc:AuthService, private router:Router){}

  signUp() {
    // Validazione dei campi richiesti
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password) {
      Object.keys(this.registerData).forEach(key => {
        this.showError[key as keyof IUser] = !this.registerData[key as keyof IUser];
      });
      return;
    }
    this.authSvc.register(this.registerData)
      .subscribe(data => {
        this.router.navigate(['auth/login']);
      });
  }
 // Funzione per controllare se un campo è vuoto
 checkEmpty(field: keyof IUser) {
  this.showError[field] = !this.registerData[field];
}
 // Funzione per gestire il caricamento dell'avatar
 handleAvatarInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  if (file) {
    this.compressImage(file);
  }
}

// Funzione per comprimere e convertire l'immagine in Base64 con JPEG
compressImage(file: File) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 200; // Imposta la larghezza massima dell'immagine
      const maxHeight = 200; // Imposta l'altezza massima dell'immagine

      let width = img.width;
      let height = img.height;

      // Ridimensiona l'immagine se supera le dimensioni massime
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Disegna l'immagine nel canvas con le nuove dimensioni
      ctx?.drawImage(img, 0, 0, width, height);

      // Ottieni l'immagine compressa come Base64 con JPEG
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Qualità JPEG del 70%

      this.registerData.avatar = compressedBase64; // Assegna l'avatar compresso al registro
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}
}
