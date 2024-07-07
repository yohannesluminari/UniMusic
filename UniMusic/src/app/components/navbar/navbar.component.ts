import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  show:boolean = false
  isUserLoggedIn:boolean = false
  showNavbar: boolean = false;
  constructor(private authSvc:AuthService){}

  ngOnInit(){
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn  = data
    })
  }
  toggleNavbar(): void {
    this.showNavbar = !this.showNavbar;
  }

  logout(){
    this.authSvc.logout()
  }
}
