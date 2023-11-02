import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDataComponent } from './post/post-data/post-data.component';
import { Store, StoreModule } from '@ngrx/store';
import { postReducer } from './post/store/post.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({postState:postReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
