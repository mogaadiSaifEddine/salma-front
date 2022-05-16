import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuth = false;
  constructor(private router: Router, private userServiice: UserService) {}
  title = 'Salma';
  menRoutes = [
    {
      name: 'Chantiers',
      path: 'chant',
    },
    {
      name: 'Projets',
      path: 'projet',
    },
    {
      name: 'Demande',
      path: 'demande',
    },
  ];
  ngOnInit(): void {
    this.userServiice.loggedIn.subscribe((data) => {
      this.isAuth = data;
      console.log(data);
    });
    this.menRoutes = [
      {
        name: 'Chantiers',
        path: '/chant',
      },
      {
        name: 'Projets',
        path: '/projet',
      },
      {
        name: 'Demande',
        path: 'demande',
      },
    ];
  }
  logout() {
    this.userServiice.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
