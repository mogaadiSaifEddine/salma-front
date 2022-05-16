import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChantierService } from 'src/app/services/chantier.service';
import { ProjetService } from 'src/app/services/projet.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
})
export class ProjetComponent implements OnInit {
  chntId: number | undefined = undefined;
  projetList: any[] = [];
  listOfDisplayData: any[] = [];
  chantiers: any[] = [];
  public validateForm!: FormGroup;
  isVisibleAdd = false;
  editMode = false;
  userRole: string | null | undefined = '';
  users: any[] = [];
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  listOfColumns: any[] = [
    {
      name: 'Projet ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.nom.localeCompare(b.nom),
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Chantier  ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.chantier.nom.localeCompare(b.chantier.nom),
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: "Date D'ajout  ",
      sortOrder: null,
      sortFn: (a: any, b: any) => a.date.localeCompare(b.date),
      listOfFilter: [],
      filterFn: null,
    },
  ];
  constructor(
    private sharedService: SharedService,
    private projetService: ProjetService,
    private chantService: ChantierService,
    private userService: UserService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')?.toLocaleLowerCase();
    this.getProjectsByChantId();
    this.getAllUSers();
  }

  initForm(projet?: any) {
    this.validateForm = this.fb.group({
      id: [projet?.p_Id ?? null, []],
      nom: [projet?.nom ?? null, [Validators.required]],
      user: [
        projet?.users[0] ? projet?.users[0].id : null,
        [Validators.required],
      ],
      chantier: [projet?.chantier?.c_Id ?? null, [Validators.required]],
    });
  }

  getAllUSers() {
    this.userService.getAllUSers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }
  getProjectsByChantId() {
    this.chntId = this.sharedService.chantierId;

    this.projetService.getAllProjets().subscribe((data: any[]) => {
      this.projetList = !!this.chntId
        ? data.filter(
            (proj) =>
              proj?.chantier?.c_Id === this.chntId && proj.state === true
          )
        : data.filter((proj) => proj.state === true);
      console.log(this.projetList);
      this.listOfDisplayData = [...this.projetList];
    });
    this.getAllChantiers();
    // this.sharedService.chantierId = undefined;
    // console.log(chantId);
  }
  getAllChantiers() {
    this.chantService.getAllChant().subscribe((data: any) => {
      this.chantiers = data;
      console.log(data);
    });
  }
  trackByName(_: number, item: any): string {
    return item.name;
  }
  searchAll(value: any) {
    console.log(value.target.value);

    this.listOfDisplayData = this.projetList.filter(
      (item: any) =>
        item.nom.indexOf(value.target.value) !== -1 ||
        item.chantier.nom.indexOf(value.target.value) !== -1
    );
  }
  deleteProjet(id: number) {
    if (confirm('Are you sure to delete this projet?')) {
      this.projetService.deleteProjet(id).subscribe((data: any) => {
        console.log(data);
        this.createMessage('success', 'Projet deleted successfully');
        this.getProjectsByChantId();
      });
    }
  }
  openModalAdd() {
    this.editMode = false;
    this.initForm();
    this.isVisibleAdd = true;
  }
  openModalUpdate(projet: any) {
    this.editMode = true;

    this.initForm(projet);
    this.isVisibleAdd = true;
  }
  handleCancel() {
    this.isVisibleAdd = false;
  }
  saveProjet(projet: any) {
    this.editMode
      ? this.projetService
          .updateProjet(this.validateForm.get('id')?.value, projet)
          .subscribe((data: any) => {
            this.createMessage('success', 'Projet updated successfully');
            this.getProjectsByChantId();
          })
      : this.projetService.addProjet(projet).subscribe((data: any) => {
          console.log(data);
          this.createMessage('success', 'Projet added successfully');
          this.getProjectsByChantId();
        });
    this.isVisibleAdd = false;
  }

  handleOk() {
    if (!this.validateForm.valid) {
      this.createMessage('error', 'Please fill all the required fields');
      return;
    }

    const channt = this.chantiers.find(
      (chant) => chant.c_Id == this.validateForm.get('chantier')?.value
    );
    const user = this.users.find(
      (user) => user.id == this.validateForm.get('user')?.value
    );
    const projet = {
      nom: this.validateForm.get('nom')?.value,

      chantier: channt,
      user: [user],
    };
    console.log(this.validateForm.get('chantier')?.value);
    this.saveProjet(projet);
  }
}
