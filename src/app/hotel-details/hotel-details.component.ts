import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';

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

  constructor(private route: ActivatedRoute, private api: ApiservicesService) {}

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
  

}

