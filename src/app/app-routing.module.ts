import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCategoriesComponent } from './Categories/get-categories.component';
import { AddCategoryComponent } from './Categories/add-category.component';
import { AdmCategoryComponent } from './Categories/adm-category.component';
import { GetMoviesComponent } from './Movies/get-movies.component';
import { LoginComponent } from './Users/login.component';
import { ViewUpdtCategoryComponent } from './Categories/view-updt-category.component';
import { GetUsersComponent } from './Users/get-users.component';
import { RelatedMoviesComponent } from './Movies/related-movies.component';
import { AddMoviesComponent } from './Movies/add-movies.component';
import { AdmMoviesComponent } from './Movies/adm-movies.component';
import { ViewUpdtMoviesComponent } from './Movies/view-updt-movies.component';
import { ViewMoviesComponent } from './Movies/view-movies.component';
import { SearchMoviesComponent } from './Movies/search-movies.component';

const routes: Routes = [
  { path: 'home', component: GetMoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: GetCategoriesComponent },
  { path: 'admcategory', component: AdmCategoryComponent },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: 'viewupdtcategory/:id', component: ViewUpdtCategoryComponent },
  { path: 'relatedmovies/:id', component: RelatedMoviesComponent},
  { path: 'admmovies', component:AdmMoviesComponent },
  { path: 'addmovies', component: AddMoviesComponent },
  { path: 'viewupdtmovie/:idMovie', component: ViewUpdtMoviesComponent },
  { path: 'viewmovie/:idMovie', component: ViewMoviesComponent },
  { path: 'searchmovies', component: SearchMoviesComponent },
  { path: 'users', component: GetUsersComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
