import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterParentComponent } from './counter/counter-parent/counter-parent.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterOutputsComponent } from './counter/counter-outputs/counter-outputs.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';


import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/component/header/header.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterParentComponent,
    CounterButtonsComponent,
    CounterOutputsComponent,
    HeaderComponent,
    HomeComponent,
    PostListComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({counter:counterReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
