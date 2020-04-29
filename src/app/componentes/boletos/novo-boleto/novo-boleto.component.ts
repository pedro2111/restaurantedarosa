import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Boleto } from 'src/app/shared/boleto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService, BsDatepickerDirective,DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker'
import { Categoria } from 'src/app/shared/categoria.model';
import { Fornecedor } from 'src/app/shared/fornecedores.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import * as moment from 'moment';
import { BoletoService } from 'src/app/services/boleto.service';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-novo-boleto',
  templateUrl: './novo-boleto.component.html',
  styleUrls: ['./novo-boleto.component.css']
})
export class NovoBoletoComponent implements OnInit {

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bsLocaleService: BsLocaleService,
    private categoriaService: CategoriaService,
    private fornecedorService: FornecedorService,
    private boletoService: BoletoService,
    private notifierService: NotifierService
  ) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        isAnimated: true,
        showWeekNumbers: false,
        dateInputFormat: 'DD-MM-YYYY'
      });
  }

  boleto: Boleto;
  dtAtual = moment().format("YYYY-MM-DD");
  dataVencimento;
  categorias: Categoria[];
  fornecedores: Fornecedor[];

  formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, [Validators.required]),
    'dtCriacao': new FormControl(this.dtAtual),
    'nomeCategoria': new FormControl(null, [Validators.required]),
    'nomeUsuario': new FormControl(null),
    'nomeFornecedor': new FormControl(null, [Validators.required]),
    'status': new FormControl('NAO_PAGO'),
    'dtVencimento': new FormControl(null, [Validators.required]),
    'valor': new FormControl(null, [Validators.required])

  })

  ngOnInit() {
    this.bsLocaleService.use('ptbr')
    this.boleto = this.route.snapshot.data['boletoR'];
    this.carregaForm(this.boleto)
    this.categoriaService.listar().subscribe((res) => this.categorias = res);
    this.fornecedorService.listar().subscribe((res) => this.fornecedores = res);
  }

  cadastrar() {
    this.dataVencimento = this.formulario.controls['dtVencimento'].value;
    let dtVenc = moment(this.dataVencimento).format("YYYY-MM-DD");
    this.formulario.controls['nomeUsuario'].setValue(localStorage.getItem('nomeUsuario'));
    this.formulario.controls['dtVencimento'].setValue(dtVenc);
    this.formulario.controls['dtCriacao'].setValue(this.dtAtual);
    this.formulario.controls['status'].setValue('NAO_PAGO');

    let boletoForm: Boleto = this.formulario.getRawValue();

    if (this.boleto.id == null) {
      this.boletoService.cadastrar(boletoForm).subscribe(
        (res) => {
          this.notifierService.notify('success', 'Boleto Cadastrado com sucesso!!');
          setTimeout(() => { this.router.navigate(['/dashboard/boletos']) }, 2000)
        }, (err) => {
          this.error403(err)
        }
      );

    } else {
      this.boletoService.atualizar(this.boleto.id, boletoForm).subscribe(
        (res) => {
          this.notifierService.notify('success', 'Boleto atualizado com sucesso');
          setTimeout(() => { this.router.navigate(['/dashboard/boletos']) }, 2000)
        }, (err) => {
          this.error403(err)
        }
      );

    }
  }
  carregaForm(b: Boleto) {
    let dataFormatada = moment(b.dtVencimento).format("DD-MM-YYYY")
    //console.log(dataFormatada)
    this.formulario.patchValue({
      id: b.id,
      nome: b.nome,
      nomeCategoria: b.nomeCategoria,
      nomeFornecedor: b.nomeFornecedor,
      nomeUsario: b.nomeUsuario,
      status: b.status,
      dtCriacao: b.dtCriacao,
      dtVencimento: dataFormatada,
      valor: b.valor
    });

  }
  error403(err) {
    console.log(err);

    if (err.status == 403) {
      this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
      setTimeout(() => { this.router.navigate(['/login']) }, 2000);
    }
  }




}
