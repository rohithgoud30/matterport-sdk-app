import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { MatterportService } from '../services/matterport.service';
import { SpaceStateService } from '../services/space-state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-matterport-viewer',
  templateUrl: './matterport-viewer.component.html',
  styleUrls: ['./matterport-viewer.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class MatterportViewerComponent implements OnInit {
  @Input() spaceId: string = '';
  inputSpaceId: string = '';
  iframeLoaded: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private matterportService: MatterportService,
    private spaceStateService: SpaceStateService
  ) {}

  ngOnInit() {
    if (this.spaceId) {
      this.inputSpaceId = this.spaceId;
      this.initializeViewer();
    } else {
      const savedSpaceId = this.spaceStateService.getSpaceId();
      if (savedSpaceId) {
        this.inputSpaceId = savedSpaceId;
        this.spaceId = savedSpaceId;
        this.initializeViewer();
      }
    }
  }

  async initializeViewer() {
    if (!this.spaceId) {
      this.showError('Space ID is mandatory');
      return;
    }

    try {
      this.clearViewer();
      this.clearError();
      const container = '#matterport-container';
      const { sdk, error } = await this.matterportService.initializeSdk(
        this.spaceId,
        container
      );
      if (error) {
        this.showError(error);
      } else if (!sdk) {
        this.showError('Unknown error initializing Matterport SDK');
      } else {
        const iframe = this.el.nativeElement
          .querySelector(container)
          .querySelector('iframe');
        if (iframe) {
          this.renderer.listen(iframe, 'load', () => {
            this.iframeLoaded = true;
            this.renderer.setStyle(iframe, 'width', '100%');
            this.renderer.setStyle(iframe, 'height', '100%');
          });
        }
      }
    } catch (error: any) {
      this.showError(
        'Error initializing Matterport SDK: ' + (error?.message || error)
      );
    }
  }

  submitSpaceId() {
    if (!this.inputSpaceId) {
      this.showError('Space ID is mandatory');
    } else {
      this.spaceId = this.inputSpaceId;
      this.spaceStateService.setSpaceId(this.spaceId); // Save the spaceId to the shared service
      this.initializeViewer(); // Initialize viewer after setting the space ID
    }
  }

  resetSpaceId() {
    this.spaceId = '';
    this.inputSpaceId = '';
    this.spaceStateService.resetSpaceId(); // Remove the spaceId from the shared service
    this.clearViewer();
    this.showError('Space ID is mandatory');
  }

  showError(message: string) {
    this.errorMessage = message;
    this.createErrorElement();
  }

  clearError() {
    this.errorMessage = null;
    this.removeErrorElement();
  }

  clearViewer() {
    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    if (container) {
      container.innerHTML = '';
    }
  }

  createErrorElement() {
    const container = this.el.nativeElement.querySelector(
      '#matterport-container'
    );
    this.removeErrorElement();
    const errorDiv = this.renderer.createElement('div');
    this.renderer.addClass(errorDiv, 'error-message');
    const text = this.renderer.createText(this.errorMessage || '');
    this.renderer.appendChild(errorDiv, text);
    this.renderer.appendChild(container, errorDiv);
  }

  removeErrorElement() {
    const errorElement = this.el.nativeElement.querySelector('.error-message');
    if (errorElement) {
      this.renderer.removeChild(
        this.el.nativeElement.querySelector('#matterport-container'),
        errorElement
      );
    }
  }
}
