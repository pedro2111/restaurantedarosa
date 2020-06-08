import { Component, OnInit, TemplateRef } from '@angular/core';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

import { ContaService } from 'src/app/services/conta.service';
import { NotifierService } from 'angular-notifier';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  constructor(
    private movService: MovimentacaoService,
    private contaService: ContaService,
    private notifierService: NotifierService,
    private modalService: BsModalService
  ) { }

  movimentacaoModalRef: BsModalRef;
  movimentacoes = [];
  movimentacaoModal = [];
  totalGeral = 0;
  clienteSemMov = []

  formulario: FormGroup = new FormGroup({
    'valor': new FormControl(null, [Validators.required]),
    'observacao': new FormControl(null),
    'tipo': new FormControl(null, [Validators.required]),
    'cliente_id': new FormControl(null, [Validators.required]),
    'conta_id': new FormControl(null, [Validators.required]),
  });

  ngOnInit() {

    this.listarMovimentacoes();

  }

  public populaMovimentacoes(clientesContaFechada: Array<any>, clientes: Array<any>, clientesContaSemMov: Array<any>) {

    this.movimentacoes = [];
    this.totalGeral = 0;


    clientes.forEach(res => {

      this.movimentacoes.push(
        {
          nome: res[0],
          cliente_id: res[1],
          saldo: res[2],
          conta_id: res[3],
        })
    });
    clientesContaFechada.forEach((res) => {

      this.movimentacoes.push(
        {
          nome: res[0],
          cliente_id: res[1],
          saldo: 'Sem Movimentação'
        })
    });

    clientesContaSemMov.forEach((res) => {

      if (res[2] != null) {
        this.movimentacoes.push(
          {
            nome: res[0],
            cliente_id: res[1],
            saldo: 0.00,
            conta_id: res[2]
          })

      } else {
        this.movimentacoes.push(
          {
            nome: res[0],
            cliente_id: res[1],
            saldo: 'Sem Movimentação',
            conta_id: res[2]
          })
      }

    });

    clientes.forEach((t) => {
      if (t[2] != null) {
        this.totalGeral += t[2]
        //console.log(t[2])
      }
    })


  }

  public abrirConta(cliente_id) {

    this.contaService.AbrirConta(cliente_id).subscribe(
      (res) => { this.notifierService.notify('success', 'Conta aberta com sucesso!'), this.listarMovimentacoes() }
    );

  }

  public listarMovimentacoes() {
    this.movService.listarClienteSemMovimentacao().subscribe(
      (clientesComSaldoMov: any[]) => this.movService.listarClienteMovimentacao().subscribe(
        (clientesContaFechada: any[]) => this.movService.listarClienteContaSemMovimentacoes().subscribe(
          (clientesNovo: any) => this.populaMovimentacoes(clientesComSaldoMov, clientesContaFechada, clientesNovo)))
    );
  }

  public openModalMovimentacao(movimentacao: any[], template: TemplateRef<any>) {
    this.movimentacaoModalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.movimentacaoModal = movimentacao;
  }

  public cadastrarMovimentacao() {
    this.formulario.controls['cliente_id'].setValue(this.movimentacaoModal['cliente_id'])
    this.formulario.controls['conta_id'].setValue(this.movimentacaoModal['conta_id'])

    if (this.formulario.controls['tipo'].value == 'SAIDA') {
      let valorNeg = -this.formulario.controls['valor'].value;
      this.formulario.controls['valor'].setValue(valorNeg)
    }
    //console.log(this.formulario.getRawValue())
    this.movService.cadastrar(this.formulario.getRawValue()).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Movimentação cadastrada com sucesso!');
        this.formulario.reset();
        this.movimentacaoModalRef.hide();
        this.listarMovimentacoes();
      }, (err) => {
        console.log(err)
      });
  }

  public quitarDivida(movimentacao: any[]) {
    let quitacao: any =
    {
      valor: -(movimentacao['saldo']),
      observacao: `Quitação de dívida. Entrada de: ${-(movimentacao['saldo'])} reais.`,
      tipo: 'ENTRADA',
      cliente_id: movimentacao['cliente_id'],
      conta_id: movimentacao['conta_id']
    }

    this.movService.cadastrar(quitacao).subscribe(
      (res) => {
        this.contaService.fecharConta(movimentacao['conta_id']).subscribe(
          (res) => {
            this.notifierService.notify('success', 'Conta Fechada Com sucesso!')
            this.listarMovimentacoes();
          }, (err) => {
            console.log('Falhar ao fechar conta: <br>/n' + err)
          }
        );
      },(err) => {
        console.log('Falhar ao quitar: <br>/n' + err)
      }
    );


  }

}
