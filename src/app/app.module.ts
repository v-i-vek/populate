import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login-signup/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { DeliveryComponent } from './delivery/delivery.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import { VerificationComponent } from './verification/verification.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormGroup,FormsModule , FormBuilder} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';












@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomePageComponent,
    DeliveryComponent,
    VerificationComponent,
    AddDeviceComponent,
    DeviceDetailsComponent,
    
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
    MatListModule,
    MatDividerModule
    

  ],
  providers: [NavBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
