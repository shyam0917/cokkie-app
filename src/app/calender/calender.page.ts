import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.page.html',
    styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
    eventSource: any = [];
    viewTitle;
    isLoading: boolean = false;
    dropdownArray: any = [];
    apiSource: any = [];
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function (date: Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function (date: Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function (date: Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function (date: Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function (date: Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function (date: Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function (date: Date) {
                return 'testDH';
            },
            formatDayViewTitle: function (date: Date) {
                return 'testDT';
            }
        }
    };

    constructor(private categoryService: CategoryService) {
        this.getDropdownData();
    }

    ngOnInit() {
        this.isLoading = true;
        this.loadEvents();
    }

    // loadEvents() {
    //     this.eventSource = this.getEvents();
    // }

    getDropdownData() {
        this.categoryService.getScheduleDropdownData().subscribe(res => {
            if (res['data']) {
                this.dropdownArray = res['data'];
            }
        }, err => {
            console.log("rrw", err);
        })
    }


    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
        console.log("tt", new Date());
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    loadEvents() {
        this.categoryService.getScheduleData().subscribe(res => {
            console.log("res", res);
            if (res['data']) {
                this.apiSource = res['data'];
                this.eventSource = this.apiSource.map(item => {
                    return {
                        title: item.title,
                        startTime: new Date(item.starttime),
                        endTime: new Date(item.endtime),
                        allDay: false
                    }
                })
                this.isLoading = false;
                console.log("ttr", this.eventSource);

            }
        }, err => {
            this.isLoading = false;
            console.log("err", err);
        })
    }

    onSelectChange(selectedValue: any) {
        this.isLoading = true;
        this.categoryService.getScheduleDataById(selectedValue.detail.value).subscribe(res => {
            if (res['data']) {
                this.eventSource = [];
                this.eventSource = res['data'].map(item => {
                    return {
                        title: item.title,
                        startTime: new Date(item.starttime),
                        endTime: new Date(item.endtime),
                        allDay: false
                    }
                })
            } else {
                this.eventSource = [];
            }
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            console.log("er", err);
        })
        console.log('Selected', selectedValue.detail.value);
    }

    //   createRandomEvents() {
    //       var events = [];
    //       for (var i = 0; i < 50; i += 1) {
    //           var date = new Date();
    //           var eventType = Math.floor(Math.random() * 2);
    //           var startDay = Math.floor(Math.random() * 90) - 45;
    //           var endDay = Math.floor(Math.random() * 2) + startDay;
    //           var startTime;
    //           var endTime;
    //           if (eventType === 0) {
    //               startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    //               if (endDay === startDay) {
    //                   endDay += 1;
    //               }
    //               endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
    //               events.push({
    //                   title: 'All Day - ' + i,
    //                   startTime: startTime,
    //                   endTime: endTime,
    //                   allDay: true
    //               });
    //           } else {
    //               var startMinute = Math.floor(Math.random() * 24 * 60);
    //               var endMinute = Math.floor(Math.random() * 180) + startMinute;
    //               startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
    //               endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
    //               events.push({
    //                   title: 'Event - ' + i,
    //                   startTime: startTime,
    //                   endTime: endTime,
    //                   allDay: false
    //               });
    //           }
    //       }
    //       return events;
    //   }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
