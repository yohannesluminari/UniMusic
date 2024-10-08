import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../models/i-user';
import { Post } from '../models/Post';



@Component({
  selector: 'app-area-privata',
  templateUrl: './area-privata.component.html',
  styleUrls: ['./area-privata.component.scss']
})
export class AreaPrivataComponent  {
  isUserLoggedIn: boolean = false;
  isSidebarVisible: boolean = false;
  isPostFormVisible: boolean = true; // Stato iniziale: la card di creazione post non è visibile
  posts: Post[] = []; // Array per memorizzare i post degli utenti
  users: IUser[] = [];
  currentUser: IUser | null = null;
  otherUser: IUser | null = null;

  registerData: Partial<IUser> = {}; // Per conservare i dati dell'utente

  constructor(private authSvc: AuthService, private postService: PostService) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente al momento dell'inizializzazione del componente
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.registerData = user; // Assegna i dati dell'utente ai registerData
        this.isUserLoggedIn = true; // Imposta il flag di accesso utente a true
        this.currentUser = user;
      } else {
        this.isUserLoggedIn = false; // Se l'utente non è loggato, il flag di accesso utente è false
      }
    });
     // Supponiamo che tu abbia un metodo per recuperare l'altro utente con un avatar diverso
     this.authSvc.getOtherUser(2) // Supponiamo che l'id dell'altro utente sia 2
     .subscribe(user => {
       this.otherUser = user;
     });

    this.loadPosts(); // Carica i post all'avvio del componente
    this.authSvc.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Errore durante il recupero degli utenti:', error);
      }
    );
  }

  loadPosts() {
    // Chiamata al servizio per ottenere i post
    this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts = posts; // Assegna i post recuperati alla variabile locale
      },
      (error) => {
        console.error('Errore durante il recupero dei post:', error);
        // Gestisci l'errore come necessario
      }
    );
  }



  editPost(post: Post) {
    // Implementa la logica per l'editing del post
    console.log('Editing post:', post);
    // Puoi reindirizzare l'utente alla pagina di modifica o implementare un form modale per la modifica
  }

  deletePost(post: Post) {
    // Implementa la logica per l'eliminazione del post
    this.postService.deletePost(post.id).subscribe(
      () => {
        // Rimuovi il post dall'array locale di posts
        this.posts = this.posts.filter(p => p.id !== post.id);
        console.log('Post deleted successfully:', post);
      },
      (error) => {
        console.error('Errore durante l\'eliminazione del post:', error);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  togglePostForm() {
    this.isPostFormVisible = !this.isPostFormVisible;
  }
  // Metodo per ottenere il nome utente basato sul userId del post
  getUserUsername(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown'; // Se l'utente non è trovato, ritorna 'Unknown'
  }
}
