import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  //สำหรับการจำลอง รับคำตอบเข้ามา
  eiei: any;
  tesssttext1: any;
  tesssttext2: any;

  //สำหรับค่าที่ส่งมาแบบ pubilc จาก step ต่างๆ
  receiveTest1: any;
  receiveTest2: any;
  receiveTest3: any;

  //สำหรับการดึงค่าจาก database ในตาราง testList
  testList: any;
  dataObj_pre: any;

  //["Q5", "Q4", "Q3"]
  q_id: any;

  //ชื่อ topic ที่แสดง
  topic_name_display: any;

  //array ของ list รายการคำถามทั้งหมด
  question_display = [];
  //ผลแสดงคำถามที่แสดงในข้อนั้นๆ
  question_display2: any;
  //choice ที่นำไปแสดง
  choice_display: any;
  //จำนวนคำถามที่มี รับมาจาก database
  total_num: any;
  //จำนวนคำถามสำหรับคำนวน
  total_num_cal: any;
  //ตัวเลขปของงคำถามมัจจุบัน
  current_num: any;
  //ตัวเลขเปอร์เซ็นต์ที่แสดง
  doing_percent: any;

  //ดึงค่าจาก database ในตาราง TestScore
  TestScoreList: AngularFireList<any>;
  dataObj2: any;

  //รหัส test ที่แสดงอยู่ตอนนี้
  testID: any;
  //รหัส Topic ที่แสดงอยู่ตอนนี้
  Topic: any;
  //รหัส question ที่แสดงอยู่ตอนนี้
  Q_no: any;
  //ผลเฉลยของคำถามที่แสดงอยู่ตอนนี้
  Q_answer_index: any;

  //สำหรับเก็บค่าเพื่อแสดงในส่วนของรายการคำตอบที่รับเข้ามา และ ประมวลผล
  pack_array_testList: any;
  array_testList = [];



  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    // test score add to database
    this.TestScoreList = this.db.list('/TestScore');  //Display Test

    this.dataObj2 = this.TestScoreList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    // this.dataObj.subscribe( data => {
    //   console.log(data);
    // });
    //this.test();
    //

    //list pubilc for test step
    this.receiveTest1 = this.firebaseService.arrayTest1;
    this.receiveTest2 = this.firebaseService.arrayTest2;
    this.receiveTest3 = this.firebaseService.arrayTest3;
    // console.log(this.receiveTest1);
    // console.log(this.receiveTest2);
    // console.log(this.receiveTest3);

    //

    this.testID = this.firebaseService.Test_id_new;
    console.log(this.testID);

    let path = 'Test/' + this.testID;
    let ref2 = this.db.list(path).valueChanges();

    ref2.forEach(data => {

      console.log(data[1]);    //["category1",["Q5", "Q4", "Q3"], [570510640, 570510641, 570510642], "Tue, 27 Feb 2018 08:18:32 GMT", "ก่อนเรียน", "3", "T1"]
      this.Topic = data[6];
      console.log(data[6]);
      console.log(data[5]);

      this.total_num = data[5];
      this.total_num_cal = data[5];
      this.current_num = 0;

      if (this.current_num == 0) {
        this.doing_percent = 0;
      } else {
        this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);;
      }


      let path = 'Topics/' + data[6];
      let ref3 = this.db.list(path).valueChanges();

      ref3.subscribe(data => {
        // console.log("size" + this.receiveQid.length);
        console.log(data);
        console.log(data[5]);
        this.topic_name_display = data[5];
      });

      this.q_id = data[1];
      console.log(this.q_id);
      this.q_id.forEach(item => {
        console.log(item);
        let path = 'Questions/' + item;
        let ref4 = this.db.list(path).valueChanges();

        ref4.subscribe(data => {
          // console.log("size" + this.receiveQid.length);
          console.log(data);
          console.log(data[2]);

          let tem = {
            keyQ: item,
            answer_index: data[0],
            choice: data[1],
            question: data[2],
            topic_id: data[3],
            status: false
          }
          console.log(tem);
          this.question_display.push(tem);
          console.log(this.question_display);

          console.log((this.current_num));
          console.log(this.question_display[(this.current_num)]);
          console.log(this.question_display[(this.current_num)].keyQ);
          this.Q_no = (this.question_display[(this.current_num)].keyQ);
          console.log(this.question_display[(this.current_num)].question);
          console.log(this.question_display[(this.current_num)].answer_index);
          this.Q_answer_index = this.question_display[(this.current_num)].answer_index;

          this.question_display2 = this.question_display[(this.current_num)].question;
          console.log(this.question_display2);

          this.choice_display = this.question_display[(this.current_num)].choice;
          this.choice_display.forEach(item3 => {
            console.log(item3);
          });
        });

      })
    })


    //call function set_oldScore
    //   this.set_oldScore();
    //  console.log(this.score_old2);
  }

  ngOnInit() {
  }
  /*
  async test(){
     const key2 = await this.TestScore_id_pack;
    // const key2 ='TestScore1'
     const data_TestScore = await{
      Student_id: '2',
      Test_id: '2',
      Score: '2',
      Student_answer: [2]
    }
    console.log(data_TestScore);
    console.log(key2);
    await this.db.list("/TestScore").set(key2, data_TestScore);
  }*/



  TestStuList() {
    //รับแล้วเอาไปเก็บในDB
    this.array_testList = [];
    alert("listttt");
    console.log(this.testID);
    console.log(this.Topic);
    console.log(this.Q_no);

    const data = {
      Test_id: this.testID,
      topic_id: this.Topic,
      Questions_no: this.Q_no,
      student_id: this.tesssttext1,     //Sid
      Answer: this.tesssttext2          //answer

    }
    console.log(data);

    this.db.list("/TestList").push(data);

    /*console.log(this.tesssttext1); 
    console.log(this.tesssttext2);  
    let scoreSum = 0;
    if (this.tesssttext2 == 1) {
      scoreSum = scoreSum + 1;
      console.log(scoreSum);
    }

    let testeiei = { "id": this.tesssttext1, "name": "nametest" + this.tesssttext1, "Score": scoreSum, "Answer": this.tesssttext2 };
    console.log(testeiei.id);

    this.eiei.forEach((data, index) => {
      console.log("dataaa=" + data + " indexxxx" + index);
      console.log(data.id);
      if (data.id == testeiei.id) {
        console.log("sameeeeee");
        this.eiei.splice(index, 1);
      }
    });
    this.eiei.push(testeiei);
    */
    // this.displayStulist();
  }
  inputAnswer() {

    //database ของ TestList
    this.testList = this.db.list('/TestList');
    this.dataObj_pre = this.testList.snapshotChanges().map(changes => {
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    //ดึงค่าของแต่ล่ะ obj ของ TestList
    this.dataObj_pre.subscribe(data1 => {
      this.array_testList = [];
      console.log(data1);
      //console.log(data1.student[0].student_id);
      data1.forEach(data1_2 => {
        console.log(data1_2);
        console.log(data1_2.Questions_no);
        console.log(data1_2.Test_id);
        // เชคว่าที่มีนั้นตรงกับข้อ กับหัวข้อ และกับแบบทดสอบที่กำลังทำ
        if (data1_2.Questions_no == this.Q_no && data1_2.Test_id == this.testID) {
          console.log(data1_2.student[0]);
          console.log(data1_2.student[0].student_id);
          console.log(data1_2.student[0].url);
          console.log(data1_2.Answer);

          //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
          this.pack_array_testList = {
            student_id: data1_2.student[0].student_id,
            student_name: data1_2.student[0].Student_name,
            score: data1_2.student[0].score,
            url: data1_2.student[0].url,
            answer: data1_2.Answer
          }
          //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
          this.array_testList.unshift(this.pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
          console.log(this.array_testList);     //ที่ตรงกับที่กำลังทำ     
        }
      });
    });
  }

  ProcessAnswer() {
    //ประมวลผลคำตอบในข้อนั้นๆ
    alert("ProcessAnswer");
    console.log("------------ProcessAnswer------------");

    console.log(this.array_testList);   //array ที่บรรจุค่า obj ที่แสดงอยู่ในส่วนที่มาจาก inputAnswer();
    console.log(this.Q_no);             //รหัสของคำถามนั้น
    console.log(this.Q_answer_index);   //เฉลย ตำแหน่งที่เป็นคำตอบที่ถูกต้อง

    //เรียงลำดับของ obj ใน array_testList โดยการเรียงจากมากไปน้อยของรหัสนักศึกษา
    this.array_testList.sort(function (obj1, obj2) {
      // Ascending: first student_id less than the previous
      return obj1.student_id - obj2.student_id;
    });

    //ดึงค่าของแต่ล่ะ obj ของ TestList เพื่อตรวจคำตอบ ของแต่ละคน
    this.array_testList.forEach(data_check => {
      console.log(data_check);
      console.log(data_check.answer);

      //ตรวจคำตอบ
      if (data_check.answer == this.Q_answer_index) { //คำตอบถูก
        console.log(data_check.answer + "===" + this.Q_answer_index);
        let new_score = data_check.score + 1;         //บวกคะแนนเพิ่ม
        console.log(new_score);
        data_check.score = new_score;
      }
    });
  }
  NextQuestion() {
    //เก็บใน database ตาราง TestScore 
    console.log(this.array_testList);


    //เริ่มข้อคำถามใหม่
    this.array_testList = [];
    if (this.current_num < this.total_num - 1) {
      alert("NextQuestion");
      this.current_num = this.current_num + 1;
      console.log(this.current_num);
      console.log(this.question_display[(this.current_num)].question);
      console.log(this.question_display[(this.current_num)].keyQ);
      this.Q_no = (this.question_display[(this.current_num)].keyQ);
      this.Q_answer_index = (this.question_display[(this.current_num)].answer_index);
      this.question_display2 = this.question_display[(this.current_num)].question;
      // console.log( this.question_display2);
      this.choice_display = this.question_display[(this.current_num)].choice;
      this.choice_display.forEach(item3 => {
        console.log(item3);
        console.log(this.question_display[(this.current_num)].answer_index);

      });
      this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);
      this.question_display[(this.current_num - 1)].status = true;
      console.log(this.question_display);

    } else {
      alert("หมด");
      this.question_display[(this.current_num)].status = true;
      console.log(this.question_display);
    }
  }

  PuaseTest() {
    alert("Puase");
  }
  SkipQuestion() {
    alert("Skip");
    this.total_num_cal = this.total_num_cal - 1;
    this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);
  }

  displayStulist() {
    alert("heyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  }


}
