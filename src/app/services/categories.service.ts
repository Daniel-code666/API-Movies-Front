import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getCategories(): any {
    return this.http.get<any>(`${environment.HOST1 + 'GetAllCategory'}`)
  }

  public getSingleCategory(id: number): any {
    return this.http.get<any>(`${environment.HOST1 + 'GetSingleCategory/' + id}`)
  }

  public addCategory(name: string): any {
    let category = {
      name: name
    }

    return this.http.post<any>(`${environment.HOST1 + 'CreateCategory'}`, category)
  }

  public updtCategory(id: number, category: object): any {
    return this.http.patch<any>(`${environment.HOST1 + 'UpdateCategory/' + id}`, category)
  }

  public deleteCategory(id: number): any {
    return this.http.delete<any>(`${environment.HOST1 + 'DeleteCategory/' + id}`)
  }
}
