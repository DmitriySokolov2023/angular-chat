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
  private channel: BroadcastChannel;
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
  });
  noValid = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.channel = new BroadcastChannel('login_channel');
  }

  ngOnInit(): void {
    this.channel.addEventListener('message', () => {
      this.router.navigate(['/chat']);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value?.username || 'guest');
      this.noValid = '';
      this.channel.postMessage('login_channel');
      this.router.navigate(['/chat']);
    } else this.noValid = 'Введите имя пользователя';
  }
}
