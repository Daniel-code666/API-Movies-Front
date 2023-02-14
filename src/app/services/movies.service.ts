import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getMovies(): any {
    return this.http.get<any>(`${environment.HOST2 + 'GetAllMovies'}`)
  }

  public getRelatedMovies(catId: number): any {
    return this.http.get<any>(`${environment.HOST2 + 'GetMoviesOnCategory/' + catId}`)
  }

  public getSingleMovie(idMovie: number): any {
    return this.http.get<any>(`${environment.HOST2 + 'GetSingleMovie/' + idMovie}`)
  }

  public addMovie(formData: FormData): any {
    return this.http.post<any>(`${environment.HOST2 + 'CreateMovie'}`, formData)
  }

  public updtMovie(idMovie: number, formData: FormData): any {
    return this.http.patch<any>(`${environment.HOST2 + 'UpdateMovie/' + idMovie}`, formData)
    // return this.http.patch<any>('https://localhost:44379/api/Movie/UpdateMovie/' + idMovie, formData)
  }

  public searchMovie(search: string): any {
    return this.http.get<any>(`${environment.HOST2 + 'SearchMovie/' + search}`)
  }
}
