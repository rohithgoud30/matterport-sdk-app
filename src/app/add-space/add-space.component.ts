import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpaceService } from '../services/space.service';
import { SpaceStateService } from '../services/space-state.service';
import { Space } from '../models/space.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddSpaceComponent {
  space: Space = {
    id: 0,
    name: '',
    city: '',
    state: '',
    spaceId: '',
    products: [],
  };
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private spaceService: SpaceService,
    private spaceStateService: SpaceStateService
  ) {}

  saveSpace() {
    this.spaceService.addSpace(this.space).subscribe(
      () => {
        console.log('Space saved:', this.space);
        this.spaceStateService.setSpaceId(this.space.spaceId);
        this.router.navigate(['/view-space']);
      },
      (error) => {
        this.showError('Error saving space: ' + error.message);
      }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }
}
