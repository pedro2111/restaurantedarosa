import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/shared/categoria.model';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) { }

  formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, [Validators.required])
  });

  categoria: Categoria;

  ngOnInit() {

    this.categoria = this.route.snapshot.data['categoriaR'];
    this.carregaForm(this.categoria);
  }

  cadastrar() {
    let cat: Categoria = this.formulario.getRawValue();

    if (this.categoria.id == null) {
      this.categoriaService.cadastrar(cat)
        .subscribe(
          (cat) => {
            this.notifierService.notify('success', 'Categoria cadastrada com sucesso!!');
            setTimeout(() => { this.router.navigate(['/dashboard/categorias']) }, 2000);

          }, (err) => {
            this.error403(err);
          }
        );
    }else{
      this.categoriaService.atualizar(this.categoria.id, cat)
      .subscribe(
        (res) => {
          this.notifierService.notify('success', 'Categoria atualizada com sucesso!!');
            setTimeout(() => { this.router.navigate(['/dashboard/categorias']) }, 2000);

        },(err) => {
          this.error403(err)
        }
      );
    }




  }

  carregaForm(cat: Categoria) {
    this.formulario.patchValue({
      id: cat.id,
      nome: cat.nome
    })
  }
  error403(err) {
    console.log(err);

    if (err.status == 403) {
      this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
      setTimeout(() => { this.router.navigate(['/login']) }, 2000);
    }
  }

}
