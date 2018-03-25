import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manage-std-group',
  templateUrl: './manage-std-group.component.html',
  styleUrls: ['./manage-std-group.component.css']
})
export class ManageStdGroupComponent implements OnInit {

  GroupList: any;
  dataObj: any;


  isGroupDatail: Boolean = false;
  GroupDatail: any;

  studentList: any;
  studentOfGroup = [];

  studentListAll: any;
  dataObj2: any;

  std_list_All = [];
  selectedAll: any;
  GnameAdd: any;
  std_list_displayALL: any;
  arrayStupack = [];
  numofGroupid: any;

  student_id_del: any;
  GroupList2: any;


  std_list_All2 = [];
  arrayStupack2 = [];
  dataObj3: any;
  studentListAll2: any;
  arrayStupackOld = [];
  GroupList3: any;
  selectedAll2:any;
  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {
this.std_list_All = [];
    // this.GroupList = this.db.list('/Groups');
    // this.dataObj = this.GroupList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
    this.GroupList = this.db.list('/Groups', ref => ref.orderByChild("group_name"));  //Display Student  //เรียงตาม Student ID
    this.dataObj = this.GroupList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.dataObj.subscribe(data => {
      this.numofGroupid = data.length + 1;
      console.log(data);
      console.log(this.numofGroupid);
    });

  }
  toGroupDatail(data) {
    // alert("toGroupDatail");
    console.log(data);
    this.isGroupDatail = true;
    this.GroupDatail = data;
    console.log(this.GroupDatail.student_id);
    this.GroupDatail.student_id.forEach(data_Sid => {
      console.log(data_Sid);

      this.studentList = this.db.list('/Students/' + data_Sid, ref => ref.orderByChild("Student_ID")).valueChanges();  //Display Student  //เรียงตาม Student ID
      // this.dataObj2 = this.studentList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      //   // console.log("eiei: "+ this.dataObj);
      //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      // });
      this.studentOfGroup = [];
      console.log(this.studentList.key);

      this.studentList.forEach(data_S => {
        console.log(data_S);
        console.log(data_S[1]);
        console.log(data_S[2]);

        let stu_obj = {
          student_id: data_S[1],
          student_name: data_S[2]
        }
        this.studentOfGroup.push(stu_obj);
        console.log(this.studentOfGroup);
      });
    });
  }
  toback() {
    this.isGroupDatail = false;
  }
  delete_group() {
    console.log(this.GroupDatail.key);
    this.GroupList.remove(this.GroupDatail.key);
    this.isGroupDatail = false;
  }
  StartAddGroup() {
    this.std_list_All = [];
    this.GnameAdd = "";
    // show all student
    this.studentListAll = this.db.list('/Students', ref => ref.orderByChild("Student_ID"));  //Display Student  //เรียงตาม Student ID
    this.dataObj2 = this.studentListAll.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.dataObj2.forEach((item, index) => {
      // console.log(item);
      // console.log(item[0].key);
      item.forEach((item2, index) => {
        //console.log(item2.key);
        ///
        let tem = {
          keyStudent: item2.key,
          student_id: "stu" + item2.student_id,
          student_name: item2.student_name,
          selected: false
        }
        ///console.log(data[1]);
        this.std_list_All.push(tem);
        console.log(this.std_list_All);
      });
    });
  }

  selectAll() {
    for (var i = 0; i < this.std_list_All.length; i++) {
      this.std_list_All[i].selected = this.selectedAll;
    }
    //console.log(this.std_list_All);
  }
  checkIfAllSelected() {
    this.selectedAll = this.std_list_All.every(function (item: any) {
      return item.selected == true;
    })
    //console.log(this.std_list_All);

    
    
  }// +++//

