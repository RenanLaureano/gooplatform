import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../../../_services/api.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-responsavel',
  templateUrl: './create-responsavel.component.html',
  styleUrls: ['./create-responsavel.component.scss']
})
export class CreateResponsavelComponent implements OnInit {

  constructor(private api: ApiService, private toastrService: NbToastrService, private router: Router) { }

  selectedId;
  nome = "";
  sobrenome = "";
  email = "";
  usuario = "";
  senha = "";
  contato = "";

  public loading = false;

  public criancas;
  public res_criancas = Array();
  public crianca_add = "0";

  ngOnInit() {
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));

    this.api.post("get-criacas-responsavel", { id_especialista: sessionObj.id}).subscribe(res => {
      this.loading = false;

      if (res.code === 1) {
        this.criancas = res.data;
      } else {
        this.criancas = [];
      }
    });
  }

  OnClickEnviar(){
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));
    if(this.nome === "" || this.sobrenome === "" || this.email === "" || this.usuario === "" || this.senha === "" || this.contato === ""){
      this.showToast("info", "Atenção!", "Preencha todos os campos!");
      return;
    }

    this.loading = true;
    this.usuario = this.usuario.replace(/\s/g, "").toLocaleLowerCase();
    this.email = this.email.replace(/\s/g, "").toLocaleLowerCase();

    this.api.post("create-responsavel", { id: sessionObj.id, nome: this.nome, sobrenome: this.sobrenome, senha: this.senha, email: this.email, contato: this.contato, usuario: this.usuario, pacientes: this.res_criancas}).subscribe(res => {
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

  onChangeUser(ev){
    this.usuario = this.usuario.replace(/\s/g, "").toLocaleLowerCase();
  }
  onChangeEmail(ev){
    this.email = this.email.replace(/\s/g, "").toLocaleLowerCase();
  }

  OnClickAdd(){
    if(this.crianca_add === "0"){
      return;
    }
    var obj = this.criancas.find( a => a.id === this.crianca_add);
    this.res_criancas.push(obj);
    this.criancas = this.criancas.filter(b => b.id != this.crianca_add);
    this.crianca_add = "0";
  }

  OnClickRemove(id){
    var obj = this.res_criancas.find( a => a.id === id);
    this.criancas.push(obj);

    this.res_criancas = this.res_criancas.filter(b => b.id != id);
  }
}
