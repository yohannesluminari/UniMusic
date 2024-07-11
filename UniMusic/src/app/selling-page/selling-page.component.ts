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
  filteredItems: Item[] = []; // Aggiungi questa proprietà
  showItemForm = false;
  currentUser: IUser | null = null;
  editingItemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      available: [true, Validators.required],
      price: [0, Validators.required],
      image: ['']
    });

    this.currentUser = this.authService.getCurrentUser();
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAllItems().subscribe(
      (items) => {
        this.items = items;
        this.filterItemsByUser(); // Filtra gli item dopo averli caricati
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  filterItemsByUser() {
    if (this.currentUser) {
      this.filteredItems = this.items.filter(item => item.userId === this.currentUser!.id);
    }
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
        userId: this.currentUser.id,
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
            this.filterItemsByUser(); // Filtra gli item dopo aver creato un nuovo item
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
    this.editingItemId = null;
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
          this.filterItemsByUser(); // Filtra gli item dopo aver eliminato un item
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
