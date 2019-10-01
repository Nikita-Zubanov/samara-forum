import { Component, OnInit } from '@angular/core';
import { Role } from '../_models/role';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-selfcare',
  templateUrl: './selfcare.component.html',
  styleUrls: ['./selfcare.component.css']
})
export class SelfcareComponent {
  currentUser: User;
  users: User[] = [];


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
