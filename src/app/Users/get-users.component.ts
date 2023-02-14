import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit, OnDestroy {

  dtOptions: any = {};
  users: any;
  dtTrigger = new Subject<ADTSettings>();

  constructor(private userServ: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['excel', 'csv', 'pdf']
    };

    this.userServ.getUsers().subscribe({
      next: (data: any) => {
        this.users = data
        this.dtTrigger.next(data)
      },
      error: (e) => {
        Swal.fire(
          '',
          'Hubo un error ' + e.message,
          'error'
        )
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
