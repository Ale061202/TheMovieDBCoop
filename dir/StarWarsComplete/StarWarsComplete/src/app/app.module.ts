import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    FilmsListComponent,
    SpeciesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
