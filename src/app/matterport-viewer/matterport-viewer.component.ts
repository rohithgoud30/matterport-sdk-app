import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-matterport-viewer',
  templateUrl: './matterport-viewer.component.html',
  styleUrls: ['./matterport-viewer.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class MatterportViewerComponent implements OnInit {
  @Input() spaceId: string = ''; // Default space ID for Matterport
  inputSpaceId: string = ''; // Input space ID bound to the input field
  errorMessage: string | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const savedSpaceId = localStorage.getItem('spaceId');
    if (savedSpaceId) {
      this.inputSpaceId = savedSpaceId;
      this.spaceId = savedSpaceId;
      this.initializeViewer();
    } else {
      this.showError('Space ID is mandatory');
    }
  }

  // Initialize the Matterport viewer with the provided space ID
  initializeViewer() {
    if (!this.spaceId) {
      this.showError('Space ID is mandatory');
      return;
    }

    this.clearViewer();
    this.clearError();

    const iframe = this.renderer.createElement('iframe');
    iframe.src = `https://my.matterport.com/show/?m=${this.spaceId}&play=1&qs=1&vr=0&sd=1&ff=0&st=0&sr=1`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'xr-spatial-tracking';

    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    if (container) {
      this.renderer.appendChild(container, iframe);
      this.clearError(); // Clear error if iframe is successfully loaded
    } else {
      this.showError('Matterport container not found');
    }
  }

  // Submit the space ID and initialize the viewer
  submitSpaceId() {
    if (!this.inputSpaceId) {
      this.showError('Space ID is mandatory');
    } else {
      this.spaceId = this.inputSpaceId;
      localStorage.setItem('spaceId', this.spaceId); // Save the spaceId to local storage
      this.initializeViewer(); // Initialize viewer after setting the space ID
    }
  }

  // Reset the space ID and clear the viewer
  resetSpaceId() {
    this.spaceId = '';
    this.inputSpaceId = '';
    localStorage.removeItem('spaceId'); // Remove the spaceId from local storage
    this.clearViewer();
    this.showError('Space ID is mandatory');
  }

  // Show error message in the center of the Matterport viewer container
  showError(message: string) {
    this.errorMessage = message;
    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    if (container) {
      this.clearViewer(); // Clear any existing iframes or elements
      const errorDiv = this.renderer.createElement('div');
      this.renderer.setStyle(errorDiv, 'color', 'red');
      this.renderer.setStyle(errorDiv, 'font-size', '24px');
      this.renderer.setStyle(errorDiv, 'text-align', 'center');
      this.renderer.setStyle(errorDiv, 'position', 'absolute');
      this.renderer.setStyle(errorDiv, 'top', '50%');
      this.renderer.setStyle(errorDiv, 'left', '50%');
      this.renderer.setStyle(errorDiv, 'transform', 'translate(-50%, -50%)');
      this.renderer.setStyle(errorDiv, 'width', '100%'); // Ensure errorDiv takes full width of container
      const text = this.renderer.createText(message);
      this.renderer.appendChild(errorDiv, text);
      this.renderer.appendChild(container, errorDiv);
    }
  }

  // Clear error message
  clearError() {
    this.errorMessage = null;
    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    if (container) {
      const errorDiv = container.querySelector('div');
      if (errorDiv) {
        this.renderer.removeChild(container, errorDiv);
      }
    }
  }

  // Clear the Matterport viewer container
  clearViewer() {
    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    if (container) {
      container.innerHTML = '';
    }
  }
}
