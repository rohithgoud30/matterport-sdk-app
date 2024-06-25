import { Component, OnInit } from '@angular/core';
import { SpaceStateService } from './services/space-state.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatterportViewerComponent } from './matterport-viewer/matterport-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatterportViewerComponent],
})
export class AppComponent implements OnInit {
  title = 'angular-matterport';
  spaceId: string | null = null;

  constructor(private spaceStateService: SpaceStateService) {}

  ngOnInit() {
    this.spaceStateService.currentSpaceId.subscribe((spaceId) => {
      this.spaceId = spaceId;
    });
  }
}
