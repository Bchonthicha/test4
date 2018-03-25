import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  // public arrayTest1:any;
  public arrayTest1 = ["category1", "T1", "3", "ทดลอง", ["Q3", "Q4", "Q5"]];
  // public arrayTest2 :any;
  public arrayTest2 = ["Q3", "Q4", "Q5"];
  // public arrayTest3 :any;
  public arrayTest3 = [
    {
      student_id: 570510640,
      student_name: "มานัส ทำดี",
      score: 0, url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=a54e5ba1-9aff-44c4-be13-749c46da6d2c",
      student_answer: [""]
    },
    {
      student_id: 570510641,
      student_name: "ชูใจ มีสุข",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=37f494ae-940b-439b-8561-ad13842eb858",
      student_answer: [""]
    },
    {
      student_id: 570510642,
      student_name: "ฐานิดา คำสุข",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=c29c1b97-5b00-4954-9ce0-a35b0a745a53",
      student_answer: [""]
    }
  ];
  // public Test_id_new:any;
  public Test_id_new = "test5";
  // public TestScore_id_new:any;
  constructor(private db: AngularFireDatabase) {

  }

  getStudent() {
    const path = '/Students';
    return this.db.list(path);
  }

  getStudentCheck() {
    const path = '/Student-check';
    return this.db.list(path);
  }

  // getXXX(){
  //   const path = '/Students';
  //   return this.db.list(path, ref => ref.orderByChild('index'));
  // }

  getCategoryList() {
    const path = '/Category';
    return this.db.list(path);
  }
}