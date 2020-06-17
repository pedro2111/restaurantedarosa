import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private clienteService: ClienteService
  ) { }

  cliente: Cliente;

  formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, [Validators.required])
  });

  ngOnInit() {

    this.cliente = this.route.snapshot.data['clienteR']

    this.carregaForm(this.cliente)
  }

  cadastrar() {
    let clienteform = this.formulario.getRawValue();

    if (this.cliente.id == null) {

      this.clienteService.cadastrar(clienteform).subscribe(
        (res) => {
          this.notifierService.notify('success', 'Cliente Cadastrado com sucesso!')
          setTimeout(() => { this.router.navigate(['/dashboard/clientes']) }, 2500)
        },
        (err) => { this.error403(err) }
      );

    } else {
      this.clienteService.atualizar(this.cliente.id, clienteform).subscribe(
        (res) => {
          this.notifierService.notify('success', 'Cliente atualizado com sucesso!')
          setTimeout(() => { this.router.navigate(['/dashboard/clientes']) }, 2500)
        },
        (err) => { this.error403(err) }
      );


    }

  }

  carregaForm(cliente: Cliente) {

    this.formulario.patchValue({
      id: cliente.id,
      nome: cliente.nome
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
