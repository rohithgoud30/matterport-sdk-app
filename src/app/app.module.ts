import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddSpaceComponent } from './add-space/add-space.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewSpaceComponent } from './view-space/view-space.component';
import { MatterportViewerComponent } from './matterport-viewer/matterport-viewer.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AddSpaceComponent,
    EditProductComponent,
    ViewSpaceComponent,
    MatterportViewerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
