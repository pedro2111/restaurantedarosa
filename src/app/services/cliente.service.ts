import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../shared/cliente.model';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  

  constructor(private http:HttpClient) { }
  
  public listarById(id){

    return this.http.get<Cliente>(`${URL_API}/clientes/${id}`)
  }

  public cadastrar(cliente:Cliente){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.post(`${URL_API}/clientes`, cliente,httpOptions)
  }

  atualizar(id,cliente: Cliente) {

    return this.http.put(`${URL_API}/clientes/${id}`, cliente)

  }
}
