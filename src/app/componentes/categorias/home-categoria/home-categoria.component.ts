import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/shared/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.css']
})
export class HomeCategoriaComponent implements OnInit {

  categorias:Categoria[] = [];

  constructor(private categoriaService: CategoriaService, 
    private router:Router,
    private notifierService:NotifierService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.categoriaService.listar()
    .subscribe(
      (categorias) => {
        this.categorias = categorias;
      },(err) => {
        this.error403(err);
      }
    );
  }

  editar(id){
    this.router.navigate(['editar', id], {relativeTo: this.route });
  }

  deletar(id){
    this.categoriaService.deletar(id)
    .subscribe(
      (cat) => {
        this.notifierService.notify('error', 'Categoria deletada com sucesso!!');
        this.listar();
      },(err) => {
        this.error403(err);

      }

    );
  }

  error403(err) {
    console.log(err);

    if (err.status == 403) {
      this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
      setTimeout(() => { this.router.navigate(['/login']) }, 2500);
    }
  }


}
