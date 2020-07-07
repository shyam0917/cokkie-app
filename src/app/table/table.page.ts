import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  tableSwitch: string;
  tableArr: any = [];
  tableData: any = {};
  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.tableSwitch = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params) {
          this.tableData = params;
        }

        console.log(params);
      })
    this.getCategoryData();
  }

  getCategoryData() {

    // get Client Data
    if (this.tableSwitch && this.tableSwitch == '1') {
      this.categoryService.getSearchClientData().subscribe(res => {
        if (res['length']) {
          this.tableArr = res;
        }

      }, err => {
        console.log("err", err);
      })
    }

    // get project Data
    if (this.tableSwitch && this.tableSwitch == '3') {
      let clientID = JSON.parse(localStorage.getItem('userData'))['ID'];
      const userId = new FormData();
      userId.append('id', clientID);
      this.categoryService.getSearchProjectData().subscribe(res => {
        if (res['data']) {
          this.tableArr = res['data'];
        }

      }, err => {
        console.log("err", err);
      })

    }

    // get estimate Data
    if (this.tableSwitch && this.tableSwitch == '5') {
      this.categoryService.getSearchEstimateData().subscribe(res => {
        if (res['length']) {
          this.tableArr = res;
        }

      }, err => {
        console.log("err", err);
      })
    }

  }

}
