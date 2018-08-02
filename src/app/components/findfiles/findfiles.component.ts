import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataService } from './data.service';


declare var gapi: any;
declare var google: any;


@Component({
  selector: 'app-findfiles',
  templateUrl: './findfiles.component.html',
  styleUrls: ['./findfiles.component.css']
})

export class FindfilesComponent implements OnInit {

  checker = true;
  triggered = false;
  trigger = false;
  // Array that stores the files that are to be uploaded
  newFiles: any[] = [];
  selectedDoc;
  selectedFile: File;
  developerKey = 'AIzaSyBx9JECeOWHJo-LcA5XIzcnQi9-OL3ReY8';

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  clientId = '152132212955-3ojqbchc1q7q5ssq6p34rgnd57bun9bb.apps.googleusercontent.com';

  // Scope to use to access user's photos.
  scope = 'https://www.googleapis.com/auth/drive.file';

  pickerApiLoaded = false;
  oauthToken;
  constructor(private _ApiService: ApiService, private dataService: DataService) {
    console.log(this);

    // This prevented Dropbox from working ): please who over wrote this...explain to me why )):

    gapi.load('auth2', this.onAuthApiLoad);
    gapi.load('picker', () => {
      this.pickerApiLoaded = true;
      this.createPicker();
    });
  }

  onAuthApiLoad() {
    const authBtn = document.getElementById('auth');
    authBtn.addEventListener('click', () => {
      console.log('click');
      gapi.auth2.authorize({
        client_id: this.clientId,
        scope: this.scope
      }, this.handleAuthResult);
    });
  }

  click() {
    this.checker = false;
    gapi.auth2.authorize({
      client_id: this.clientId,
      scope: this.scope
    }, (authResult) => {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        this.createPicker();
      }
    });
  }

  onPickerApiLoad() {
    console.log(this);
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  handleAuthResult(authResult) {
    console.log(authResult);
    if (authResult && !authResult.error) {
      this.oauthToken = authResult.access_token;
      this.createPicker();
    }
  }

  // Create and render a Picker object for picking user Photos.
  createPicker() {
    let newFiles = this.newFiles;
    if (this.pickerApiLoaded && this.oauthToken) {
      console.log('arrayOfFiles', this.newFiles);
      const picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCS).
        setOAuthToken(this.oauthToken).
        setDeveloperKey(this.developerKey).
        setCallback(this.pickerCallback).
        build();
      picker.setVisible(true);
    }
  }

  // A simple callback implementation.
  pickerCallback(data) {
    console.log(data);
    console.log(this.newFiles);
    let url = 'nothing';
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const doc = data[google.picker.Response.DOCUMENTS][0];
      // This is the name of the doc, all we need to do now i push it too the newFiles array which for some reason is undefined....
      console.log(doc.name)
      url = doc[google.picker.Document.URL];

    }
  }

  convert() {
    this.trigger = true;
    console.log('Converting...');
    this.dataService.convertDocx({ path: './Script For Demo Day.docx' })
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
    console.log('Completed Conversion :)');
  }


  // Uploads selected files to dropbox
  uploadFile() {

    console.log(this.newFiles);
    this.triggered = true;

    for (let i in this.newFiles) {
      let xhr = new XMLHttpRequest();
      let file = this.newFiles[i]
      console.log("sent ->", file);
      xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
      xhr.setRequestHeader('Authorization', 'Bearer ' + '9lv2XtzrhpAAAAAAAAAAfs0f-58qeNC4NYvNZGDwRpkDxJjvfAOrEPlwJgT9O9CE');
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        path: '/' + file.name,
        mode: 'add',
        autorename: true,
        mute: false
      }));

      xhr.send(file);
    }
    this.newFiles = [];
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    console.log(uploadData);
  }
  upload() {
    this._ApiService.sendFile(this.selectedFile);
  }
  // Adds files to array, the array will be used to display the files that are going to be uploaded
  addFile() {
    this.checker = false;
    const fileInput = (<HTMLInputElement>document.getElementById('file-upload'));
    const file = fileInput.files[0];
    console.log(file);
    this.newFiles.push(file);
  }

  addFileFromDrive(filename) {
    console.log(filename);
    let fileObj = {
      name: filename
    };
    this.newFiles.push(fileObj);
  }

  ngOnInit() {
  }
}
