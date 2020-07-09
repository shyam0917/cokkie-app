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
  isLoading: boolean = false;
  emptyData: boolean = false;
  categoryArr: any = [];
  testObject: any = {};
  errMessage: string = "";
  searchQuery: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.switch = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategoryData();
    this.errMessage = "";
  }

  getCategoryData() {

    // get Client Data
    if (this.switch && this.switch == '1') {
      this.isLoading = true;
      this.categoryService.getSearchClientData().subscribe(res => {
        if (res) {
          this.testObject = res;
          this.isLoading=false;
        }

      }, err => {
        this.isLoading = false
        this.errMessage = "Internal Error Occured";
      })
    }

    // get project Data
    if (this.switch && this.switch == '3') {
      this.isLoading = true;
      this.categoryService.getSearchProjectData().subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        }
        else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;

      }, err => {
        this.isLoading = false;
        if (err['status'] == '404') {
          this.errMessage = "Internal Error Occured";
        }
      })
    }

    // get invoice Data
    if (this.switch && this.switch == '4') {
      this.isLoading = true;
      this.categoryService.getSearchInvoiceData().subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        }
        else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.errMessage = "Internal Error Occurred"
        console.log("err", err);
      })
    }

    // get estimate Data
    if (this.switch && this.switch == '5') {
      this.isLoading = true;
      this.categoryService.getSearchEstimateData().subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        }
        else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;

      }, err => {
        this.isLoading = false;
        this.errMessage = "Internal Error Occurred"
        console.log("err", err);
      })
    }

  }

  searchData(sw) {
    if (sw == '1') {
      this.isLoading = true;
      this.categoryService.getSearchClientData(this.searchQuery).subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.testObject = res;
        }

      }, err => {
        this.isLoading = false;
        this.errMessage = "Internal Error Occured";
      })
    }
    else if (sw == '3') {
      this.isLoading = true;
      this.categoryService.getSearchProjectData(this.searchQuery).subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        } else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        if (err['status'] == '404') {
          this.errMessage = "Internal Error Occured";
        }
      })
    }
    else if (sw == '4') {
      this.isLoading = true;
      this.categoryService.getSearchInvoiceData(this.searchQuery).subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        } else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;

      }, err => {
        this.isLoading = false;
        this.errMessage = "Internal Error Occured"
      })
    }
    else if (sw == '5') {
      this.isLoading = true;
      this.categoryService.getSearchEstimateData(this.searchQuery).subscribe(res => {
        if (res['data'] && res['data'].length > 0) {
          this.categoryArr = res['data'];
          this.emptyData = false;
        } else {
          this.categoryArr = res['data'];
          this.emptyData = true;
        }
        this.isLoading = false;

      }, err => {
        this.isLoading = false;
        this.errMessage = "Internal Error Occured"
      })
    }

  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

}
