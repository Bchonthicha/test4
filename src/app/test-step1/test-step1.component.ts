import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-test-step1',
  templateUrl: './test-step1.component.html',
  styleUrls: ['./test-step1.component.css']
})
export class TestStep1Component implements OnInit {
  TestList: AngularFireList<any>;
  dataObj2: any;
  numoftestid: any;

  cat: any;
  selectcat: any;
  numOfitem: any;
  array_numOfitem = [];
  SelectThisCategory = [];
  SelectTopic: any;
  InputDescription: any;
  SelectNumofItem: any;
  ADDtopic_id: any;
  ADDarrayquestion_id = [];
  ADDarrayKey_cate: any;
  // for (const x in data) {
  //   if (data.hasOwnProperty(x)) {
  //     this.allDatabaseAssignment.push(data[x].dbname);   //ดึง dbname ออกมาใส่ใน array
  // }
  // }
  CategoryList: AngularFireList<any>;
  dataObj: Observable<any>;
  arrayKey_cate = [];
  arrayVal_cate = [];
  arrayTopic_name = [];
  arrayNum_question = [];
  arrayquestion_id = [];
  choice_type: any;
  display_choice_type: any;
  display_arr_choice_type = [];

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {

    this.CategoryList = this.db.list('/Category');
    this.dataObj = this.CategoryList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    let ref = this.db.database.ref('/Category').on("child_added", (snapshotChanges) => {
      console.log(snapshotChanges.key + ":" + snapshotChanges.val());
      this.arrayKey_cate.push(snapshotChanges.key);
      this.arrayVal_cate.push(snapshotChanges.val());
      // console.log(this.arrayKey_cate);
      // console.log(this.arrayVal_cate);
    });

    this.dataObj.forEach(data => {
      console.log(data);
      console.log("--------");
    });

    //
    this.TestList = this.db.list('/Test');  //Display Student  //เรียงตาม Student ID
    this.dataObj2 = this.TestList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // console.log(this.dataObj2);

    this.dataObj2.forEach((data, index) => {
      this.numoftestid = data.length + 1;
      console.log(this.numoftestid);

    });
    //
  }

  onChange(index) {
    this.choice_type = "";
    this.array_numOfitem = [];
    this.arrayTopic_name = [];
    this.arrayNum_question = [];
    this.display_arr_choice_type = [];
    this.arrayquestion_id = [];
    this.SelectTopic = undefined;
    this.ADDarrayKey_cate = this.arrayKey_cate[index];
    console.log(this.arrayKey_cate[index]);

    this.arrayVal_cate[index].topic_id.forEach(item => {
      let path = 'Topics/' + item;
      // let tmp = this.db.list(path);

      let ref = this.db.database.ref(path).on("child_added", (snapshotChanges) => {

        if (snapshotChanges.key == "topic_name") {
          this.arrayTopic_name.push(snapshotChanges);
          // console.log(this.arrayTopic_name);  
        }
        else if (snapshotChanges.key == "num_question") {
          this.arrayNum_question.push(snapshotChanges);
        }
        else if (snapshotChanges.key == "choice_type") {
          this.choice_type = snapshotChanges.val();
          console.log(snapshotChanges.val());

          switch (this.choice_type) {
            case 1: {
              this.display_choice_type = "คำตอบสั้น";
              break;
            }
            case 2: {
              this.display_choice_type = "2 ตัวเลือก";
              break;
            }
            case 3: {
              this.display_choice_type = "3 ตัวเลือก";
              break;
            }
            case 4: {
              this.display_choice_type = "4 ตัวเลือก";
              break;
            }
          }
          console.log(this.display_choice_type);
          this.display_arr_choice_type.push(this.display_choice_type);
        }

        else if (snapshotChanges.key == "question_id") {
          this.arrayquestion_id.push(snapshotChanges);
        }
      });
    });
  }

  numQuestion(index) {
    this.numOfitem = [];
    this.array_numOfitem = [];
    // console.log("pre" + this.numOfitem);
    // console.log("start" + this.arrayNum_question[index].val());
    this.ADDarrayquestion_id = this.arrayquestion_id[index].val();
    this.numOfitem = this.arrayNum_question[index].val();
    this.ADDtopic_id = this.arrayNum_question[index].ref.parent.key;
    console.log(this.ADDarrayquestion_id);

    console.log(this.ADDtopic_id);
    console.log(this.numOfitem);
    //array display number of item
    // console.log("second" + this.numOfitem);
    for (var i = 1; i <= this.numOfitem; i++) {
      // console.log(i);
      this.array_numOfitem.push(i);
    }
  }

  hack(val) {
    console.log(val);
    return Array.from(val);
  }
  StartSelectTest(data: NgForm) {
    console.log("is meeeee");
    console.log(data.value);

    console.log(this.ADDarrayquestion_id);

    let rand = -1;
    console.log(rand);
    let i = 0;
    let tmp_question_id = [];
    while (i < this.SelectNumofItem) {
      // rand = Math.floor(Math.random() * this.numOfitem);
      while (this.ADDarrayquestion_id[rand] == 0 || this.ADDarrayquestion_id[rand] == undefined) {
        // Math.floor(Math.random() *  max);
        rand = Math.floor(Math.random() * this.numOfitem);
        console.log("random: " + rand);
      }
      console.log("this " + this.ADDarrayquestion_id[rand]);
      console.log("rand " + rand);
      tmp_question_id.push(this.ADDarrayquestion_id[rand]);
      console.log(tmp_question_id);
      this.ADDarrayquestion_id[rand] = 0;
      i++;
    }
    // console.log(tmp);
    let arrayTest1pack = [];
    console.log(this.ADDtopic_id + "," + this.numOfitem + "," + this.SelectNumofItem + "," + this.InputDescription + "," + "," + tmp_question_id);
    // let pack_cate_id = {"category_id":this.ADDarrayKey_cate};
    // let pack_topic_id = {"topic_id":this.ADDtopic_id};
    // let pack_date = {"test_date":todayDate};
    // let pack_test_num = {"test_numQuestion":this.SelectNumofItem};
    // let pack_descript = {"test_description":this.InputDescription};
    // console.log(tmp_question_id);
    // let pack_quesion_id = {"question_id":tmp_question_id};
    // arrayTest1pack.push(pack_cate_id, pack_topic_id, pack_date ,pack_test_num, pack_descript, pack_quesion_id);

    // arrayTest1pack.push(this.ADDarrayKey_cate);
    // arrayTest1pack.push(this.ADDtopic_id);
    // arrayTest1pack.push(todayDate);
    // arrayTest1pack.push(this.SelectNumofItem);
    // arrayTest1pack.push(this.InputDescription);
    // arrayTest1pack.push(tmp_question_id);
    arrayTest1pack.push(this.ADDarrayKey_cate, this.ADDtopic_id, this.SelectNumofItem, this.InputDescription, tmp_question_id);
    console.log(arrayTest1pack);

    this.firebaseService.arrayTest1 = arrayTest1pack;

    this.firebaseService.Test_id_new = "test" + this.numoftestid;
  }
  clearTest1() {
    alert("clear");
    this.SelectThisCategory = [];
    this.SelectTopic = undefined;
    this.SelectNumofItem = undefined;
    this.InputDescription = "";
  }
  getCategoryList() {

  }
  ngOnInit() {

  }

}
