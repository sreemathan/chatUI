import { Injectable } from '@angular/core';
import { Data } from './data';
import { Observable,throwError  } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


@Injectable()
export class DataServiceService {
 public postsData: Data[];
  postUrl: string = "http://130.61.95.1:5001/chat/query";
  constructor(private http: HttpClient) { }

getMessage(datas): Observable<Data[]> {
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
     httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
	let options = {
     headers: httpHeaders
	};  
  return this.http.get<Data[]>(this.postUrl,datas,options);
  }





  

}