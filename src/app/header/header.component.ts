import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuOpen = signal(false);

  constructor(public auth: AuthService) {} 

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout() {
    this.auth.logOut();
  }
}
