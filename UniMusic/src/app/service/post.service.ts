
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Post } from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = environment.postUrl;

  constructor(private http: HttpClient) {}

  createPost(newPost: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.postUrl, newPost);
  }
}
