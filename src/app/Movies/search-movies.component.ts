import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styles: [
  ]
})
export class SearchMoviesComponent implements OnInit {

  @ViewChild('search') search: ElementRef;

  dtOptions: any = {};
  movies: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private movService: MoviesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public searchMovie(): void {
    if (this.search.nativeElement.value != null) {
      let movName = this.search.nativeElement.value

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        dom: 'Bfrtip',
        buttons: ['excel', 'csv', 'pdf']
      };

      this.movService.searchMovie(movName).subscribe({
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

    console.log(this.search.nativeElement.value)
  }
}
