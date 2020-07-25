import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsavelComponent } from './responsavel/responsavel.component';
import { UsersComponent } from './users.component';
import { EditResponsavelComponent } from './edit-responsavel/edit-responsavel.component';
import { CreateResponsavelComponent } from './create-responsavel/create-responsavel.component';
import { CriancaComponent } from './crianca/crianca.component';
import { EditCriancaComponent } from './edit-crianca/edit-crianca.component';
import { CreateCriancaComponent } from './create-crianca/create-crianca.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'responsaveis',
      component: ResponsavelComponent,
    },
    {
      path: 'edit/responsavel/:id',
      component: EditResponsavelComponent,
    },
    {
      path: 'create/responsavel',
      component: CreateResponsavelComponent,
    },
    {
      path: 'criancas',
      component: CriancaComponent,
    },
    {
      path: 'edit/crianca/:id',
      component: EditCriancaComponent,
    },
    {
      path: 'create/crianca',
      component: CreateCriancaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

export const routedComponents = [
  UsersComponent,
  ResponsavelComponent,
  EditResponsavelComponent,
  CreateResponsavelComponent,
  CriancaComponent,
  EditCriancaComponent,
  CreateCriancaComponent,
];
