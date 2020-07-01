import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
  public displayUser = "";
  public displayemail = "";
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sign Out',
      url: '/signout',
      icon: 'log-out'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loginService: AuthenticationService
  ) {
    this.initializeApp();
    if (localStorage.getItem('userData')) {
      this.displayUser = JSON.parse(localStorage.getItem('userData')).display_name;
      this.displayemail = JSON.parse(localStorage.getItem('userData')).user_email;
      this.router.navigate(['/home']);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  goTo(path) {
    if (path.url === '/signout') {
      this.router.navigate(['signup']);
      localStorage.removeItem('userData');
    }

  }


}
