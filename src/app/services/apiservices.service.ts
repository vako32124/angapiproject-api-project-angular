import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking';


@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  private baseUrl = 'https://hotelbooking.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/Hotels/GetAll`);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/Hotels/GetHotel/${id}`);
  }

 
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/Rooms/GetAll`);
  }

  
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/Rooms/GetRoom/${id}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/Booking`, booking);
  }   

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Booking/${bookingId}`);
  }

}

