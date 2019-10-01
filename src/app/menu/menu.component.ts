import { Component } from '@angular/core';

import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isMenuOpen: boolean = false;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    }
  }
  disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
  }
  enableScrolling() {
    window.onscroll = function () { };
  }

  loginToSelfcare() {
    this.isMenuOpen = false;

    if (this.currentUser === null) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/selfcare']);
    }
  }

  onSubmitForm(from: NgForm) {
    from.resetForm();
  }
}
