import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  constructor() { }

  ngOnInit() {
  }

  onChange($event) {
  }
}
