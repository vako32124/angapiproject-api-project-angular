import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerUser: RegisterUser = new RegisterUser();

  constructor(
    private api: ApiservicesService,
    private router: Router
  ) {}

  registerNewUser() {
    this.api.registerUser(this.registerUser).subscribe({
      next: (res) => {
        console.log(res);

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in.',
          confirmButtonText: 'Go to Login',
          timer: 2500,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/login']); 
        });
      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error?.message || 'Please try again.',
        });
      }
    });
  }
}




export class RegisterUser {
  phoneNumber!: string;
  password!: string;
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  role: string = "";
}
