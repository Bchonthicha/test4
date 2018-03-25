import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-student-check',
  templateUrl: './student-check.component.html',
  styleUrls: ['./student-check.component.css']
})

export class StudentCheckComponent implements OnInit {
  studentCheck: AngularFireList<any>;
  // arrayStudentListKey: any;
  dataObj: Observable<any>;
  isDateDatail:Boolean = false;
  DateDatail:any;
  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    this.studentCheck = this.db.list('/Student-check');
    this.dataObj = this.studentCheck.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  hack(val) {
    console.log(val);
    return Array.from(val);
  }

  getStudentCheck() {

  }
  ngOnInit() {
  }
  
  delStdCheck(data) {
    console.log(data);
    this.studentCheck.remove(data.key);
  }
  toDate(time){
   
   let d = new Date(time);
  //  console.log(  d.getDate() + '/' + d.getMonth()+ '/' +d.getFullYear());
  return d.getDate() + '/' + d.getMonth()+ '/' +d.getFullYear();
  }

  toDateDatail(data){
    this.isDateDatail = true;
    this.DateDatail = data;
    console.log(data);
    
  }
  toback(){
    this.isDateDatail = false;
  }
}
