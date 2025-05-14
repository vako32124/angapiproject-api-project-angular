import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiservicesService } from '../services/apiservices.service';


@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  customerName: string = '';
  roomID: number | undefined;
  idNumber: string = ''; 
  phoneNumber: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiservicesService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomID = Number(params.get('id'));
    });
  }

  onSubmit(bookingForm: NgForm) {
    if (bookingForm.valid && this.roomID) {
      let postObject = {
        roomID: this.roomID,
        checkInDate: this.checkInDate, 
        checkOutDate: this.checkOutDate,
        totalPrice: 100,
        isConfirmed: true,
        customerName: this.customerName,
        customerPhone: '',
        customerId: this.idNumber
          // roomId: this.roomID,
          // checkInDate: this.checkInDate,
          // checkOutDate: this.checkOutDate,
          // customerName: this.customerName,
          // phoneNumber: this.phoneNumber,
          // customerId: this.idNumber,
      };
 
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
 
      this.api.createBooking(postObject).subscribe({
        next: (res) => {
          Swal.fire({
            title: `Booked Successfully!`,
            text: `Booking ID: ${res['id']}`,
            icon: 'success',
          }).then(() => {
            let existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            existingBookings.push({ ...postObject, id: res['id'] });
            localStorage.setItem('bookings', JSON.stringify(existingBookings));

            this.router.navigate(['/home']);
          });
        },
        error: (err) => {
          console.log(err);

          let text = err?.error?.text || '';

          if (text.includes('successfully')) {
            let match = text.match(/ID[:\s]*([0-9]+)/i);
            let bookingId = match ? match[1] : 'Unknown';

            Swal.fire({
              title: 'Booked Successfully!',
              icon: 'success',
              text: `Booking ID: ${bookingId}`,
            }).then(() => {
              let existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
              existingBookings.push({ ...postObject, id: bookingId });
              localStorage.setItem('bookings', JSON.stringify(existingBookings));

              this.router.navigate(['/home']);
            });
          } else {
            Swal.fire({
              title: 'Booking Failed',
              text: err.error?.message || 'An error occurred during booking',
              icon:'error'
            });
          }
        }
      });
    }
  }
}
