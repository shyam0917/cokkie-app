import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CategoryService } from '../services/category.service';
import { TimeFormat } from './mypipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appointmentArray: any = [];
  getCurrentDate: any = "";
  constructor(private router: Router,
    private menu: MenuController,
    private categoryService: CategoryService) {
      this.getCurrentDate = new Date();
     }

  ngOnInit() {
    this.getAppointments();
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(true);

  }

  getAppointments() {
    this.categoryService.getScheduleData().subscribe(res => {
      if (res['data']) {
        this.appointmentArray = res['data'];
        let currDate = new Date();
        this.appointmentArray = this.appointmentArray.filter(item => {
          if (currDate >= new Date(item.startdatetime) && currDate <= new Date(item.enddatetime)) {
            return item;
          }
        })
        console.log("ar",this.appointmentArray);

      }
      console.log("res", res);
    }, err => {
      console.log("Err", err);
    })
  }



}
