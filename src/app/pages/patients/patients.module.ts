import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbSelectModule, NbTabsetModule, NbRouteTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PatientsRoutingModule, routedComponents } from './patients-routing.module';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { TimePerPlacePieComponent } from './analytic/time-per-place-pie.component';
import { MomentModule } from 'ngx-moment';
import { PlayedWeekXaxisComponent } from './analytic/played-week-xaxis.component';


const components = [
  TimePerPlacePieComponent,
  PlayedWeekXaxisComponent,
  EditPatientComponent
];

@NgModule({
  imports: [
    PatientsRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    NbSelectModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot(),
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    MomentModule
  ],
  declarations: [
    ...routedComponents,
    ...components
  ],
})
export class PatientsModule { }
