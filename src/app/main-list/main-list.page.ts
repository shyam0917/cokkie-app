import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.page.html',
  styleUrls: ['./main-list.page.scss'],
})
export class MainListPage implements OnInit {
  switch: string;
  editUrl: SafeResourceUrl;
  isLoading: boolean = false;
  emptyData: boolean = false;
  categoryArr: any = [];
  testObject: any = {};
  itemIndex: number = -1;
  showMore: boolean = false;
  errMessage: string = "";
  searchQuery: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    public sanitizer: DomSanitizer) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.switch = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategoryData();
    this.errMessage = "";
  }

  // toggleCart(index) {
  //   this.itemIndex = index;
  //   this.showMore = !this.showMore;
  //   console.log("trt", this.itemIndex, index, this.showMore);
  // }

  openIFrame(id) {
    this.editUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://cands.ca/candsproject/edit.php?id=" + id);
    this.router.navigateByUrl('/iframe-form/3', { state: { url: this.editUrl } });
  }

  moveUp(index) {
    this.itemIndex = index;
    this.showMore = false;
  }

  moveDown(index) {
    if (this.itemIndex != index && this.showMore == true) {
      this.showMore == true;
    } else {
      this.showMore = !this.showMore;
    }
    this.itemIndex = index;
  }

  getCategoryData() {

    // get Client Data
    if (this.switch && this.switch == '1') {
      this.isLoading = true;
      this.categoryService.getSearchClientData().subscribe(res => {
        if (!this.isEmpty(res)) {
          this.testObject = res;
          this.emptyData = false;
        } else {
          this.emptyData = true;
          this.testObject = res;
        }
        this.isLoading = false;
      }, err => {
        console.log("err", err);
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

      })
    }

    // get Workflow Data
    if (this.switch && this.switch == '8') {
      this.isLoading = true;
      this.categoryService.getSearchWorkorderData().subscribe(res => {
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

      })
    }


  }

  searchData(sw) {
    if (sw == '1') {
      this.isLoading = true;
      this.categoryService.getSearchClientData(this.searchQuery).subscribe(res => {
        if (!this.isEmpty(res)) {
          this.testObject = res;
          this.emptyData = false;
        } else {
          this.emptyData = true;
          this.testObject = res
        }
        this.isLoading = false;
      }, err => {
        console.log("rrt", err);
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
    else if (sw == '8') {
      this.isLoading = true;
      this.categoryService.getSearchWorkorderData(this.searchQuery).subscribe(res => {
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

  deleteWorkOrder(item) {
    this.isLoading = true;
    this.categoryService.deleteWorkOrderData(item.id).subscribe(res => {
      if (res['data']) {
        this.categoryArr = res['data'];
        this.isLoading = false;
        this.itemIndex = -1;
        this.showMore = false;
      }
    }, err => {
      this.isLoading = false;
      this.errMessage = "Internal Error Occured"
    })

  }

}
