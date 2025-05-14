export interface Booking {
  [x: string]: any;
  roomID: number;
  checkInDate: Date; 
  checkOutDate: Date; 
  totalPrice: number;
  isConfirmed: boolean;
  customerName: string; 
  customerPhone: string; 
  customerId: string; 
}
