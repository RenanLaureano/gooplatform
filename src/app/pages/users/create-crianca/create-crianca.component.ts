import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../../../_services/api.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-crianca',
  templateUrl: './create-crianca.component.html',
  styleUrls: ['./create-crianca.component.scss']
})
export class CreateCriancaComponent implements OnInit {

  constructor(private api: ApiService, private toastrService: NbToastrService, private router: Router) { }

  selectedId;
  nome = "";
  sobrenome = "";
  usuario = "";
  senha = "";
  public loading = false;
  ngOnInit() {

  }

  OnClickEnviar(){
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));
    if(this.nome === "" || this.usuario === "" || this.senha === "" || this.sobrenome === ""){
      this.showToast("info", "Atenção!", "Preencha todos os campos!");
      return;
    }

    this.loading = true;
    this.usuario = this.usuario.replace(/\s/g, "").toLocaleLowerCase();

    this.api.post("create-crianca", { id: sessionObj.id, nome: this.nome, sobrenome: this.sobrenome, senha: this.senha, usuario: this.usuario}).subscribe(res => {
      this.loading = false;
      if (res.code === 1) {
        this.showToast("success", "Sucesso!", res.data);
        this.router.navigate(['pages/users/criancas']);
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
}
