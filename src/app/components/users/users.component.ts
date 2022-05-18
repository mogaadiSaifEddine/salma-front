import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userRole: string | null | undefined = '';
  listOfDisplayData: any[] = [];
  isVisibleAdd = false;
  roles = ['responsable', 'CISO', 'PMO'];

  public validateForm!: FormGroup;

  listOfColumns: any[] = [
    {
      name: 'Nom ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.nom.localeCompare(b.nom),
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Prenom  ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.prenom.localeCompare(b.prenom),
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Email  ',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.email.localeCompare(b.email),
      listOfFilter: [],
      filterFn: null,
    },
  ];

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')?.toLocaleLowerCase();
    this.getAllUSers();
  }
  getAllUSers() {
    this.userService.getAllUSers().subscribe((data) => {
      this.users = data;
      console.log(data);
      this.listOfDisplayData = [...this.users];
    });
  }
  openModal(id?: string) {
    this.initForm();
    console.log(id);
    this.isVisibleAdd = true;
  }

  initForm(user?: any) {
    this.validateForm = this.fb.group({
      id: [user?.id ?? null, []],
      username: [user?.prenom ?? null, [Validators.required]],
      name: [user?.nom ?? null, [Validators.required]],
      email: [user?.email ?? null, [Validators.required, Validators.email]],
      password: [user?.password ?? null, [Validators.required]],
      role: [user?.role ?? null, [Validators.required]],
    });
  }
  deleteUser(id: number) {
    if (confirm('Voulez-vous supprimer ce projet ?')) {
      this.userService.deleteUser(id).subscribe((data) => {
        console.log(data);
        this.getAllUSers();
      });
    }
  }
  openModalUpdate(id: number) {}
  trackByName(_: number, item: any): string {
    return item.name;
  }
  handleCancel() {
    this.isVisibleAdd = false;
  }
  handleOk() {
    this.saveUSer();
    console.log(this.validateForm.value);
    this.isVisibleAdd = false;
  }
  saveUSer() {
    console.log(this.validateForm.value);
    this.userService.signup(this.validateForm.value).subscribe((data: any) => {
      // this.users.push(data);
      console.log(data);

      // this.listOfDisplayData = [...this.users];
      this.getAllUSers();
    });
  }
}
