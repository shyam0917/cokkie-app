import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'https://cands.ca/wp-json/custom-plugin/';
  constructor(private http: HttpClient) { }

  //get project category details
  getProjectData(userId) {
    return this.http.post(this.baseUrl + 'projects', userId).pipe(
      map(results => results)
    );
  }

    // get project search Data
    getSearchProjectData(searchText){
      let searchQuery ={searchText:searchText}
      return this.http.post(this.baseUrl + 'projects',searchQuery);
    }

  //get client category details
  getClientData() {
    return this.http.get(this.baseUrl + 'clients')
  }

  // get client search Data
  getSearchClientData(searchText){
    let searchQuery ={searchText:searchText}
    return this.http.post(this.baseUrl + 'clients',searchQuery);
  }

  //get invoice category details
  getInvoiceData() {
    return this.http.get(this.baseUrl + 'invoice')
  }

    // get invoice search Data
    getSearchInvoiceData(searchText){
      let searchQuery ={searchText:searchText}
      return this.http.post(this.baseUrl + 'invoice',searchQuery);
    }

  //get estimate category details
  getEstimateData() {
    return this.http.get(this.baseUrl + 'estimate').pipe(
      map(results => results)
    );
  }

    // get estimate search Data
    getSearchEstimateData(searchText){
      let searchQuery ={searchText:searchText}
      return this.http.post(this.baseUrl + 'clients',searchQuery);
    }
}
