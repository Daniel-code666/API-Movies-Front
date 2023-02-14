import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';
import { MoviesService } from '../services/movies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.css']
})
export class AddMoviesComponent implements OnInit {

  categories: any[]

  addMovForm = new FormGroup({
    idMovie: new FormControl(''),
    title: new FormControl('', Validators.required),
    movieImg: new FormControl(''),
    description: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  })

  constructor(private catService: CategoriesService, private movServ: MoviesService, private router: Router,
    private userServ: UsersService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
      next: (data: any) => {
        if (data.result.user.name != 'admin') {
          this.router.navigate(['home'])
        } else {
          this.getCategories()
        }
      },
      error: (e) => {
        console.log(e)
        this.router.navigate(['home'])
      }
    })
  }

  public getCategories(): void {
    this.catService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data
      }
    })
  }

  public addMovie(): void {
    const formData = new FormData()

    formData.append('title', this.addMovForm.get('title').value)
    formData.append('movieImg', this.addMovForm.get('movieImg').value)
    formData.append('description', this.addMovForm.get('description').value)
    formData.append('duration', this.addMovForm.get('duration').value)
    formData.append('rating', this.addMovForm.get('rating').value)
    formData.append('categoryId', this.addMovForm.get('categoryId').value)

    this.movServ.addMovie(formData).subscribe({
      next: (data: any) => {
        this.addMovForm.reset()
        Swal.fire(
          '',
          'La película ' + data.result.title + " ha sido creada",
          'success'
        )
      },
      error: (e) => {
        Swal.fire(
          '',
          'Hubo un error ' + e.message,
          'error'
        )
      }
    })
  }

  onFileSelect(event): void {
    const file = event.target.files[0]
    this.addMovForm.get('movieImg').setValue(file)
  }

}
