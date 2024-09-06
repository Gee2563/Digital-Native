import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormService } from './services/form.service';
import { EmailService } from './services/email.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Import FormsModule for template-driven forms
    HttpClientModule
  ],
  providers: [FormService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
