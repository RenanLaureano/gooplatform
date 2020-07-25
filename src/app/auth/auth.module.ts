import { NgModule } from '@angular/core';
import { NbMenuModule, NbThemeModule, NbLayoutModule, NbAlertModule, NbCheckboxModule, NbInputModule, NbSidebarModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    NgxLoadingModule,
    AuthRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbThemeModule,
    NbLayoutModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    ThemeModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    HttpClientModule,
    NbIconModule,
    NgxLoadingModule.forRoot({}),
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
})
export class AuthModule {
}
