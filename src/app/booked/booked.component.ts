import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booked',
  imports: [FormsModule, CommonModule],
  templateUrl: './booked.component.html',
  styleUrl: './booked.component.scss'
})
export class BookedComponent {

  bookings: any[] = [];

  ngOnInit(): void {
    let storedBookings = localStorage.getItem('bookings');
    this.bookings = storedBookings ? JSON.parse(storedBookings) : [];
  }
  deleteBooking(){
    
  }
  
}