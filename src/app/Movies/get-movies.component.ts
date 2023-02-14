import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';

@Component({
  selector: 'app-get-movies',
  templateUrl: './get-movies.component.html',
  styleUrls: ['./get-movies.component.css']
})
export class GetMoviesComponent implements OnDestroy, OnInit {

  dtOptions: any = {};
  movies: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private movService: MoviesService) { }

  ngOnInit(): void {
    this.getAllMovies()
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
