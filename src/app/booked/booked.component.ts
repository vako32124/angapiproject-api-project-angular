import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-booked',
  imports: [FormsModule, CommonModule],
  templateUrl: './booked.component.html',
  styleUrl: './booked.component.scss'
})
export class BookedComponent {

  bookings: any[] = [];
 constructor(private api : ApiservicesService){}


  ngOnInit(): void {
    let storedBookings = localStorage.getItem('bookings');
    this.bookings = storedBookings ? JSON.parse(storedBookings) : [];
  }
  deleteBooking(booking: any): void {
    let stored = localStorage.getItem('bookings');
    let bookings = stored ? JSON.parse(stored) : [];

    let bookingId = booking.customerId || booking.id;
    let index = bookings.findIndex((b: { customerId: any; id: any; }) => (b.customerId || b.id) === bookingId);
    if (index !== -1) {
      bookings.splice(index, 1);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      this.bookings = bookings;
    }
  }
  
}