import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Categoria } from '../shared/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Categoria[]>(`${URL_API}/categorias`);
  }
  listarById(id){
    return this.http.get<Categoria>(`${URL_API}/categorias/${id}`);
  }

  cadastrar(categoria:Categoria){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.post(`${URL_API}/categorias`, categoria,httpOptions);

  }

  deletar(id){
    return this.http.delete(`${URL_API}/categorias/${id}`);
  }

  atualizar(id, cat:Categoria){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.put(`${URL_API}/categorias/${id}`, cat, httpOptions);
  }
}
