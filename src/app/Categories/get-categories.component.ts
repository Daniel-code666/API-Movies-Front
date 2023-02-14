import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.css']
})
export class GetCategoriesComponent implements OnDestroy, OnInit{

  dtOptions: any = {};
  categories: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private catServices: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories()
  }

  public getCategories(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons:['excel','csv', 'pdf']
    };

    this.catServices.getCategories().subscribe((data: any) => {
      this.categories = data
      this.dtTrigger.next(data)
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
