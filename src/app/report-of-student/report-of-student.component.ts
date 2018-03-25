import { Component, OnInit } from '@angular/core';

import { ExcelService } from '../services/excel.service';
import { PERSONS, Person } from './model';

declare const $;

@Component({
  selector: 'app-report-of-student',
  templateUrl: './report-of-student.component.html',
  styleUrls: ['./report-of-student.component.css']
})
export class ReportOfStudentComponent  {
  persons: Person[];
  constructor(private excelService: ExcelService) {
    this.excelService = excelService;
    this.persons = PERSONS;
  }
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(PERSONS, 'persons');
  }
  ngOnInit() {
   
  }

}
