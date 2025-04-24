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
  checkInDate: string = '';
  checkOutDate: string = '';
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
          roomId: this.roomID,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          customerName: this.customerName,
          phoneNumber: this.phoneNumber,
          customerId: this.idNumber,
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
            title: 'Booked Successfully!',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: (err) => {
     
          if(err.error.text){
            if(err.error.text.includes('successfully')){
              Swal.fire({
                title: 'Booked Successfully!',
                icon: 'success',
              }).then(() => {
                this.router.navigate(['/home']);
              });
            }
           
          }
          else {
           
            Swal.fire({
              title: 'Booking Failed',
              text: err.error?.message || 'An error occurred during booking',
              icon: 'error',
            });
          }
         
         
        }
      });
    }
  }
}
