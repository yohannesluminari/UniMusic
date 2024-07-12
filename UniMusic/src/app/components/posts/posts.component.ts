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
  posts: Post[] = [];
  showPostForm = false;
  isEditMode: boolean = false; // Per gestire la modalità di edit
  selectedPost: Post | null = null; // Post selezionato per l'editing

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
    this.loadPosts();
  }

  loadPosts() {
    if (this.currentUser) {
      this.postService.getAllPosts().subscribe(
        (posts) => {
          this.posts = posts.filter(post => post.userId === this.currentUser!.id);
        },
        (error) => {
          console.error('Error fetching posts:', error);
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
          console.log('Post created successfully:', createdPost);
          this.createdPost = createdPost;
          this.loadPosts();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );

      this.postForm.reset();
      this.imagePreview = null;
    }
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.posts = this.posts.filter(p => p.id !== post.id);
        console.log('Post deleted successfully:', post);
      },
      (error) => {
        console.error('Errore durante l\'eliminazione del post:', error);
      }
    );
  }

  editPost(post: Post) {
    this.isEditMode = true;
    this.selectedPost = post;
    this.showPostForm = true; // Mostra il form per l'editing
    // Aggiorna i valori del form con i dati del post selezionato
    this.postForm.patchValue({
      title: post.title,
      content: post.content,
      // Aggiungi altri campi se necessario
    });

    // Aggiorna l'anteprima dell'immagine se disponibile
    if (post.image) {
      this.imagePreview = post.image;
    }
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
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 200;
        const maxHeight = 200;

        let width = img.width;
        let height = img.height;

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

        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        this.imagePreview = compressedBase64;
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  togglePostForm() {
    this.showPostForm = !this.showPostForm;
  }
}
