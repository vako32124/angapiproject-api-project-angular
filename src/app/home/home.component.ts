import { Component } from '@angular/core';
import { ApiservicesService } from '../services/apiservices.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  hotels: any[] = [];
  router: any;

  constructor(private api: ApiservicesService, private auth: AuthService) {}

  ngOnInit(): void {
   

    this.api.getAllHotels().subscribe((res: any) => {
      console.log(res)
      this.hotels = res;
    });
  }


}
