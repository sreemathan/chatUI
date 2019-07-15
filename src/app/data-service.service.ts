import { Injectable } from '@angular/core';
import { Data } from './data';
import { Observable,throwError  } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable()
export class DataServiceService {
 public postsData: Data[];
  postUrl: string = "./assets/json/file.json";
  constructor(private http: HttpClient) { }

getMessage(): Observable<Data[]> {
  return this.http.get<Data[]>(this.postUrl);
  }





  

}