import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetCategoriesComponent } from './Categories/get-categories.component';
import { LoginComponent } from './Users/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './Shared/footer/footer.component';
import { HeaderComponent } from './Shared/header/header.component';
import { GetMoviesComponent } from './Movies/get-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './Categories/add-category.component';
import { AdmCategoryComponent } from './Categories/adm-category.component';
import { ViewUpdtCategoryComponent } from './Categories/view-updt-category.component';
import { GetUsersComponent } from './Users/get-users.component';
import { RelatedMoviesComponent } from './Movies/related-movies.component';
import { AdmMoviesComponent } from './Movies/adm-movies.component';
import { AddMoviesComponent } from './Movies/add-movies.component';
import { ViewUpdtMoviesComponent } from './Movies/view-updt-movies.component';
import { ViewMoviesComponent } from './Movies/view-movies.component';
import { SearchMoviesComponent } from './Movies/search-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    GetCategoriesComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    GetMoviesComponent,
    AddCategoryComponent,
    AdmCategoryComponent,
    ViewUpdtCategoryComponent,
    GetUsersComponent,
    RelatedMoviesComponent,
    AdmMoviesComponent,
    AddMoviesComponent,
    ViewUpdtMoviesComponent,
    ViewMoviesComponent,
    SearchMoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