  selectAll2() {
    for (var i = 0; i < this.std_list_All2.length; i++) {
      this.std_list_All2[i].selected = this.selectedAll2;
    }
    //console.log(this.std_list_All);
  }
  checkIfAllSelected2() {
    this.selectedAll = this.std_list_All2.every(function (item: any) {
      return item.selected == true;
    })
    //console.log(this.std_list_All);
  }
  // 
  addGroup() {
    alert("addd");
    this.arrayStupack = [];

    this.std_list_All.forEach((item, index) => {
      if (item.selected == true) {
        this.arrayStupack.push(item.student_id);
        console.log(this.arrayStupack);
      }
    });

    //Add item with Custom IDs In Firebase
    const key = "group" + this.numofGroupid;
    console.log(key);

    const data = {
      group_name: this.GnameAdd,
      student_id: this.arrayStupack
    }
    this.db.list("/Groups").set(key, data);
    this.std_list_All = [];
  }
  setdataDelete(data) {

    console.log(data.student_id);
    this.student_id_del = "stu" + data.student_id;
    console.log(this.GroupDatail.key);
  }

  delete_student_in_group() {
    this.GroupDatail.student_id.forEach((item, index) => {
      console.log(item);
      console.log(this.student_id_del);

      if (item == this.student_id_del) {
        //   this.arrayStupack.push(item.student_id);
        console.log(item + "=" + this.student_id_del + "at" + index);
        //
        this.GroupDatail.student_id.splice(index, 1)
        console.log(this.GroupDatail.student_id);
        let data_up = {
          student_id: this.GroupDatail.student_id
        }
        // update database
        this.db.object('/Groups' + '/' + this.GroupDatail.key).update(data_up);
        console.log(this.GroupDatail.key);
        //
        this.GroupList2 = this.db.list('/Groups/' + this.GroupDatail.key).valueChanges();  //Display Student  //เรียงตาม Student ID
        this.GroupList2.forEach(data => {
          console.log(data);
          let dataSend = {
            key: this.GroupDatail.key,
            group_name: data[0],
            student_id: data[1]
          }
          console.log(dataSend);

          //for update result
          this.toGroupDatail(dataSend);      //{key: "group4", group_name: "myyyyy", student_id: Array(3)}
        });
      }
    });
  }
  display_add_student_in_group() {
    this.std_list_All2 = [];
    // show all student
    this.studentListAll2 = this.db.list('/Students', ref => ref.orderByChild("Student_ID"));  //Display Student  //เรียงตาม Student ID
    this.dataObj3 = this.studentListAll2.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.dataObj3.subscribe((item, index) => {
      // console.log(item);
      // console.log(item[0].key);
      item.forEach((item2, index) => {
        //console.log(item2.key);
        ///
        let tem = {
          keyStudent: item2.key,
          student_id: "stu" + item2.student_id,
          student_name: item2.student_name,
          selected: false
        }
        ///console.log(data[1]);
        this.std_list_All2.push(tem);
        console.log(this.std_list_All2);
      });
    });

    this.studentOfGroup.forEach(itemStu => {
      // console.log(itemStu.student_id);
      this.arrayStupackOld.push("stu" + itemStu.student_id)
      console.log(this.arrayStupackOld);
    });

  }

  add_student_in_group() {
    alert("add_student_in_group");

    this.arrayStupack2 = [];

    this.std_list_All2.forEach((item, index) => {
      if (item.selected == true) {
        this.arrayStupack2.push(item.student_id);
        console.log(this.arrayStupack2);
        console.log(this.arrayStupackOld);

        let arrayCon = this.arrayStupack2.concat(this.arrayStupackOld);
        console.log(arrayCon);
        let ArrayUniquePack = arrayCon.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        console.log(ArrayUniquePack);
        let data_up = {
          student_id: ArrayUniquePack
        }
           // update database
        this.db.object('/Groups' + '/' + this.GroupDatail.key).update(data_up);

         this.std_list_All2 = [];

        
        this.GroupList3 = this.db.list('/Groups/' + this.GroupDatail.key).valueChanges();  //Display Student  //เรียงตาม Student ID
        this.GroupList3.forEach(data => {
          console.log(data);
          let dataSend = {
            key: this.GroupDatail.key,
            group_name: data[0],
            student_id: data[1]
          }
          console.log(dataSend);

          //for update result
          this.toGroupDatail(dataSend);      //{key: "group4", group_name: "myyyyy", student_id: Array(3)}
        });
      

      }
    });

    //


  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}