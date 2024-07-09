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
    // Validazione dei campi richiesti
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password) {
      Object.keys(this.registerData).forEach(key => {
        this.showError[key as keyof IUser] = !this.registerData[key as keyof IUser];
      });
      return;
    }
    this.authSvc.register(this.registerData)
      .subscribe(data => {
        this.router.navigate(['/areaPrivata']);
      });
  }
 // Funzione per controllare se un campo è vuoto
 checkEmpty(field: keyof IUser) {
  this.showError[field] = !this.registerData[field];
}


}
