import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subnet } from '../sections/subnet/subnet';

@Injectable({ providedIn: 'root',})
export class NetworkInfoService {
  constructor(private http: HttpClient) {

   }

   /*
   public getSubnets(): Observable<any> {
       return this.http.get("../assets/test_data/subnets.json");
   }
   */

   public getSubnets(): Observable<any> {
       return this.http.get("../assets/test_data/subnets.json");
   }

}
