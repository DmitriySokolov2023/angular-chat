import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
  });
  validations = '';
  onSubmit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value?.username || 'guest');
      this.validations = '';
      this.router.navigate(['/chat']);
    } else this.validations = 'Введите имя пользователя';
  }
}
