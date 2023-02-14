import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-related-movies',
  templateUrl: './related-movies.component.html',
  styleUrls: ['./related-movies.component.css']
})
export class RelatedMoviesComponent implements OnDestroy, OnInit {

  catId: number
  dtOptions: any = {};
  movies: any;
  dtTrigger = new Subject<ADTSettings>();
  isAdmin = false
  isUser = false

  constructor(private movService: MoviesService, private curRoue: ActivatedRoute, private userServ: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('Token') != null) {
      this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
        next: (data: any) => {
          if (data.result.user.name === 'admin') {
            this.isAdmin = true
          } else {
            this.isUser = true
          }

          this.getRelatedMovies()
        },
        error: (e) => {
          console.log(e)
          this.router.navigate(['home'])
        }
      })
    } else {
      this.isUser = true
      this.getRelatedMovies()
    }
  }

  getRelatedMovies(): void {
    this.catId = Number(this.curRoue.snapshot.paramMap.get('id'))

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['excel', 'csv', 'pdf']
    };

    this.movService.getRelatedMovies(this.catId).subscribe({
      next: (data: any) => {
        this.movies = data
        this.dtTrigger.next(data)
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

  deleteMovie(idMovie: number): void {
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
