import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
       if (result.isConfirmed) {
        let stored = localStorage.getItem('bookings');
        let bookings = stored ? JSON.parse(stored) : [];

        let bookingId = booking.customerId || booking.id;
       let index = bookings.findIndex((b: { customerId: any; id: any; }) => (b.customerId || b.id) === bookingId);
        if (index !== -1) {
         bookings.splice(index, 1);
          localStorage.setItem('bookings', JSON.stringify(bookings));
          this.bookings = bookings;
          Swal.fire(
            'Deleted!',
            'Your booking has been deleted.',
            'success'
          );
        }
      }
    });
  }

  deleteBookingId: string = '';


  deleteBookingById(): void {
    let bookingId = Number(this.deleteBookingId);
  
    if (!bookingId) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid booking ID.',
        icon: 'warning'
      });
      return;
    }
  
    this.api.deleteBooking(bookingId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your booking has been successfully deleted.',
          icon: 'success'
        });
        this.deleteBookingId = '';
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Booking not found or could not be deleted.',
          icon: 'error'
        });
      }
    });
  }

  
}