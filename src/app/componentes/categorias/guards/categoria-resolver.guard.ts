import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Categoria } from 'src/app/shared/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaResolverGuard implements Resolve<Categoria> {

  constructor(private categoriaService: CategoriaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Categoria> {

    if (route.params && route.params['id']) {

      return this.categoriaService.listarById(route.params['id']);
    }

    return of<Categoria>({
      id: null,
      nome: null
    });

  }

}
