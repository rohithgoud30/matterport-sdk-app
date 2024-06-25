import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceStateService } from '../services/space-state.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditProductComponent {
  product = { name: '', tags: '', spaceId: '' };
  errorMessage: string | null = null;

  constructor(private spaceStateService: SpaceStateService) {}

  saveProduct() {
    // Code to save product data to the JSON server
    console.log('Product saved:', this.product);
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }
}
