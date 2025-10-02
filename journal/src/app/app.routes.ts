import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
