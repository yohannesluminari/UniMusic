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
  postForm: FormGroup;
  currentUser: IUser | null = null;
  createdPost: Post | null = null;
  imagePreview: string | null = null;
  posts: Post[] = [];
  showPostForm = false;
  isEditMode = false;
  selectedPost: Post | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts();
  }

  loadPosts(): void {
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

  onSubmit(): void {
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

      if (this.isEditMode && this.selectedPost) {
        newPost.id = this.selectedPost.id;
        this.updatePost(newPost);
      } else {
        this.createPost(newPost);
      }
    }
  }

  createPost(newPost: Partial<Post>): void {
    this.postService.createPost(newPost).subscribe(
      (createdPost) => {
        console.log('Post created successfully:', createdPost);
        this.createdPost = createdPost;
        this.loadPosts();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

  updatePost(updatedPost: Partial<Post>): void {
    this.postService.updatePost(updatedPost).subscribe(
      (updatedPost) => {
        console.log('Post updated successfully:', updatedPost);
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.resetForm();
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.posts = this.posts.filter(p => p.id !== post.id);
        console.log('Post deleted successfully:', post);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  editPost(post: Post): void {
    this.isEditMode = true;
    this.selectedPost = post;
    this.showPostForm = true;
    this.postForm.patchValue({
      id: post.id,
      title: post.title,
      content: post.content
    });
    this.imagePreview = post.image || null;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.selectedPost = null;
    this.resetForm();
  }

  resetForm(): void {
    this.postForm.reset();
    this.imagePreview = null;
    this.showPostForm = false;
  }

  handleImageInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.compressImage(file);
    }
  }

  compressImage(file: File): void {
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

  togglePostForm(): void {
    this.showPostForm = !this.showPostForm;
    this.isEditMode = false;
    this.selectedPost = null;
    this.resetForm();
  }
}
