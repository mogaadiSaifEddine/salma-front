import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  constructor(
    private fb: FormBuilder,
    private useService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.email]],
      remember: [true],
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.useService.login(this.validateForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.createMessage('success', 'Login Success');
          this.router.navigate(['/chant']);
          localStorage.setItem('role', res?.role);
        },
        (err: any) => {
          console.log(err);
          this.createMessage('error', 'Login Failed');
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
