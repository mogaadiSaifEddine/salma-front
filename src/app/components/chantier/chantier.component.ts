import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css'],
})
export class ChantierComponent implements OnInit {
  chantiers = [];
  listOfDisplayData: any;
  listOfColumns: any[] = [
    {
      name: 'Chantiers ',
      sortOrder: null,

      listOfFilter: [],
      filterFn: null,
    },
  ];
  constructor(private chantService: ChantierService) {}

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
    confirm('Projoets   ' + channtier);
  }
  trackByName(_: number, item: any): string {
    return item.name;
  }
}
