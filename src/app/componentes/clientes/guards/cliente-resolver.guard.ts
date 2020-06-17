import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from 'src/app/shared/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(private clienteService: ClienteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {

    if (route.params && route.params['id']) {

     return this.clienteService.listarById(route.params['id'])

    }

    return of({
      id: null,
      nome: null
    })
  }



}
