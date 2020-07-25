import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { EditResponsavelComponent } from './edit-responsavel/edit-responsavel.component';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    NbSelectModule,
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ...routedComponents,
    EditResponsavelComponent,
  ],
})
export class UsersModule { }
