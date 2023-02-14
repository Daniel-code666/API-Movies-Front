import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-category',
  templateUrl: './adm-category.component.html',
  styleUrls: ['./adm-category.component.css']
})
export class AdmCategoryComponent implements OnDestroy, OnInit {

  dtOptions: any = {};
  categories: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private catServices: CategoriesService, private router: Router, private userServ: UsersService) { }

  ngOnInit(): void {
    this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
      next: (data: any) => {
        if (data.result.user.name === 'admin') {
          this.getCategories()
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

  public getCategories(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['excel', 'csv', 'pdf']
    };

    this.catServices.getCategories().subscribe((data: any) => {
      this.categories = data
      this.dtTrigger.next(data)
    })
  }

  deleteCategory(id: number): void {
    this.catServices.deleteCategory(id).subscribe({
      next: (data: any) => {
        Swal.fire(
          '',
          'La categoría ha sido eliminada',
          'success'
        )
        this.router.navigate(['/admcategory']).then(() => { window.location.reload() })
      },
      error: (e) => {
        console.log(e)
        Swal.fire(
          '',
          'Hubo un problema',
          'error'
        )
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
