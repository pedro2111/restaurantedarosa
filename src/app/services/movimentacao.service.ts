import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Movimentacao } from '../shared/movimentacao.model';
import {concatMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  constructor(private http:HttpClient) { }

  public cadastrar(movimentacao:any[]){
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.post(`${URL_API}/movimentacoes`, movimentacao, httpOptions)
  }

  public listarClienteMovimentacao(){

    return this.http.get(`${URL_API}/movimentacoes/listarClientesMovimentacoes`)
  }
  public listarClienteSemMovimentacao(){

    return this.http.get(`${URL_API}/movimentacoes/listarClientesSemMovimentacoes`)
  }

  public listarTotalClienteMovimentacao (){

    return this.http.get(`${URL_API}/movimentacoes/listarTotalClienteMovimentacoes`)
  }
  public listarClienteContaSemMovimentacoes(){

    return this.http.get(`${URL_API}/movimentacoes/listarClientesContaSemMovimentacoes`)

  }
  listarDetalheClienteMovimentacao(id){

    return this.http.get<Movimentacao[]>(`${URL_API}/movimentacoes/${id}/listarMovimentacoesCliente`)
  }
  deletar(id){

    return this.http.delete(`${URL_API}/movimentacoes/${id}`)
  }
  listarMovimentacaoConta(id){

    return this.http.get<Movimentacao[]>(`${URL_API}/movimentacoes/conta/${id}`)
  }
}
