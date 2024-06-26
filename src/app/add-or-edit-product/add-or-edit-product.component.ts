import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceStateService } from '../services/space-state.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddOrEditProductComponent {
  product = { name: '', tags: '', spaceId: '' };
  errorMessage: string | null = null;

  constructor(private spaceStateService: SpaceStateService) {}

  saveProduct() {
    if (this.product.name && this.product.tags && this.product.spaceId) {
      // Code to save product data to the JSON server
      console.log('Product saved:', this.product);
    } else {
      this.showError('All fields are required.');
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }
}
