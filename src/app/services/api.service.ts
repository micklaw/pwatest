import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OnlineService } from './online.service';
export interface Item {
  name: string;
  description: string;
  url: string;
  html: string;
  markdown: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private baseURL: string = "https://www.techiediaries.com/api/data.json";
 constructor(private httpClient: HttpClient, private onlineService: OnlineService) { }

 fetch(): Observable<Item[]> {
   const cacheKey = "items";
   let result = new Observable<Item[]>();
   
   if (this.onlineService.isOnline) {
    result = <Observable<Item[]>>this.httpClient.get(this.baseURL);
    result.subscribe(i => {
      localStorage.setItem(cacheKey, JSON.stringify(i));
    })
   } else {
    const itemsString = localStorage.getItem(cacheKey);
    if (itemsString) {
      const items  = <Item[]>JSON.parse(itemsString);
      result = from(new Array<Item[]>(items));
    }
   }
   
   return result;
 }
}