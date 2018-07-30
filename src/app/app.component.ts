import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public obj;
  constructor(private _ApiService: ApiService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    console.log("dsf")
    // this._ApiService.getFoods().subscribe(
    //   data => { this.obj = data; },
    //   err => console.error(err),
    //   () => { console.log('done loading obj:', this.obj); }
    // );
  }}
