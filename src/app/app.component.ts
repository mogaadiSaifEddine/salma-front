import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
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
}
