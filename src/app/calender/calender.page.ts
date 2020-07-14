import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { MyModalPage } from '../my-modal/my-modal.page';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.page.html',
    styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
    eventSource: any = [];
    viewTitle;
    openModal:boolean = false;
    dataReturned: any;
    isLoading: boolean = false;
    dropdownArray: any = [];
    apiSource: any = [];
    addForm = {
        staff: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    };
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

    constructor(private categoryService: CategoryService,
        public modalController: ModalController) {
        this.getDropdownData();
    }

    ngOnInit() {
        this.isLoading = true;
        this.loadEvents();
    }


    addCallForm(fm) {
        this.openModal = false;
        let formDetails = fm.form.value;
        let idArr: any = [formDetails.staff];

        let st = formDetails.startTime.split("T")[1];
        let eT = formDetails.endTime.split("T")[1];

        let formData = new FormData();
        formData.append('sdateCall', formDetails.startDate.split("T")[0]);
        formData.append('sdatetime', st.slice(0,8));
        formData.append('edateCall', formDetails.endDate.split("T")[0]);
        formData.append('edatetime', eT.slice(0,8));
        formData.append('staff_mem', idArr);
        this.categoryService.addScheduleEvent(formData).subscribe(res => {
        this.openModal = false;
        this.loadEvents();
        }, err => {
            this.openModal = false;
        })
    }



    getDropdownData() {
        this.categoryService.getScheduleDropdownData().subscribe(res => {
            if (res['data']) {
                this.dropdownArray = res['data'];
            }
        }, err => {
        })
    }


    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    loadEvents() {
        this.categoryService.getScheduleData().subscribe(res => {
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

            }
        }, err => {
            this.isLoading = false;
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
        })
    }


    onRangeChanged(ev) {
        // console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
