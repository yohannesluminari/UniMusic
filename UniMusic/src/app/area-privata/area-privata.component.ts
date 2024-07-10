import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../models/i-user';



@Component({
  selector: 'app-area-privata',
  templateUrl: './area-privata.component.html',
  styleUrls: ['./area-privata.component.scss']
})
export class AreaPrivataComponent  {
  isUserLoggedIn:boolean = false
  isSidebarVisible: boolean = false;
  isPostFormVisible: boolean = true; // Stato iniziale: la card di creazione post non è visibile


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  registerData: Partial<IUser> = {}; // Per conservare i dati dell'utente

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente al momento dell'inizializzazione del componente
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.registerData = user; // Assegna i dati dell'utente ai registerData
      }
    });
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn  = data
    })
  }

  logout(){
    this.authSvc.logout()
  }

  togglePostForm() {
    this.isPostFormVisible = !this.isPostFormVisible; // Inverti lo stato di visibilità della card
  }
}

