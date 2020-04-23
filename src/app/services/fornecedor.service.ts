import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Fornecedor } from '../shared/fornecedores.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) {

  }

  listar() {

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.get<Fornecedor[]>(`${URL_API}/fornecedores`, httpOptions);
  }

  cadastrar (fornecedor:Fornecedor){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.post(`${URL_API}/fornecedores`, fornecedor,httpOptions);
  }

  deletar(id){

   return this.http.delete(`${URL_API}/fornecedores/${id}`);
  }
  atualizar(id,fornecedor:Fornecedor){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

   return this.http.put(`${URL_API}/fornecedores/${id}`,fornecedor,httpOptions);
  }

  listarById(id){

    return this.http.get<Fornecedor>(`${URL_API}/fornecedores/${id}`);

  }


}
