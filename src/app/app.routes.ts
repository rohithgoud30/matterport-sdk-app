import { Routes } from '@angular/router';
import { AddSpaceComponent } from './add-space/add-space.component';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { ViewSpaceComponent } from './view-space/view-space.component';
import { MatterportViewerComponent } from './matterport-viewer/matterport-viewer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-space',
    pathMatch: 'full',
  },
  {
    path: 'view-space',
    component: MatterportViewerComponent,
    children: [
      {
        path: '',
        component: ViewSpaceComponent,
        outlet: 'side',
      },
    ],
  },
  {
    path: 'add-space',
    component: MatterportViewerComponent,
    children: [
      {
        path: '',
        component: AddSpaceComponent,
        outlet: 'side',
      },
    ],
  },
  {
    path: 'add-or-edit-product',
    component: MatterportViewerComponent,
    children: [
      {
        path: '',
        component: AddOrEditProductComponent,
        outlet: 'side',
      },
    ],
  },
];
