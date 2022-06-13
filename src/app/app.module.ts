import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SseService } from './services/sseService';
import { ShowImagePopupComponent } from './show-image-popup/show-image-popup.component';
import { FileBoxComponent } from './file-box/file-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowImagePopupComponent,
    FileBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
