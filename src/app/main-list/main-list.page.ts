import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.page.html',
  styleUrls: ['./main-list.page.scss'],
})
export class MainListPage implements OnInit {
  switch: string;
  categoryArr: any = [];
  testObject: any = {};
  errMessage: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.switch = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategoryData();
    this.errMessage = "";
  }

  getCategoryData() {

    // get Client Data
    if (this.switch && this.switch == '1') {
      this.categoryService.getClientData().subscribe(res => {
        if (res) {
          this.testObject = res;
        }


      }, err => {
        console.log("err", err);
      })
    }

    // get project Data
    if (this.switch && this.switch == '3') {
      let clientID = JSON.parse(localStorage.getItem('userData'))['ID'];
      console.log(clientID);
      const userId = new FormData();
      userId.append('id', clientID);
      this.categoryService.getProjectData(userId).subscribe(res => {
        if (res['data']) {
          this.categoryArr = res['data'];
          console.log(this.categoryArr, res, "apiiiiiiiiii");
        }

      }, err => {
        if (err['status'] == '404') {
          this.errMessage = "Internal Error Occured";
        }
        console.log("err", err);
      })
    }

    // get invoice Data
    if (this.switch && this.switch == '4') {
      this.categoryService.getInvoiceData().subscribe(res => {
        if (res && res['data']) {
          this.categoryArr = res['data'];
        }

      }, err => {
        console.log("err", err);
      })
    }

    // get estimate Data
    if (this.switch && this.switch == '5') {
      this.categoryService.getEstimateData().subscribe(res => {
        if (res['data']) {
          this.categoryArr = res['data'];
          console.log(this.categoryArr, res);
        }

      }, err => {
        console.log("err", err);
      })
    }

  }


}
