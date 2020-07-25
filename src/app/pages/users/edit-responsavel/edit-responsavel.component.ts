import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../../../_services/api.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-responsavel',
  templateUrl: './edit-responsavel.component.html',
  styleUrls: ['./edit-responsavel.component.scss']
})
export class EditResponsavelComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute, private toastrService: NbToastrService, private router: Router) { }

  selectedId;
  nome;
  sobrenome;
  email;
  usuario;
  senha = "";
  contato = "";
  public loading = false;

  public criancas;
  public res_criancas;
  public post_pacientes = [];

  public crianca_add = "0";

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get("id");
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));


    this.loading = true;
    this.api.post("get-responsavel", { id: this.selectedId, id_especialista: sessionObj.id}).subscribe(res => {
      if (res.code === 1) {
        this.nome = res.data.nome;
        this.email = res.data.email;
        this.usuario = res.data.usuario;
        this.sobrenome = res.data.sobrenome;
        this.contato = res.data.contato;
        this.loading = false;
      }
    });

    this.api.post("get-criacas-responsavel", { id_especialista: sessionObj.id}).subscribe(res => {
      this.loading = false;

      if (res.code === 1) {
        this.criancas = res.data;
      } else {
        this.criancas = [];
      }
    });

    this.api.post("get-pacientes-responsavel", { id_responsavel: this.selectedId, id_especialista: sessionObj.id}).subscribe(res => {
      this.loading = false;
      if (res.code === 1) {
        this.res_criancas = res.data;
      } else {
        this.res_criancas = [];
      }

      this.res_criancas.forEach(element => {
        this.post_pacientes.push(element);
      });

      console.log(this.post_pacientes);
    });
  }

  OnClickEnviar(){
    if(this.nome === "" || this.email === "" || this.usuario === "" || this.sobrenome === "" || this.contato === ""){
      this.showToast("info", "Atenção!", "Preencha todos os campos!");
      return;
    }

    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));

    this.loading = true;
    this.api.post("edit-responsavel", { id: this.selectedId, id_especialista: sessionObj.id,nome: this.nome, sobrenome: this.sobrenome, contato: this.contato, senha: this.senha, pacientes: this.post_pacientes}).subscribe(res => {
      this.loading = false;
      if (res.code === 1) {
        this.showToast("success", "Sucesso!", res.data);
        this.router.navigate(['pages/users/responsaveis']);
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

  OnClickAdd(){
    if(this.crianca_add === "0"){
      return;
    }
    var obj = this.criancas.find( a => a.id === this.crianca_add);
    this.res_criancas.push(obj);
    this.criancas = this.criancas.filter(b => b.id != this.crianca_add);
    this.crianca_add = "0";

    if(obj.seted === "1"){
      this.post_pacientes[this.post_pacientes.indexOf(obj)].isDelete = "0";
    } else {
      this.post_pacientes.push(obj);
    }
  }

  OnClickRemove(id){
    var obj = this.res_criancas.find( a => a.id === id);
    this.criancas.push(obj);

    this.res_criancas = this.res_criancas.filter(b => b.id != id);

    if(obj.seted === "1"){
      this.post_pacientes[this.post_pacientes.indexOf(obj)].isDelete = "1";
    } else {
      this.post_pacientes = this.post_pacientes.filter(b => b.id != id);
    }
  }
}
