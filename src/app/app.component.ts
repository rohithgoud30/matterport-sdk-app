// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatterportViewerComponent } from './matterport-viewer/matterport-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MatterportViewerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-matterport';
  inputSpaceId: string = '';
  spaceId: string = '';

  submitSpaceId() {
    if (!this.inputSpaceId) {
      alert('Space ID is mandatory. Please enter a valid Space ID.');
    } else {
      this.spaceId = this.inputSpaceId;
    }
  }
}
