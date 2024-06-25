import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceStateService } from '../services/space-state.service';

@Component({
  selector: 'app-view-space',
  templateUrl: './view-space.component.html',
  styleUrls: ['./view-space.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ViewSpaceComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private spaceStateService: SpaceStateService) {}

  ngOnInit() {
    // Initialization logic
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }
}
