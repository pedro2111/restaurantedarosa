import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Boleto } from 'src/app/shared/boleto.model';
import { BoletoService } from 'src/app/services/boleto.service';

@Injectable({
  providedIn: 'root'
})

export class BoletoResolverGuard implements Resolve<Boleto> {

  constructor(private boletoService:BoletoService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boleto> {

    if (route.params && route.params['id']) {

      return this.boletoService.listarById(route.params['id']);
    }

    return of<Boleto>({
      id: null,
      nome: null,
      dtCriacao: null,
      nomeCategoria: null,
      nomeUsuario: null,
      nomeFornecedor: null,
      status: null,
      dtVencimento: null,
      valor: null
    });

  }
  
}
