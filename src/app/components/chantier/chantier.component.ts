import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChantierService } from 'src/app/services/chantier.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css'],
})
export class ChantierComponent implements OnInit {
  chantiers = [];
  listOfDisplayData: any;

  constructor(
    private chantService: ChantierService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllChantiers();
  }
  getAllChantiers() {
    this.chantService.getAllChant().subscribe((data: any) => {
      this.chantiers = data;
      console.log(data);

      this.listOfDisplayData = [...this.chantiers];
    });
  }
  showProjet(channtier: any) {
    this.sharedService.chantierId = channtier.c_Id;
    this.router.navigate(['/projet']);
    // confirm('Projoets   ' + channtier);
  }
}
