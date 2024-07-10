// item.model.ts

import { IUser } from "./i-user";

export interface Item {
  id: number;
  title: string;
  description: string;
  available: boolean;
  price: number;
  createdAt: Date;
  user: IUser; // Aggiunto campo user di tipo IUser
  userId: string;
  image: string | null;
  buyer: IUser | null;
  sold: boolean;
}
