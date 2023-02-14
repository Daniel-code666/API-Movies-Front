import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServ: UsersService, private router: Router) { }

  loginForm = new FormGroup({
    nickName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (sessionStorage.getItem('Token') != null) {
      sessionStorage.clear()
    }
  }

  login() {
    let nickName = this.loginForm.get('nickName').value
    let password = this.loginForm.get('password').value

    if (nickName == '' || password == '') {
      Swal.fire(
        '',
        'Hay campos vacíos',
        'warning'
      )
    }
    else {
      this.userServ.login(nickName, password).subscribe({
        next: (data: any) => {
          this.loginForm.reset()
          sessionStorage.setItem(environment.TOKEN, data.result.token)
          sessionStorage.setItem("username", data.result.user.name)
          Swal.fire(
            '',
            'Bienvenido ' + data.result.user.name,
            'success'
          )
          this.router.navigate(['/']).then(() => { window.location.reload() })
        },
        error: (e) => {
          this.loginForm.reset()
          Swal.fire(
            '',
            'Usuario o contraseña incorrecta',
            'error'
          )
        }
      })
    }
  }

  onClose() {
    this.router.navigate(['/login']);
  }
}
