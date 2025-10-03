import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string | null = '';

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('username');
   
    this.username = null;
    this.router.navigate(['/login']);
  }
}
