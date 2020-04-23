import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Fornecedor } from 'src/app/shared/fornecedores.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Injectable({
  providedIn: 'root'
})

export class FornecedorResolverGuard implements Resolve<Fornecedor> {

  constructor(private fornecedorService: FornecedorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fornecedor> {

    if (route.params && route.params['id']) {

      return this.fornecedorService.listarById(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
  }
}

