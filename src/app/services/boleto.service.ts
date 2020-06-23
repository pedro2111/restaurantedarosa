import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Boleto } from '../shared/boleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(page,size) {
    return this.http.get<Boleto[]>(`${URL_API}/boletos?page=${page}&size=${size}&sort=status,asc&sort=id,desc`);
  }
  public listarTodosBoletos(){
    return this.http.get<Boleto[]>(`${URL_API}/boletos/listarBoletos`);
  }

  public listarVencidos(){
    return this.http.get<Boleto[]>(`${URL_API}/boletos/Vencidos`);
  }

  public listarAVencer(){
    return this.http.get<Boleto[]>(`${URL_API}/boletos/AVencer`);
  }

  public listarVencidosHoje(){
    return this.http.get<Boleto[]>(`${URL_API}/boletos/VencidosHoje`);
  }
  public totalVencidoHoje(){
    return this.http.get(`${URL_API}/boletos/totalVencidosHoje`)
  }
  public totalVencido(){
    return this.http.get(`${URL_API}/boletos/totalVencidos`)
  }
  public totalAVencer(){
    return this.http.get(`${URL_API}/boletos/totalAVencer`)
  }
  public totalPago(){
    return this.http.get(`${URL_API}/boletos/totalPago`)
  }

  public totalMes(){
    return this.http.get(`${URL_API}/boletos/totalMes`)
  }

  public pagar (id){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.put(`${URL_API}/boletos/${id}/pagar`, httpOptions)
  }

  public listarById(id){

    return this.http.get<Boleto>(`${URL_API}/boletos/${id}`)
  }

  public cadastrar(boleto:Boleto){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.post<Boleto>(`${URL_API}/boletos`, boleto, httpOptions);
  }

  public atualizar(id,boleto:Boleto){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }
    return this.http.put(`${URL_API}/boletos/${id}`, boleto,httpOptions);
  }
}
