import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService{

    constructor(private http: HttpClient) { }

    baseUrl = "http://localhost:3000";

    convertDocx(docx){
        return this.http.post(this.baseUrl + "/convertDocx-Pdf", docx)
    }

    downloadPdf(){
        return this.http.get(this.baseUrl+ '/downloadPdf')
    }
}