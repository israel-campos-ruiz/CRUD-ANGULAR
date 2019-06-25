import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroesComponent } from './components/heroes/heroes.component';

//http
import {HttpClientModule} from '@angular/common/http';

//formularios
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//rutas 
import {appRouting} from './app.routes';
//pipes
import { FilterPipe } from './pipes/filter.pipe';

//servicios 

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
