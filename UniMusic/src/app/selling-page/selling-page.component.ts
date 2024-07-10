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
        image: this.imagePreview,
        buyer: null,
        sold: false
      };

      if (this.editingItemId) {
        // Se stiamo modificando un item esistente
        this.itemService.updateItem(this.editingItemId, newItem).subscribe(
          (updatedItem) => {
            console.log('Item updated successfully:', updatedItem);
            this.loadItems(); // Ricarica gli items dopo l'aggiornamento
            this.cancelEditItem(); // Chiudi il form di modifica
          },
          (error) => {
            console.error('Error updating item:', error);
          }
        );
      } else {
        // Altrimenti, creiamo un nuovo item
        this.itemService.createItem(newItem).subscribe(
          (createdItem) => {
            console.log('Item created successfully:', createdItem);
            this.loadItems(); // Ricarica gli items dopo la creazione
            this.cancelEditItem(); // Chiudi il form di creazione
          },
          (error) => {
            console.error('Error creating item:', error);
          }
        );
      }
    }
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item.id).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.loadItems(); // Ricarica gli items dopo l'eliminazione
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  handleImageInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.compressImage(file);
    }
  }

  compressImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 200;
        const maxHeight = 200;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        this.imagePreview = compressedBase64;
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  toggleItemForm() {
    this.showItemForm = !this.showItemForm;
    console.log('showItemForm:', this.showItemForm);
  }

  // Metodo per avviare la modifica di un item
  startEditItem(item: Item) {
    this.editingItemId = item.id;
    this.itemService.getItemById(item.id).subscribe(
      (itemDetails) => {
        this.itemForm.patchValue({
          title: itemDetails.title,
          description: itemDetails.description,
          available: itemDetails.available,
          price: itemDetails.price
        });
        this.imagePreview = itemDetails.image; // Visualizza l'immagine esistente dell'item
        this.showItemForm = true; // Mostra il form di modifica
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  // Metodo per annullare la modifica di un item
  cancelEditItem() {
    this.editingItemId = null;
    this.itemForm.reset();
    this.imagePreview = null;
    this.showItemForm = false;
  }
}
