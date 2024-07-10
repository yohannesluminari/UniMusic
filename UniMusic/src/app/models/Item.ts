// item.model.ts

import { IUser } from "./i-user";

export interface Item {
  id: number;
  title: string;
  description: string;
  available: string;
  price: number;
  createdAt: Date; // Assuming it's a Date object
  user: IUser;
  image: string | null;
  buyer: IUser | null;
  sold: boolean;
}
