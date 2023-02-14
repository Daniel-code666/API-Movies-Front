import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCatForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private catServices: CategoriesService, private router: Router, private userServ: UsersService) { }

  ngOnInit(): void {
    this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
      next: (data: any) => {
        if (data.result.user.name != 'admin') {
          this.router.navigate(['home'])
        }
      },
      error: (e) => {
        console.log(e)
        this.router.navigate(['home'])
      }
    })
  }

  public addCategory(): void {
    let name = this.addCatForm.get('name').value

    if (name == ''){
      Swal.fire(
        '',
        'Hay campos vacíos',
        'warning'
      )
    } else {
      this.catServices.addCategory(name).subscribe({
        next: (data: any) => {
          this.addCatForm.reset()
          Swal.fire(
            '',
            'La categoría ' + data.name + " ha sido creada",
            'success'
          )
        },
        error: (e) =>{
          console.log(e)
          Swal.fire(
            '',
            'Hubo un error...',
            'error'
          )
        }
      })
    }

    console.log(name)
  }
}
