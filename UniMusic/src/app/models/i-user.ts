import { IMovies } from "./i-movies";


export interface IUser {
  id:number,
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  FavouriteFilms:IMovies[]
}
