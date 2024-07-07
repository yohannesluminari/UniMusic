import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent {
  users: IUser[] = [];
  cardColors: string[] = [];

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.getAllUsers().subscribe(users => {
      this.users = users;
      this.setCardColors();
    });
  }

  setCardColors(): void {
    this.cardColors = this.users.map(user => this.getRandomColor());
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
