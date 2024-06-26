import { Component, OnInit, HostListener } from '@angular/core';
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
  menuOpen: boolean = false;
  isSmallScreen: boolean = window.innerWidth >= 768;

  constructor(private spaceStateService: SpaceStateService) {
    this.onResize();
  }

  ngOnInit() {
    this.spaceStateService.currentSpaceId.subscribe((spaceId) => {
      this.spaceId = spaceId;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isSmallScreen) {
      this.menuOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
