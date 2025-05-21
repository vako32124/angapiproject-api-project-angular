import { Component } from '@angular/core';
import { ApiservicesService } from '../services/apiservices.service';
import { RegisterUser } from '../register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  // 561908201


  constructor(private api : ApiservicesService , private auth : AuthService ){}


  registerUser : RegisterUser  = new RegisterUser;

loginNewUser(){
  this.api.loginUser(this.registerUser).subscribe(res =>{
    console.log(res);
    localStorage.setItem('token', res.token);
    this.auth.logIn();
  } );

 
}


}
