import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BoletoService } from 'src/app/services/boleto.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Boleto } from 'src/app/shared/boleto.model';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';

@Component({
  selector: 'app-home-boleto',
  templateUrl: './home-boleto.component.html',
  styleUrls: ['./home-boleto.component.css']
})
export class HomeBoletoComponent implements OnInit {

  constructor(
    private boletoService: BoletoService,
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute) { }

  boletos: Boleto[] = [];
  vencidos: Boleto[] = [];
  vencidosHoje: Boleto[] = [];
  aVencer: Boleto[] = [];
  totalVencido = '0';
  totalAvencer = '0';
  totalVencidoHoje = '0';
  filtro: string;
  p;
  page=0;
  size=10;
  totalElementos;

  ngOnInit() {
    this.listar(this.page,this.size);
    //this.listarTodosBoletos();
    this.listarAVencer();
    this.listarVencidos();
    this.listarVencidosHoje();
  }

  getPage(page){
    this.page = page - 1;
    this.listar(this.page,this.size);
  }

  listar(page,size) {
    this.boletoService.listar(page,size).subscribe(
      (res) => { console.log(this.totalElementos = res['totalElements']),this.boletos = this.diffDate(res['content']) },
      (err) => this.error403(err)
    );
  }
  listarTodosBoletos() {
    this.boletoService.listarTodosBoletos().subscribe(
      (res) => { this.boletos = this.diffDate(res) },
      (err) => this.error403(err)
    );
  }

  listarAVencer() {
    this.boletoService.listarAVencer().subscribe(
      (res) => {
        this.aVencer = res;
        this.totalAvencer = this.calculaTotal(res)
      },
      (err) => this.error403(err)
    );
  }

  listarVencidos() {
    this.boletoService.listarVencidos().subscribe(
      (res) => {
        this.vencidos = res;
        this.totalVencido = this.calculaTotal(res)
      },
      (err) => this.error403(err)
    );
  }

  listarVencidosHoje() {
    this.boletoService.listarVencidosHoje().subscribe(
      (res) => {
        this.vencidosHoje = res;
        this.totalVencidoHoje = this.calculaTotal(res)
      },
      (err) => this.error403(err)
    );
  }

  editar(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  pagar(id) {

    this.boletoService.pagar(id).subscribe(
      (res) => { this.notifierService.notify('success', 'Pagamento realizado com sucesso!'), this.refresh() },
      (err) => this.error403(err)
    );

  }

  error403(err) {
    console.log(err);

    if (err.status == 403) {
      this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
      setTimeout(() => { this.router.navigate(['/login']) }, 2500);
    }
  }
  diffDate(boletos: Boleto[]) {

    let boletosPagos:Boleto[];

    for (let i in boletos) {
      let hoje = moment(new Date()).format("YYYY-MM-DD")
      let dtAtual = moment(hoje, "YYYY-MM-DD")
      let dtVencimento = moment(boletos[i]['dtVencimento'], "YYYY-MM-DD")
      let diff = moment.duration(dtVencimento.diff(dtAtual))

      boletos[i]['diff'] = diff.asDays();
    }
    boletosPagos = boletos.filter((filtrados) => {return filtrados.status == 'PAGO'})
    boletos = boletos.filter((filtrados) => {return filtrados.status != 'PAGO'})

    boletos.sort((a, b) => {
   
        if (a.diff > b.diff) {
          return 1;
        }
        if (a.diff < b.diff) {
          return -1;
        }
        return 0;
      
    })
    return boletos.concat(boletosPagos);

  }
  calculaTotal(boletos: Boleto[]) {
    let total = 0
    boletos.forEach((b) => {
      total += b.valor;
    })
    return total.toFixed(2);
  }
  refresh() {
    this.listar(this.page,this.size);
    //this.listarTodosBoletos();
    this.listarAVencer();
    this.listarVencidos();
    this.listarVencidosHoje();
  }
  filtroBoletos() {
    
    if (this.boletos.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.boletos
    }
    return this.boletos.filter((b) => {
      if (b.nome.toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) >= 0 || b.dtVencimento.toString().toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) >= 0 || b.nomeFornecedor.toString().toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }


}
