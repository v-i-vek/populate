import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostDataComponent } from './post/post-data/post-data.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  {path:'post',component:PostListComponent,children:[ { path:'postdata',component:PostDataComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
