import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  userId: string = "";
  baseUrl = 'https://cands.ca/wp-json/custom-plugin/';
  constructor(private http: HttpClient) {
    this.userId = JSON.parse(localStorage.getItem('userData'))['ID'];
  }

  //get project category details
  // getProjectData(userId) {
  //   return this.http.post(this.baseUrl + 'projects', userId).pipe(
  //     map(results => results)
  //   );
  // }

  // get project search Data
  getSearchProjectData(searchText = "") {
    let formData = new FormData();
    formData.append('searchText', searchText);
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'projects', formData);
  }

  //get client category details
  // getClientData() {
  //   return this.http.get(this.baseUrl + 'clients')
  // }

  // get client search Data
  getSearchClientData(searchText = "") {
    let formData = new FormData();
    formData.append('searchText', searchText);
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'clients', formData);
  }

  //get invoice category details
  // getInvoiceData() {
  //   return this.http.get(this.baseUrl + 'invoice')
  // }

  // get invoice search Data
  getSearchInvoiceData(searchText = "") {
    let formData = new FormData();
    formData.append('searchText', searchText);
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'invoice', formData);
  }

  //get estimate category details
  // getEstimateData() {
  //   return this.http.get(this.baseUrl + 'estimate').pipe(
  //     map(results => results)
  //   );
  // }

  // get estimate search Data
  getSearchEstimateData(searchText = "") {
    let formData = new FormData();
    formData.append('searchText', searchText);
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'estimate', formData);
  }

    // get work flow search Data
    getSearchWorkorderData(searchText = "") {
      let formData = new FormData();
      formData.append('searchText', searchText);
      formData.append('user_id', this.userId)
      return this.http.post(this.baseUrl + 'workorder', formData);
    }

  // get schedule data
  getScheduleData() {
    let formData = new FormData();
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'schedule', formData);
  }

    // get schedule data
    getScheduleDataById(id) {
      let formData = new FormData();
      formData.append('id', id)
      return this.http.post(this.baseUrl + 'schedule', formData);
    }


  // get dropdown data
  getScheduleDropdownData() {
    let formData = new FormData();
    formData.append('user_id', this.userId)
    return this.http.post(this.baseUrl + 'getuserschedule', formData);
  }
}
