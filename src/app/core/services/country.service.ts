import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = environment.apiUrl + 'poland';

  constructor(private http: HttpClient) { }


  getRegionList() {
    return this.http.get<Country[]>(this.apiUrl);
  }

}
