import { Component } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
     if (!this.username || !this.email || !this.password) {
      this.error = 'Alla fält är obligatoriska';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Konto skapat! Du kan nu logga in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registrering misslyckades:', err);
        this.error = 'Registrering misslyckades, försök igen.';
      }
    });
  }
  }

