import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [AuthGuard],
  },
];
