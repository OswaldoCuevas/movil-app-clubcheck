import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Sync } from './interface/sync.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url:string="http://192.168.1.69:3000/api/"
  constructor(private httpClient:HttpClient) { }
  Sync(code:any) {
    const url = this.url+"users/sync";
    return this.httpClient.post<Sync>(url,{code})
  }
  AddToken(token:any) {
    const code = localStorage.getItem("code")+"";
    const url = this.url+"users/token";
    return this.httpClient.post<{status:any}>(url,{code,token})
  }
}
