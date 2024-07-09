import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../../models/i-user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData: Partial<IUser> = {};
  showError: { [key in keyof IUser]?: boolean } = {};

  constructor(private authSvc:AuthService, private router:Router){}

  signUp() {
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password) {

      return;
    }

    this.authSvc.register(this.registerData)
      .subscribe(data => {
        this.router.navigate(['/areaPrivata']);
      });
  }
  checkEmpty(field: keyof IUser) {
    if (this.registerData[field]) {
      this.showError[field] = false;
    } else {
      this.showError[field] = true;
    }
  }


}
