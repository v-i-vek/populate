import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { LoginComponent } from './login-signup/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'delivery',component:DeliveryComponent},
  {path:'verify',component:VerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
