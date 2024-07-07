import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILoginData } from '../../models/i-login-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData: ILoginData = { email: '', password: '' };
  submitted: boolean = false;
  // loginData!:ILoginData
  // loginData:ILoginData= {
  //   email:'g.lum@gmail.com',
  //   password:'11111111'
  // }

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  signIn() {
    this.submitted = true;

    if (!this.loginData.email || !this.loginData.password) {
      return;
    }

    this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.router.navigate(['/areaPrivata']);
      });
  }
}
