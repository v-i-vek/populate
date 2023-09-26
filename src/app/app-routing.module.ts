import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { EnergyUsageComponent } from './energy-usage/energy-usage.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login-signup/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'',component:DeliveryComponent},
  {path:'verify',component:VerificationComponent},
  {path:'homepage',component:HomePageComponent},
  {path:'devicedetail',component:DeviceDetailsComponent},
  {path:'energyusage',component:EnergyUsageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
