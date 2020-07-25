import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AnalyticComponent } from './analytic/analytic.component';

const routes: Routes = [{
  path: '',
  component: PatientsComponent,
  children: [
    {
      path: 'patients',
      component: PatientComponent,
    },
    {
      path: 'patient/edit/:id',
      component: EditPatientComponent,
    },
    {
      path: 'patient/analytic/:id',
      component: AnalyticComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule { }

export const routedComponents = [
  PatientsComponent,
  PatientComponent,
  EditPatientComponent,
  AnalyticComponent
];
