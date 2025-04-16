import { Component } from '@angular/core';
import { Router,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  checkInDate: string = '';
  checkOutDate: string = '';
  fullname: string = ''
  constructor(private router: Router) {}

  onSubmit(bookingForm : NgForm) {
  if( bookingForm.valid ){
    let postobject = {
      roomID: 2,
      checkInDate: new Date(this.checkInDate),
      checkOutDate:new Date(this.checkOutDate),
      totalPrice: 0,
      isConfirmed: true,
      customerName: this.fullname ,
      customerId: "string",
      customerPhone: "string"
    }

    let checkIn = new Date(this.checkInDate);
    let checkOut = new Date(this.checkOutDate);

    if (checkOut < checkIn) {
      Swal.fire({
        title: 'Invalid Date',
        text: 'Check-out date cannot be before check-in date.',
        icon: 'error',
      });
      return; 
    }

    Swal.fire({
      title: 'Booked Successfully!',
      icon: 'success',
    }).then(() => {
      this.router.navigate(['/home']);
    });
  }
  }
}
