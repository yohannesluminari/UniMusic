import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemUrl = environment.itemsUrl; // URL per le API degli items

  constructor(private http: HttpClient) { }

  // Crea un nuovo item
  createItem(newItem: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(this.itemUrl, newItem);
  }

  // Ottiene tutti gli items
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.itemUrl}/${itemId}`);
  }

  // Modifica un item esistente
  updateItem(itemId: number, updatedItem: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.itemUrl}/${itemId}`, updatedItem);
  }

   // Ottiene un singolo item per ID
   getItemById(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemUrl}/${itemId}`);
  }
}
