import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../shared/usuario.model';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario:Usuario){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers:headers
    }

    return this.http.post(`${URL_API}/auth`, usuario,httpOptions);
  }

  cadastrar(usuario:Usuario){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers:headers
    }

    return this.http.post(`${URL_API}/usuarios`, usuario, httpOptions);

  }
}
