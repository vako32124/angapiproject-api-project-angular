import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-details',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {
  hotel: Hotel | undefined;
  rooms: Room[] = [];
  roomId: number | undefined;
  router: any;

  constructor(private route: ActivatedRoute, private routerr: Router, private api: ApiservicesService , private auth : AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = Number(params.get('id'));
  
  
      this.api.getHotelById(id).subscribe(
        (res: any) => {
          this.hotel = res;
        },
        error => console.error('Error fetching hotel:', error)
      );
  
      this.api.getAllRooms().subscribe(
        (res: any) => {
          this.rooms = res.filter((room: any) => room.hotelId === id);
        },
        error => console.error('Error fetching rooms:', error)
      );
    });
  }

  bookRoom(id:number) { console.log(this.auth.isLoggedIn());
    if (!this.auth.isLoggedIn()) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first',
        confirmButtonText: 'OK'
      }).then(() => {
        this.routerr.navigateByUrl('/login');
      });
      return;
    }
 
     this.routerr.navigateByUrl(`/book/${id}`);
  }

}




