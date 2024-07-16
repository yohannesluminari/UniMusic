import { IUser } from "./i-user";


export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  user: IUser;
  rating: number | null;
  image: string | null;
  userId: string;
}
