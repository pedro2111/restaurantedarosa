import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Fornecedor } from 'src/app/shared/fornecedores.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-novo-fornecedor',
  templateUrl: './novo-fornecedor.component.html',
  styleUrls: ['./novo-fornecedor.component.css']
})
export class NovoFornecedorComponent implements OnInit {

  constructor(private fornecedorService: FornecedorService,
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute
    ) { }

  formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, [Validators.required])
  });
 
  fornecedor:Fornecedor;
 

  ngOnInit() {

    this.fornecedor = this.route.snapshot.data['fornecedor'];

    this.carregaForm(this.fornecedor);

    /*
    this.route.params
    .pipe(
      map((params) => {params['id']}),
      switchMap(id => this.fornecedorService.listarById(id))
      )
      .subscribe(fornecedor => this.carregaForm(fornecedor));

      --------------------------------------fazem as mesmas coisas porem de forma diferente. tudo issso substituido pelo resolver
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.fornecedorService.listarById(id)
        .subscribe((res) => {
          this.carregaForm(res)
        });
      }
    );
*/


  }
  
  cadastrar() {
    let fornecedorForm: Fornecedor = this.formulario.getRawValue();

    
    if(this.fornecedor.id == null){
      this.fornecedorService.cadastrar(fornecedorForm)
      .subscribe(
        (res) => {
          this.notifierService.notify('success', 'Fornecedor cadastrado com sucesso!');
          setTimeout(() => { this.router.navigate(['/dashboard/fornecedores']) }, 2500);
        }, (err) => {
          console.log(err)
          if(err.status == 403){
            this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
            setTimeout(() => { this.router.navigate(['/login']) }, 2500);          
          }
        }
      );

    }else{
      this.fornecedorService.atualizar(this.fornecedor.id,fornecedorForm)
      .subscribe(
        (res) => {
          this.notifierService.notify('success', 'Fornecedor atualizado com sucesso!');
          setTimeout(() => { this.router.navigate(['/dashboard/fornecedores']) }, 2500);
        },(err) => {
          console.log(err)
          if(err.status == 403){
            this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
            setTimeout(() => { this.router.navigate(['/login']) }, 2500);          
          }
        }
      );
    }

  }
  carregaForm(fornecedor:Fornecedor){
    this.formulario.patchValue({
      id: fornecedor.id,
      nome: fornecedor.nome
    })

  }
  

}
