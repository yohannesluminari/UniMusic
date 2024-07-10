// item.model.ts

import { IUser } from "./i-user";

export interface Item {
  id: number;
  title: string;
  description: string;
  available: boolean; // Modifica da string a boolean
  price: number;
  createdAt: Date;
  user: IUser;
  userId: string;
  image: string | null;
  buyer: IUser | null;
  sold: boolean;
}
