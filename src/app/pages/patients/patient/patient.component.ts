import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../../_services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {

  settings = {
    actions: {
      custom: [
        {
          name: 'remove',
          title: '<i class="nb-trash"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-list"></i>'
        },
        {
          name: 'analytics',
          title: '<i class="nb-bar-chart"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'left', // left|right
    },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      crianca: {
        title: 'Criança',
        type: 'string',
      },
      responsavel: {
        title: 'Responsavel',
        type: 'string',
      },
    },
  };

  pacientes: any = [];
  public loading = false;
  source: LocalDataSource = new LocalDataSource();

  constructor(api: ApiService, private router: Router) {
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    api.post("get-pacientes", { id: sessionObj.id }).subscribe(res => {
      if (res.code === 1) {
        this.pacientes = res.data;
        this.loading = false;
      }
    });
  }

  onCustomAction(event) {
    if(event.action === "edit"){
      this.router.navigate(['pages/patients/patient/edit/'+event.data.id]);
    } else if(event.action === "analytics"){
      this.router.navigate(['pages/patients/patient/analytic/'+event.data.id_crianca]);
    } else if(event.action === "remove"){
      
    }
  }
}
