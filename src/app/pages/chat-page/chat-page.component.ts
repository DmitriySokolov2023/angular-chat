import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat-page',
  imports: [],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  username: string = '';
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'guest123';
    console.log(this.username);
  }
  logout() {
    this.loginService.logout();
  }
}
