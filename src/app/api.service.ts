import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // Uses http.get() to load data from a single API endpoint
  getFoods() {
    return this.http.get('https://api.dropboxapi.com/2/auth/token/from_oauth1');
  }
  sendFile(file) {
    const headers = new HttpHeaders();
    const token = '9lv2XtzrhpAAAAAAAAAAcaZIJs7FAvwoFSW8phiAd8t6e_uRhCw5q1XmWgzpOTn9';
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Dropbox-API-Arg',
      '{\"path\": \"/Homework/math/Matrices.txt\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}');
    headers.append('Content-Type', 'application/octet-stream');

    return this.http.post('https://content.dropboxapi.com/2/files/upload', file, {
      headers: headers
    });
  }
}
