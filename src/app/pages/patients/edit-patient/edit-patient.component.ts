import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as StringMask from 'string-mask';

@Component({
  selector: 'ngx-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  selectedId;
  public loading = false;
  public inEdit = false;

  public responsavel;
  public crianca;
  public contato;
  public email;

  public hospital;
  public contatoHospital;
  public situacao;
  public observacao;


  constructor(private api: ApiService, private route: ActivatedRoute, private toastrService: NbToastrService, private router: Router) { }

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get("id");
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));

    this.loading = true;
    this.api.post("get-paciente", { id: this.selectedId, id_especialista: sessionObj.id}).subscribe(res => {
      if (res.code === 1) {

        var formatter = new StringMask('(00) 00000-0000');
        var formatter2 = new StringMask('(00) 0000-0000');

        this.responsavel = res.data[0].responsavel;
        this.email = res.data[0].email;
        this.crianca = res.data[0].crianca;
        this.contato = formatter.apply(res.data[0].contato);
        this.loading = false;

        this.hospital = res.data[0].hospital;
        this.contatoHospital = formatter2.apply(res.data[0].hospitalContato);
        this.situacao = res.data[0].situacao;
        this.observacao = res.data[0].observacao;
      }
    });
  }

  OnClickEdit(){
    this.inEdit = true;
  }

  OnClickSave(){
    this.loading = true;

    this.api.post("edit-dados-paciente", { id: this.selectedId, observacao: this.observacao, situacao: this.situacao, contato: this.contatoHospital, hospital: this.hospital}).subscribe(res => {
      if (res.code === 1) {
        this.showToast("success", "Sucesso!", res.data);
        this.inEdit = false;
        this.loading = false;
        var formatter = new StringMask('(00) 0000-0000');
        this.contatoHospital = formatter.apply(this.contatoHospital);
      } else {
        this.showToast("danger", "Erro!", res.data);
      }
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
}
