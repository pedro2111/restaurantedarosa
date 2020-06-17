import { Component, OnInit, TemplateRef } from '@angular/core';
import { Movimentacao } from 'src/app/shared/movimentacao.model';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { formataData } from 'src/app/shared/utils';
import { Conta } from 'src/app/shared/conta.model';
import { ContaService } from 'src/app/services/conta.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhe-cliente',
  templateUrl: './detalhe-cliente.component.html',
  styleUrls: ['./detalhe-cliente.component.css']
})
export class DetalheClienteComponent implements OnInit {

  constructor(
    private movService: MovimentacaoService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private contaService: ContaService,
    private modalService: BsModalService
  ) { }

  movimentacoes: Movimentacao[];
  movimentacoesConta: Movimentacao[];
  contas: Conta[];
  idCliente = this.route.snapshot.params.id;
  saldoCliente = 0;
  dt_abertura;
  contaModalRef: BsModalRef;
  valorTotalSaida = 0


  ngOnInit() {

    this.listarClienteMovimentacoes(this.idCliente);
    this.listarContasByCliente(this.idCliente)


  }

  listarClienteMovimentacoes(id) {
    this.movService.listarDetalheClienteMovimentacao(id).subscribe(
      (res) => { this.movimentacoes = this.formatarMovimentacoes(res) },
      (err) => { console.log(err) }
    );
  }
  listarContasByCliente(id) {
    this.contaService.listarContaCliente(id).subscribe(
      (res) => { this.contas = this.formatarContas(res) },
      (err) => { console.log(err) }
    );
  }
  listarMovimentacoesByConta(id) {
    this.movService.listarMovimentacaoConta(id).subscribe(
      (res) => { this.movimentacoesConta = this.formatarMovimentacoes(res) },
      (err) => { console.log(err) }
    );
  }

  formatarMovimentacoes(movimentacoes: Movimentacao[]) {
    this.valorTotalSaida = 0
    movimentacoes.forEach((mov) => {
      let dtFormatada
      dtFormatada = formataData(mov.dt_movimentacao)
      mov.dt_movimentacao = dtFormatada;
      this.saldoCliente += mov.valor;
      this.dt_abertura = dtFormatada
      
      if(mov.valor < 0){
        this.valorTotalSaida += mov.valor
      }

    });
    return movimentacoes;
  }
  formatarContas(contas: Conta[]) {
    contas.forEach((conta) => {
      conta.dt_abertura = formataData(conta.dt_abertura);
      conta.dt_fechamento = formataData(conta.dt_fechamento);
    });
    return contas;

  }
  deletar(id) {
    this.movService.deletar(id).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Movimentação deletada com sucesso');
        this.listarClienteMovimentacoes(this.idCliente)

      }, (err) => {
        console.log(err)
      });
  }

  openModalConta(contaId, template: TemplateRef<any>) {
    this.listarMovimentacoesByConta(contaId);
    this.contaModalRef = this.modalService.show(template, { class: 'modal-lg' })

  }
}
