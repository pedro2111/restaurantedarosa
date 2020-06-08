import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http:HttpClient) { }

  public AbrirConta(idCliente){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.post(`${URL_API}/contas`, {"cliente_id": idCliente}, httpOptions)
  }

  public fecharConta(id){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.put(`${URL_API}/contas/${id}/fecharConta`, {httpOptions})
  }


}
