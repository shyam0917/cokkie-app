import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [AuthenticationService]
})

export class SignupPage implements OnInit {
  errMessage: string = "";
  isLogin: boolean = true;
  isFailed: boolean = false;
  userCredentials = {
    username: "",
    password: ""
  }

  constructor(private loginService: AuthenticationService,
    private router: Router,
    private menu: MenuController) {
  }

  ngOnInit() {
    this.userCredentials = {
      username: "",
      password: ""
    }
    this.errMessage = "";
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(false);

  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

  togglePage() {
    this.isLogin = !this.isLogin;
  }

  login(loginData) {
    if (!loginData || !loginData.username || !loginData.password) {
      this.isFailed = true;
      this.errMessage = "FILL ALL THE DETAILS";
      return
    } else {
      const formData = new FormData();
      formData.append('username', loginData.username);
      formData.append('password', loginData.password);
      this.loginService.oniLogin(formData).subscribe(res => {
        if (res && res['data']) {
          if (res['code'] == "invalid_username") {
            this.isFailed = true;
            this.errMessage = "INVALID CREDENTIALS";
          } else {
            this.router.navigate(['home']);
            localStorage.setItem("userData", JSON.stringify(res['data']));
          }

        } else {
          this.isFailed = true;
          this.errMessage = "INVALID CREDENTIALS";
        }


      }, err => {
        this.isFailed = true;
        this.errMessage = "INVALID CREDENTIALS";
      })
    }

  }

}
