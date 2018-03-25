import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-test-step3',
  templateUrl: './test-step3.component.html',
  styleUrls: ['./test-step3.component.css']
})
export class TestStep3Component implements OnInit {

  todayDate: any;
  receiveTest1: any;
  receiveTest2: any;
  receiveTest3: any;

  GroupList: AngularFireList<any>;
  SelectThisGroup = [];
  arrayVal_Group = [];
  dataObj: Observable<any>;

  arrayKey_Group = [];
  student_id_list_of_Group: any;

  arrayStudent_id = [];
  arrayStudent_name = [];
  std_list_display = [];

  groupForm: any;

  selectedAll: any;

  ObjStudent_detail:any;

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    //test show sort time
    let Hero = [
      { name: "Robin Van Persie", age: 28, time: '7/1/2561 16:49:58' },
      { name: "Theo Walcott", age: 22, time: '5/2/2561 16:49:58' },
      { name: "Bacary Sagna", age: 26, time: '27/2/2560 16:45:58' }
    ].sort(function (obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.age - obj2.age;
    });
    console.log(Hero);
    //

    // console.log(this.firebaseService.arrayTest1);
    // console.log(this.firebaseService.arrayTest2);
    this.GroupList = this.db.list('/Groups');
    this.dataObj = this.GroupList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    let ref = this.db.database.ref('/Groups').on("child_added", (snapshotChanges) => {
      //console.log(snapshotChanges.key + ":" + snapshotChanges.val());
      this.arrayKey_Group.push(snapshotChanges.key);
      this.arrayVal_Group.push(snapshotChanges.val());
    });
    /*
        this.dataObj.forEach(data => {
          console.log(data);
          console.log("--------");
        });
    */
  }

  onChange(index) {
    // alert(index);
    this.selectedAll = false;
    this.std_list_display = [];

    let key_this_group = this.arrayKey_Group[index];
    // console.log(this.arrayKey_Group[index]);
    console.log(key_this_group);

    let path = 'Groups/' + this.arrayKey_Group[index];
    let ref2 = this.db.list(path).valueChanges();
    let Qobj = {};

    ref2.subscribe(data => {
      this.student_id_list_of_Group = data[1];
      console.log(this.student_id_list_of_Group);

      this.student_id_list_of_Group.forEach((item, index) => {
        let path = 'Students/' + this.student_id_list_of_Group[index];
        let ref2 = this.db.list(path).valueChanges();
        ref2.subscribe(data => {
          // console.log("size" + this.receiveQid.length);
          console.log(data);
          //
          // console.log(this.tmp[index]);
          let tem = {
            Group_id: key_this_group,
            keyStudent: this.student_id_list_of_Group[index],
            student_id: data[1],
            student_name: data[2],
            url:data[3],
            selected: false
          }
          console.log(data[3]);
          this.std_list_display.push(tem);
          console.log(this.std_list_display);
        })
      });
    });
  }

  selectAll() {
    for (var i = 0; i < this.std_list_display.length; i++) {
      this.std_list_display[i].selected = this.selectedAll;
    }
    console.log(this.std_list_display);
  }
  checkIfAllSelected() {
    this.selectedAll = this.std_list_display.every(function (item: any) {
      return item.selected == true;
    })
    console.log(this.std_list_display);
  }

  StartSelectStudent() {
    alert("std");

    let arrayTest3pack = [];

    // console.log(this.std_list_display);
    this.std_list_display.forEach((item, index) => {
      //console.log(item);
      //console.log(item.selected);
      if (item.selected == true) {
        console.log(item);
        //arrayTest3pack.push(item.student_id);
        // console.log(arrayTest3pack);
        this.ObjStudent_detail= {
        "student_id" : item.student_id,
        "student_name" : item.student_name,
        "score" : 0,
        "url" : item.url,
        "student_answer":[""]
        }
        console.log(this.ObjStudent_detail);
        
        arrayTest3pack.push(this.ObjStudent_detail);
        this.firebaseService.arrayTest3 = arrayTest3pack;
        console.log(arrayTest3pack);
      }
    });
    this.receiveTest1 = this.firebaseService.arrayTest1;
    this.receiveTest2 = this.firebaseService.arrayTest2;
    this.receiveTest3 = this.firebaseService.arrayTest3;
    console.log(this.receiveTest1);
    console.log(this.receiveTest2);
    console.log(this.receiveTest3);

    //this.todayDate = new Date().toUTCString();
    this.todayDate = new Date().toLocaleString();
    console.log(this.todayDate);
    //Add item with Custom IDs In Firebase
    const key = this.firebaseService.Test_id_new;
    const data2 = {
      category_id: this.receiveTest1[0],
      topic_id: this.receiveTest1[1],
      test_date: this.todayDate,
      test_numQuestion: this.receiveTest1[2],     //ต้องแก้เป็น test_numQuestion
      test_description: this.receiveTest1[3],
      question: this.receiveTest2,
      students: this.receiveTest3,
      test_status: true
    }
    console.log(key + "++++" + data2);

    //create TestScore to database
    console.log(this.std_list_display);

    //Add item with Custom IDs In Firebase to Test table
    this.db.list("/Test").set(key, data2);
  }
  ngOnInit() {
  }
}