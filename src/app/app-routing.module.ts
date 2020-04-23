import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeFornecedorComponent } from './componentes/fornecedores/home-fornecedor/home-fornecedor.component';
import { NovoFornecedorComponent } from './componentes/fornecedores/novo-fornecedor/novo-fornecedor.component';
import { FornecedorResolverGuard } from './componentes/fornecedores/guards/fornecedor-resolver.guard';
import { HomeCategoriaComponent } from './componentes/categorias/home-categoria/home-categoria.component';
import { NovaCategoriaComponent } from './componentes/categorias/nova-categoria/nova-categoria.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { FornecedorGuard } from './componentes/fornecedores/guards/fornecedor.guard';
import { CategoriaResolverGuard } from './componentes/categorias/guards/categoria-resolver.guard';
import { HomeBoletoComponent } from './componentes/boletos/home-boleto/home-boleto.component';
import { NovoBoletoComponent } from './componentes/boletos/novo-boleto/novo-boleto.component';
import { BoletoResolverGuard } from './componentes/boletos/guards/boleto-resolver.guard';
import { HomeComponent } from './componentes/home/home.component';
import { CalendarioBoletoComponent } from './componentes/boletos/calendario-boleto/calendario-boleto.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent,
    children:[
      {path: '', component: HomeComponent},

      {path: 'fornecedores', component: HomeFornecedorComponent},
      {path: 'fornecedores/novo', component: NovoFornecedorComponent,
      resolve:{fornecedor: FornecedorResolverGuard}},
      {path: 'fornecedores/editar/:id', component: NovoFornecedorComponent,
      resolve:{fornecedor: FornecedorResolverGuard}},

      {path: 'categorias', component: HomeCategoriaComponent},
      {path: 'categorias/nova', component: NovaCategoriaComponent,
      resolve:{categoriaR: CategoriaResolverGuard}},
      {path: 'categorias/editar/:id', component: NovaCategoriaComponent,
      resolve:{categoriaR: CategoriaResolverGuard}},
      {path: 'pagina-nao-encontrada', component: NotFoundComponent},

      {path: 'boletos', component: HomeBoletoComponent},
      {path: 'boletos/calendario', component: CalendarioBoletoComponent},
      {path: 'boletos/novo', component: NovoBoletoComponent,
      resolve:{boletoR: BoletoResolverGuard}},
      {path: 'boletos/editar/:id', component: NovoBoletoComponent,
      resolve:{boletoR: BoletoResolverGuard}}

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
