import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-hotel-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {
  hotel: Hotel | undefined;
  rooms: Room[] = [];

  constructor(private route: ActivatedRoute, private api: ApiservicesService) {}

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getHotelById(id).subscribe((res: any) => {
      this.hotel = res;
    });

    this.api.getAllRooms().subscribe((res: any) => {
      this.rooms = res.filter((room: any) => room.hotelId === id);
    });
  }
  }

