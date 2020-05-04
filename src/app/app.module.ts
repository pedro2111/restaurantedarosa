import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { HomeFornecedorComponent } from './componentes/fornecedores/home-fornecedor/home-fornecedor.component';
import { NovoFornecedorComponent } from './componentes/fornecedores/novo-fornecedor/novo-fornecedor.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeCategoriaComponent } from './componentes/categorias/home-categoria/home-categoria.component';
import { NovaCategoriaComponent } from './componentes/categorias/nova-categoria/nova-categoria.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HomeBoletoComponent } from './componentes/boletos/home-boleto/home-boleto.component';
import { NovoBoletoComponent } from './componentes/boletos/novo-boleto/novo-boleto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('ptbr', ptBrLocale);
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { HomeComponent } from './componentes/home/home.component';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioBoletoComponent } from './componentes/boletos/calendario-boleto/calendario-boleto.component'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HomeClienteComponent } from './componentes/clientes/home-cliente/home-cliente.component';
import { NovoClienteComponent } from './componentes/clientes/novo-cliente/novo-cliente.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 500,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeFornecedorComponent,
    NovoFornecedorComponent,
    HomeCategoriaComponent,
    NovaCategoriaComponent,
    NotFoundComponent,
    HomeBoletoComponent,
    NovoBoletoComponent,
    HomeComponent,
    CalendarioBoletoComponent,
    HomeClienteComponent,
    NovoClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    CurrencyMaskModule,
    ChartsModule,
    FullCalendarModule,
    ModalModule.forRoot(),
    LoadingBarHttpClientModule

  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
