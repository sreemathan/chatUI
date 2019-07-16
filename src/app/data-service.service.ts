import { Injectable } from '@angular/core';
import { Data } from './data';
import { Observable,throwError  } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable()
export class DataServiceService {
 public postsData: Data[];
  postUrl: string = "http://130.61.95.1:5001/chat/query";
  constructor(private http: HttpClient) { }

getMessage(datas): Observable<Data[]> {
  return this.http.get<Data[]>(this.postUrl,datas);
  }





  

}