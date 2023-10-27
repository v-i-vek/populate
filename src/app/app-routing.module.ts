import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterParentComponent } from './counter/counter-parent/counter-parent.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'counter',
    component:CounterParentComponent
  },
  {
    path:'post',
    component:PostListComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
