import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home',
      loadComponent: () =>
        import('./home/home.component').then(m => m.HomeComponent),
    },
    {
      path: 'about',
      loadComponent: () =>
        import('./about/about.component').then(m => m.AboutComponent),
    },
    {
      path: 'booked',
      loadComponent: () =>
        import('./booked/booked.component').then(m => m.BookedComponent),
    },
    {
      path: 'contact',
      loadComponent: () =>
        import('./contact/contact.component').then(m => m.ContactComponent),
    },
    {
      path: 'hotel/:id',
      loadComponent: () =>
        import('./hotel-details/hotel-details.component').then(m => m.HotelDetailsComponent),
    },
    {
      path: 'book/:id',
      loadComponent: () =>
        import('./booking/booking.component').then(m => m.BookingComponent),
    },
    {
      path: '**',
      loadComponent: () =>
        import('./error/error.component').then(m => m.ErrorComponent),
    },

];
