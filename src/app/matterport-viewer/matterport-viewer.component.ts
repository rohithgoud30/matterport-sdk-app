import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatterportService } from '../services/matterport.service';

@Component({
  selector: 'app-matterport-viewer',
  templateUrl: './matterport-viewer.component.html',
  styleUrls: ['./matterport-viewer.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MatterportViewerComponent implements OnInit, OnChanges {
  @Input() spaceId: string = '';
  errorMessage: string | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private matterportService: MatterportService
  ) {}

  async ngOnInit() {
    await this.initializeViewer();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['spaceId'] && !changes['spaceId'].isFirstChange()) {
      await this.initializeViewer();
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
      }
    } catch (error: any) {
      this.showError(
        'Error initializing Matterport SDK: ' + (error?.message || error)
      );
    }
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
