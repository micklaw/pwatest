import { Component, OnInit } from '@angular/core';
import { Item, ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firstpwa';
  items: Array<Item>;
  rotate: boolean = false;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    var orientation = (screen.orientation || {}).type || ((<any>screen).mozOrientation || <any>screen).msOrientation;

    if (window.matchMedia('(display-mode: standalone)').matches && orientation == undefined) {
      this.rotate = true;
    }
    this.fetchData();
  }
  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Array<Item>) => {
         console.log(data);
         this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }
}