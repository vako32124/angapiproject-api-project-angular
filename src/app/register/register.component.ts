import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(private api : ApiservicesService){}

registerUser : RegisterUser  = new RegisterUser;

registerNewUser(){
  this.api.registerUser(this.registerUser).subscribe(res => console.log(res));

 
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
