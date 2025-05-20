import { Component } from '@angular/core';
import { ApiservicesService } from '../services/apiservices.service';
import { RegisterUser } from '../register/register.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  constructor(private api : ApiservicesService){}


  registerUser : RegisterUser  = new RegisterUser;

loginNewUser(){
  this.api.loginUser(this.registerUser).subscribe(res => console.log(res));

 
}


}
