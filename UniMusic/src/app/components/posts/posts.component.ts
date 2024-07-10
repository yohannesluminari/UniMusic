import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../service/post.service';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postForm!: FormGroup;
  currentUser: IUser | null = null;
  createdPost: Post | null = null;
  imagePreview: string | null = null;
  posts: Post[] = []; // Array per memorizzare tutti i post

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts(); // Carica i post all'inizio
  }

  loadPosts() {
    if (this.currentUser) {
      this.postService.getAllPosts().subscribe(
        (posts) => {
          this.posts = posts.filter(post => post.userId === this.currentUser!.id); // Filtra solo i post dell'utente corrente
        },
        (error) => {
          console.error('Errore durante il recupero dei post:', error);
          // Gestisci l'errore come necessario
        }
      );
    }
  }

  onSubmit() {
    if (this.postForm.valid && this.currentUser) {
      const formData = this.postForm.value;

      const newPost: Partial<Post> = {
        title: formData.title,
        content: formData.content,
        createdAt: new Date(),
        userId: this.currentUser.id,
        rating: null,
        image: this.imagePreview
      };

      this.postService.createPost(newPost).subscribe(
        (createdPost) => {
          console.log('Post creato con successo:', createdPost);
          this.createdPost = createdPost;
          this.loadPosts(); // Aggiorna la lista dei post dopo la creazione di un nuovo post
        },
        (error) => {
          console.error('Errore durante la creazione del post:', error);
          // Gestisci l'errore come necessario
        }
      );

      this.postForm.reset();
      this.imagePreview = null;
    }
  }

  deletePost(post: Post) {
    // Implementa la logica per eliminare il post
  }

  handleImageInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.compressImage(file);
    }
  }

  compressImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
