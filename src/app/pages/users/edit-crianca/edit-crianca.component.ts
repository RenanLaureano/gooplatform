import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../../../_services/api.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-crianca',
  templateUrl: './edit-crianca.component.html',
  styleUrls: ['./edit-crianca.component.scss']
})
export class EditCriancaComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute, private toastrService: NbToastrService, private router: Router) { }

  selectedId;
  nome;
  sobrenome;
  usuario;
  senha = "";
  public loading = false;

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get("id");
    var sessionObj = JSON.parse(localStorage.getItem('currentUser'));

    this.loading = true;
    this.api.post("get-crianca", { id: this.selectedId, id_especialista: sessionObj.id }).subscribe(res => {
      if (res.code === 1) {
        this.nome = res.data.nome;
        this.usuario = res.data.usuario;
        this.sobrenome = res.data.sobrenome;
        this.loading = false;
      }
    });
  }

  OnClickEnviar(){
    if(this.nome === "" || this.sobrenome === ""){
      this.showToast("info", "Atenção!", "Preencha todos os campos!");
      return;
    }

    this.loading = true;
    this.api.post("edit-crianca", { id: this.selectedId, nome: this.nome,  sobrenome: this.sobrenome, senha: this.senha}).subscribe(res => {
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
}
