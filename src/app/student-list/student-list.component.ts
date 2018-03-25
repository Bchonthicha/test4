import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
//upload file

import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from './fileupload';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: AngularFireList<any>;
  dataThis: any;
  //in update
  stu_id: string;
  stu_name: string;
  //in start Add std
  stu_idStart: string;
  stu_nameStart: string;
  // dataDel: any;
  // arrayStudentListKey: any;
  dataObj: Observable<any>;


  //upload file
  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: { percentage: number } = { percentage: 0 }

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService, private uploadService: UploadFileService) {

    this.studentList = this.db.list('/Students', ref => ref.orderByChild("Student_ID"));  //Display Student  //เรียงตาม Student ID
    this.dataObj = this.studentList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.dataObj.forEach(data => {
      console.log(data);
    });

    // this.dataObj = this.firebaseService.getXXX().snapshotChanges();
    // this.dataObj.subscribe();
    // console.log(this.dataObj); 
  }

  hack(val) {
    console.log(val);
    return Array.from(val);
  }

  getStudent() {

  }

  ngOnInit() { }


  //----Start create modal
  StartAddStd() {
    this.stu_idStart = "";
    this.stu_nameStart = "";
  }
  // ----create
  // addNewStudent(data: NgForm) {
  //   this.db.list("/Students").push(data.value);
  //   // console.log(data.value); 
  // }


  //upload file
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  addNewStudent() {
    //Add item with Custom IDs In Firebase
    const key = "stu" + this.stu_idStart;
    const data = {
      student_id: this.stu_idStart,
      student_name: this.stu_nameStart
    }
    //this.db.list("/Students").push(data);
    this.db.list("/Students").set(key, data);
    // console.log(data.value); 

    //upload file
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, key)
  }

  //----Update
  //Set data Edit to modal
  setdataEdit(data) {
    this.dataThis = data;
    console.log(data);
    this.stu_id = data.student_id;
    this.stu_name = data.student_name;
    // console.log(this.dataThis.Student_id);
    // console.log(this.dataThis.Student_name);
  }
  // Update this key
  EditStd(StdIDEdit, StdNameEdit) {
    //this.db.list("/Students").update(this.dataThis, data.value);
    console.log(StdIDEdit + " " + StdNameEdit);
    let data = {
      student_id: StdIDEdit,
      student_name: StdNameEdit
    };
    this.db.list('/Students/').update(this.dataThis.key, data);
    // console.log(StdIDEdit);

    //upload file
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.dataThis.key)
  }

  //----Delete
  //Set data delete to modal
  setdataDelete(data) {
    this.dataThis = data;
    console.log(this.dataThis);
  }
  //Delete this key
  delStd() {
    this.studentList.remove(this.dataThis.key);

    //Delete picture
    //  this.uploadService.deleteFileUpload(fileUpload)
  }
  //Delete All
  delStdAll() {
    this.studentList.remove();
  }

}