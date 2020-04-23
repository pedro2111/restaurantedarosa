import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Injectable({
  providedIn: 'root'
})


export class FornecedorGuard implements CanActivate {

  constructor(private fornecedorService:FornecedorService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    
    if (route.params && route.params['id']) {
      
       this.fornecedorService.listarById(route.params['id'])
       .subscribe(
         () => {this.router.navigate(['/dashboard/fornecedores/editar', route.params['id']]);return true;},
         () => {this.router.navigate(['/dashboard/pagina-nao-encontrada']); return false;}
       );
    }else{
      return false;
    }

    
  }
  
}
