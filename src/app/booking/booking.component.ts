import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  checkInDate: string = '';
  checkOutDate: string = '';
  fullname: string = '';
  roomID: number | undefined; 

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.roomID = Number(params.get('id'));
      console.log('Room ID:', this.roomID); 
    });
  }

  onSubmit(bookingForm: NgForm) {
    if (bookingForm.valid && this.roomID) {
      let postobject = {
        roomID: this.roomID, 
        checkInDate: new Date(this.checkInDate),
        checkOutDate: new Date(this.checkOutDate),
        customerName: this.fullname,
        customerId: "string",
        customerPhone: "string"
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

      Swal.fire({
        title: 'Booked Successfully!',
        icon: 'success',
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}

