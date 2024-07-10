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
  postForm!: FormGroup; // Use '!' to tell TypeScript that this will be initialized in the constructor
  currentUser: IUser | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService // Import your user service if needed
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      // Add more form controls as needed
    });

    this.currentUser = this.authService.getCurrentUser(); // Fetch current user if needed
  }

  onSubmit() {
    if (this.postForm.valid && this.currentUser) {
      const formData = this.postForm.value;

      const newPost: Partial<Post> = {
        title: formData.title,
        content: formData.content,
        createdAt: new Date(),
        userId: this.currentUser.id, // Save only the user ID
        rating: null,
        image: null
      };

      this.postService.createPost(newPost).subscribe(
        (createdPost) => {
          console.log('Post created successfully:', createdPost);
          // Handle success as needed
        },
        (error) => {
          console.error('Error creating post:', error);
          // Handle error as needed
        }
      );

      this.postForm.reset();
    }
  }
}
