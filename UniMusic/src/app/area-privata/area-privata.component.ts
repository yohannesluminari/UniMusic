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

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  registerData: Partial<IUser> = {}; // Per conservare i dati dell'utente

  constructor(private authSvc: AuthService, private postService: PostService) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente al momento dell'inizializzazione del componente
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.registerData = user; // Assegna i dati dell'utente ai registerData
        this.isUserLoggedIn = true; // Imposta il flag di accesso utente a true
      } else {
        this.isUserLoggedIn = false; // Se l'utente non è loggato, il flag di accesso utente è false
      }
    });

    this.loadPosts(); // Carica i post all'avvio del componente
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

  togglePostForm() {
    this.isPostFormVisible = !this.isPostFormVisible; // Inverti lo stato di visibilità della card
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
}
