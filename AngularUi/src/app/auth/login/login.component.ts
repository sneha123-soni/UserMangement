import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
        (response: any) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/tasks']);
        },
        error => {
            alert('Login failed');
        }
    );
  }

}
