import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../../_services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.scss'],
})
export class ResponsavelComponent {

  settings = {
    actions: {
      custom: [
        {
          name: 'remove',
          title: '<i class="nb-trash"></i>',
          action: "TesteClick()"
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
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
      name: {
        title: 'Nome',
        type: 'string',
      },
      lastname: {
        title: 'Sobrenome',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
    },
  };

  responsaveis: any = [];
  public loading = false;
  source: LocalDataSource = new LocalDataSource();

  constructor(api: ApiService, private router: Router) {
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    api.post("get-responsaveis", { id: sessionObj.id }).subscribe(res => {
      if (res.code === 1) {
        this.responsaveis = res.data;
        this.loading = false;
      }
    });
  }

  onCustomAction(event) {
    if(event.action === "edit"){
      this.router.navigate(['pages/users/edit/responsavel/'+event.data.id]);
    } else if(event.action === "remove"){
      
    }
  }

  OnClickAdd(){
    this.router.navigate(['pages/users/create/responsavel']);
  }
}
