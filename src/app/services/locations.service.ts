import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../environments/environment';
import { CountryInterface } from '../interfaces/locations.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor() { }
  getCountries(): CountryInterface[] { 
    let p1: CountryInterface= {id: 1 , name: 'Colombia'};
    return [p1];
  }
  /* getCountries(): Observable<any> {
    return this.http.get(`${environment.BACK_ENDPOINT}/country`);
  }

  getRegions(countryId: number): Observable<any> {
    return this.http.get(`${environment.BACK_ENDPOINT}/region/country/${countryId}`);
  }

  getCities(regionId: number): Observable<{ data: CityInterface[] }> {
    return this.http.get<{ data: CityInterface[] }>(`${environment.BACK_ENDPOINT}/city/region/${regionId}`);
  } */
}
