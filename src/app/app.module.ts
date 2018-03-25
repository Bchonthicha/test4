import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';

// import {
//   MatAutocompleteModule,
//   MatButtonModule,
//   MatButtonToggleModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatExpansionModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatTooltipModule,
//   MatStepperModule,
//   MatFormFieldModule
// } from '@angular/material';

import { AppComponent } from './app.component';
//firebase
//import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//test

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//component
import { StudentListComponent } from './student-list/student-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlankComponent } from './blank/blank.component';
import { NavRouteTopicPipe } from './pipes/nav-route-topic.pipe';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { ManageStdGroupComponent } from './manage-std-group/manage-std-group.component';
import { QuizComponent } from './quiz/quiz.component';
import { TestComponent } from './test/test.component';
import { ReportOfTestComponent } from './report-of-test/report-of-test.component';
import { ReportOfStudentComponent } from './report-of-student/report-of-student.component';
import { TestStep1Component } from './test-step1/test-step1.component';
import { TestStep2Component } from './test-step2/test-step2.component';
import { TestStep3Component } from './test-step3/test-step3.component';
import { SignupComponent } from './signup/signup.component';
import { FirebaseService } from './services/firebase.service';

//test
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Service
import { AuthService } from './services/auth.service';

// Guard
import { AuthGuard } from './guards/auth.guard';
import { StudentCheckComponent } from './student-check/student-check.component';

//Upload file to firebass
import { UploadComponent } from './upload/upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { UploadFileService } from './services/upload-file.service';

//create graph/chart
import { ChartsModule } from 'ng2-charts';

//toggle
import { FeatureToggleModule } from 'ngx-feature-toggle';

//download to excel file
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    LoginComponent,
    DashboardComponent,
    BlankComponent,
    NavRouteTopicPipe,
    ManageTestComponent,
    ManageStdGroupComponent,
    QuizComponent,
    TestComponent,
    ReportOfTestComponent,
    ReportOfStudentComponent,
    TestStep1Component,
    TestStep2Component,
    TestStep3Component,
    SignupComponent,
    StudentCheckComponent,
    UploadComponent,
    FormUploadComponent
  ],
  imports: [
    FeatureToggleModule,
    ChartsModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireAuthModule,
    // MatAutocompleteModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatStepperModule,
    // MatFormFieldModule,

    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  // providers: [AuthService, AuthGuard],
  providers: [FirebaseService, AuthService, AngularFireDatabase, AuthGuard, UploadFileService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
