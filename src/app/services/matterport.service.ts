import { Injectable } from '@angular/core';
import { setupSdk, MpSdk } from '@matterport/sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatterportService {
  private sdkKey: string = environment.MATTERPORT_SDK_KEY || '';
  private mpSdk: MpSdk | undefined;

  async initializeSdk(
    spaceId: string,
    container: string
  ): Promise<{ sdk?: MpSdk; error?: string }> {
    if (!this.sdkKey) {
      return { error: 'SDK key is required' };
    }

    if (!spaceId) {
      return { error: 'Space ID is mandatory' };
    }

    try {
      this.mpSdk = await setupSdk(this.sdkKey, {
        space: spaceId,
        container: container,
      });
      return { sdk: this.mpSdk };
    } catch (error) {
      return {
        error: `Error initializing Matterport SDK: ${
          (error as any).message || error
        }`,
      };
    }
  }
}
