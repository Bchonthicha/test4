import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-test-step2',
  templateUrl: './test-step2.component.html',
  styleUrls: ['./test-step2.component.css']
})
export class TestStep2Component implements OnInit {
  receiveTest1: any;
  receiveQid: any;

  dataObj: Observable<any>;
  QuestionList: AngularFireList<any>;
  Q_answer_index = [];
  Q_choice = [];
  Q_topic_id = [];
  Q_question = [];
  tmp = [];
  tmpQid = [];


  pack_question = [];
  question_list_display = [];

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    // console.log(this.firebaseService.arrayTest1);
    this.receiveTest1 = this.firebaseService.arrayTest1;
    console.log(this.receiveTest1);    //["category1", "T1", 1518504778921, "4", "ok",["Q4", "Q2", "Q5", "Q1"]]
    // receiveTest1.forEach(element => {
    //   console.log(element);
    // });
    console.log(this.receiveTest1[4]); // ["Q4", "Q2", "Q5", "Q1"]
    this.receiveQid = this.receiveTest1[4];
    // this.receiveQid.forEach(element2 => {
    //   console.log(element2);
    // });


    //Database
    let sub_index = 0;
    console.log(this.receiveQid);
    this.receiveQid.forEach((item,index) => {
    console.log(item);
    
      let path = 'Questions/'+item;
      let ref2 = this.db.list(path).valueChanges();
      this.tmpQid.push(item);

      ref2.subscribe(data => {
        // console.log("size" + this.receiveQid.length);
        console.log(data);
        //
        this.tmp.push(data);
  
          // console.log(this.tmp[index]);
          let tem = {
            keyQ:this.receiveQid[index],
            answer_index:data[0],
            choice:data[1],
            question:data[2],
            topic_id:data[3],
            i:index
          }
          // console.log(data[1]);
          this.question_list_display.push(tem);
          console.log(this.question_list_display);
      });
    });
    console.log(this.tmpQid);
  }

  ngOnInit() {

  }

  moveUp(value, index) {
    console.log(index);
    console.log(value);
    if (index > 0) {
      console.log("moveUp");
      const tmp = this.question_list_display[index - 1];
      this.question_list_display[index - 1] = this.question_list_display[index];
      this.question_list_display[index] = tmp;
      //update new value index in object
      this.question_list_display[index].i= index;
      this.question_list_display[index-1].i=index-1;
      console.log(this.question_list_display);
    }
  }
  moveDown(value, index) {
    console.log(index);
    console.log(this.question_list_display.length);

    if (index < this.question_list_display.length - 1) {
      console.log("moveDown");
      const tmp = this.question_list_display[index + 1];
      this.question_list_display[index + 1] = this.question_list_display[index];
      this.question_list_display[index] = tmp;
      //update new value index in object
      this.question_list_display[index].i= index;
      this.question_list_display[index+1].i=index+1;
      console.log(this.question_list_display);
    }
  }
  StartSelectQuestion(){
    let arrayTest2pack = [];
    alert("youuuuu");
    this.question_list_display.forEach(element => {
      console.log(element.keyQ);
      arrayTest2pack.push(element.keyQ);
    });
    console.log(arrayTest2pack);
    this.firebaseService.arrayTest2 = arrayTest2pack;
  }
}