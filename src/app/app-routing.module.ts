import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlankComponent } from './blank/blank.component';
import { ManageStdGroupComponent } from './manage-std-group/manage-std-group.component';
import { TestComponent } from './test/test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { ReportOfStudentComponent } from './report-of-student/report-of-student.component';
import { ReportOfTestComponent } from './report-of-test/report-of-test.component';
import { TestStep1Component } from './test-step1/test-step1.component';
import { TestStep2Component } from './test-step2/test-step2.component';
import { TestStep3Component } from './test-step3/test-step3.component';
import { QuizComponent } from './quiz/quiz.component';
import { SignupComponent } from './signup/signup.component';

import { StudentCheckComponent } from './student-check/student-check.component';
// Service
import { AuthService } from './services/auth.service';
// Guard
import { AuthGuard } from './guards/auth.guard';
//upload
import { FormUploadComponent } from './upload/form-upload/form-upload.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'form-up',
    component: FormUploadComponent
  },
  
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
   // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BlankComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'student-list',
        component: StudentListComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'manage-std-group',
        component: ManageStdGroupComponent,
       //  canActivate: [AuthGuard]
      },
      {
        path: 'test',
        component: TestComponent,
        // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: TestStep1Component,
           //  canActivate: [AuthGuard]
          },
          {
            path: 'test-step2',
            component: TestStep2Component,
          //   canActivate: [AuthGuard]
          },
          {
            path: 'test-step3',
            component: TestStep3Component,
           //  canActivate: [AuthGuard]
          },
          {
            path: 'quiz',
            component: QuizComponent,
           //  canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'manage-test',
        component: ManageTestComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'report-of-test',
        component: ReportOfTestComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'report-of-student',
        component: ReportOfStudentComponent,
        // canActivate: [AuthGuard]
      },
      {
        path:'student-check',
        component:StudentCheckComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }