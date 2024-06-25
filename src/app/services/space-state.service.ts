import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpaceStateService {
  private spaceIdSource = new BehaviorSubject<string | null>(null);
  currentSpaceId = this.spaceIdSource.asObservable();

  constructor() {
    const savedSpaceId = localStorage.getItem('spaceId');
    if (savedSpaceId) {
      this.spaceIdSource.next(savedSpaceId);
    }
  }

  setSpaceId(spaceId: string) {
    localStorage.setItem('spaceId', spaceId);
    this.spaceIdSource.next(spaceId);
  }

  resetSpaceId() {
    localStorage.removeItem('spaceId');
    this.spaceIdSource.next(null);
  }

  getSpaceId(): string | null {
    return localStorage.getItem('spaceId');
  }
}
