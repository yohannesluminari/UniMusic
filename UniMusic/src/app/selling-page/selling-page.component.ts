import { AudioService } from './../service/audio.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../models/Item';
import { ItemsService } from '../service/items.service';
import { IUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrl: './selling-page.component.scss',
})
export class SellingPageComponent {
  itemForm!: FormGroup;
  imagePreview: string | null = null;
  items: Item[] = [];
  showItemForm = false;
  currentUser: IUser | null = null;
  editingItemId: number | null = null; // ID dell'item in modifica

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private authService: AuthService // Inject AuthService per ottenere il currentUser
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      available: [true, Validators.required],
      price: [0, Validators.required],
      image: ['']
    });

    this.loadItems();
    this.currentUser = this.authService.getCurrentUser(); // Ottieni il currentUser dal AuthService
  }

  loadItems() {
    this.itemService.getAllItems().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  onSubmit() {
    if (this.itemForm.valid && this.currentUser) {
      const formData = this.itemForm.value;

      const newItem: Partial<Item> = {
        title: formData.title,
        description: formData.description,
        available: formData.available,
        price: formData.price,
        createdAt: new Date(),
        userId: this.currentUser.id, // Salvare solo l'id dell'utente
        image: this.imagePreview || ''
      };

      if (this.editingItemId) {
        this.itemService.updateItem(this.editingItemId, newItem as Item).subscribe(
          () => {
            this.loadItems();
            this.editingItemId = null;
            this.itemForm.reset();
          },
          (error) => {
            console.error('Error updating item:', error);
          }
        );
      } else {
        this.itemService.createItem(newItem as Item).subscribe(
          (item) => {
            this.items.push(item);
            this.itemForm.reset();
            this.showItemForm = false;
          },
          (error) => {
            console.error('Error creating item:', error);
          }
        );
      }
    }
  }

  toggleItemForm() {
    this.showItemForm = !this.showItemForm;
    this.itemForm.reset();
    this.imagePreview = null;
    this.editingItemId = null; // Resetta l'editingItemId quando si chiude/apre il form
  }

  handleImageInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteItem(item: Item) {
    if (this.currentUser?.id === item.userId) {
      this.itemService.deleteItem(item.id).subscribe(
        () => {
          this.items = this.items.filter(i => i.id !== item.id);
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  startEditItem(item: Item) {
    if (this.currentUser?.id === item.userId) {
      this.editingItemId = item.id;
      this.showItemForm = true;
      this.itemForm.patchValue({
        title: item.title,
        description: item.description,
        available: item.available,
        price: item.price,
        image: ''
      });
      this.imagePreview = item.image;
    }
  }

  cancelEditItem() {
    this.editingItemId = null;
    this.showItemForm = false;
    this.itemForm.reset();
    this.imagePreview = null;
  }
}
