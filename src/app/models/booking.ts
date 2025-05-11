export interface Booking {
  roomID: number;
  checkInDate: Date; 
  checkOutDate: Date; 
  totalPrice: number;
  isConfirmed: boolean;
  customerName: string; 
  customerPhone: string; 
  customerId: string; 
}
