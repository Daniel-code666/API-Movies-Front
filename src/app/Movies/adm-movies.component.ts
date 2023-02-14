import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-adm-movies',
  templateUrl: './adm-movies.component.html',
  styleUrls: ['./adm-movies.component.css']
})
export class AdmMoviesComponent implements OnDestroy, OnInit {

  dtOptions: any = {};
  movies: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private movService: MoviesService, private router: Router, private userServ: UsersService) { }

  ngOnInit(): void {
    this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
      next: (data: any) => {
        if (data.result.user.name === 'admin') {
          this.getAllMovies()
        } else {
          this.router.navigate(['home'])
        }
      },
      error: (e) => {
        console.log(e)
        this.router.navigate(['home'])
      }
    })
  }

  public getAllMovies(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['excel', 'csv', 'pdf']
    };

    this.movService.getMovies().subscribe((data: any) => {
      this.movies = data
      this.dtTrigger.next(data)
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
