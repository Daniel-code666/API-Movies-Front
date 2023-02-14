import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-view-updt-category',
  templateUrl: './view-updt-category.component.html',
  styleUrls: ['./view-updt-category.component.css']
})
export class ViewUpdtCategoryComponent implements OnInit {

  catId: number
  name: string
  created_at: string

  updtCatForm = new FormGroup({
    name: new FormControl('', Validators.required),
    created_at: new FormControl('')
  })

  constructor(private router: Router, private curRoue: ActivatedRoute, private catServices: CategoriesService) { }

  ngOnInit(): void {
    this.getSingleCategory()
  }

  getSingleCategory(): void {
    this.catId = Number(this.curRoue.snapshot.paramMap.get('id'))

    this.catServices.getSingleCategory(this.catId).subscribe({
      next: (data: any) => {
        this.updtCatForm.patchValue({
          name: data.name,
          created_at: data.created_at
        })
      },
      error: (e) => {
        Swal.fire(
          '',
          'Hubo un error ' + e.message,
          'error'
        )
        this.router.navigate(['/admcategory'])
      }
    })
  }

  updtCategory(): void {
    let category = {
      id: this.catId,
      name: this.updtCatForm.get('name').value,
      created_at: this.created_at
    }

    this.catServices.updtCategory(this.catId, category).subscribe({
      next: (data: any) => {
        Swal.fire(
          '',
          'Categoría actualizada',
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

}
