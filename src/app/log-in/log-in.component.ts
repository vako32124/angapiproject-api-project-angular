import { Component } from '@angular/core';
import { ApiservicesService } from '../services/apiservices.service';
import { RegisterUser } from '../register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  registerUser: RegisterUser = new RegisterUser();

  constructor(
    private api: ApiservicesService,
    private auth: AuthService,
    private router: Router
  ) {}

  loginNewUser() {
    this.api.loginUser(this.registerUser).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.auth.logIn();

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/home']); 
        });
      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Please check your credentials.',
        });
      }
    });
  }

}
