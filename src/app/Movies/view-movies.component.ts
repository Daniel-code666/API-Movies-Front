import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';
import { MoviesService } from '../services/movies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {

  idMovie: string
  rating: number
  categoryId: number

  ratingsArr = [0, 1, 2, 3]

  categories: any[]

  updtMovForm = new FormGroup({
    idMovie: new FormControl(''),
    title: new FormControl('', Validators.required),
    movieImg: new FormControl(''),
    description: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private curRoue: ActivatedRoute, private movServ: MoviesService,
    private catService: CategoriesService, private userServ: UsersService) { }

  ngOnInit(): void {
    this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
      next: (data: any) => {
        if (data.result.user.name != 'admin') {
          this.router.navigate(['home'])
        } else {
          this.getSingleMovie()
        }
      },
      error: (e) => {
        console.log(e)
        this.router.navigate(['home'])
      }
    })
  }

  public getSingleMovie(): void {
    this.idMovie = this.curRoue.snapshot.paramMap.get('idMovie')

    this.getCategories()

    this.movServ.getSingleMovie(Number(this.idMovie)).subscribe({
      next: (data: any) => {
        this.updtMovForm.patchValue({
          idMovie: data.idMovie,
          title: data.title,
          movieImg: data.movieImg,
          description: data.description,
          duration: data.duration,
          rating: data.rating,
          categoryId: data.categoryId
        })
      },
      error: (e) => {
        this.router.navigate(['/']).then(() => { window.location.reload() })
        Swal.fire(
          '',
          'Hubo un error ' + e.message,
          'error'
        )
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

}
