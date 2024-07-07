import { Component, OnInit } from '@angular/core';
import { IMovies } from '../models/i-movies';
import { IUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';


interface MovieWithLikeStatus extends IMovies {
  isLiked: boolean
  backgroundColor: string;
}

@Component({
  selector: 'app-area-privata',
  templateUrl: './area-privata.component.html',
  styleUrls: ['./area-privata.component.scss']
})
export class AreaPrivataComponent implements OnInit {
  movies: MovieWithLikeStatus[] = [];
  currentUser: IUser | null = null;

  constructor(private authSvc: AuthService) { }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setRandomBackgroundColor(): void {
    this.movies.forEach(movie => {
      movie.backgroundColor = this.generateRandomColor();
    });
  }

  ngOnInit(): void {
    this.authSvc.getMovies().subscribe(movies => {
      this.movies = movies.map(movie => ({
        ...movie,
        isLiked: this.currentUser && this.currentUser.FavouriteFilms ?
          this.currentUser.FavouriteFilms.some(favMovie => favMovie.id === movie.id) :
          false,
        backgroundColor: ''
      }));
      this.setRandomBackgroundColor();
    });


    const userData = localStorage.getItem('accessData');
    if (userData) {
      const accessData = JSON.parse(userData);
      this.currentUser = accessData.user;
    }
  }

  toggleLike(movie: MovieWithLikeStatus): void {
    movie.isLiked = !movie.isLiked;
    if (movie.isLiked) {
      this.authSvc.addToFavorites(movie);
    } else {
      this.authSvc.removeFromFavorites(movie);
    }
  }
}

