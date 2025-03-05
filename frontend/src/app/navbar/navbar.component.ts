import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [NgIf, NgClass],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  handleAuth() {
    if (this.isAuthenticated) {
      localStorage.removeItem('token');
    } else {
      Router.navigate(['/login']);
    }
    this.checkAuth();
  }
}
