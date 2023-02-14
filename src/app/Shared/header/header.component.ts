import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin = false
  isLogged = false
  isUser = false

  constructor(private userServ: UsersService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('Token') != null) {
      this.userServ.ValidateToken(sessionStorage.getItem('Token')).subscribe({
        next: (data: any) => {
          this.isLogged = true
          if (data.result.user.name === 'admin') {
            this.isAdmin = true
          } else if (data.result.user.name === 'user') {
            this.isUser = true
          }
        }, error: (e) => {
          console.log(e)
          sessionStorage.clear()
        }
      })
    }
  }

  public log_out(): void {
    sessionStorage.clear()
    this.router.navigate(['/home']).then(() => { window.location.reload() });
  }
}
