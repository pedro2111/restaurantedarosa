import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Fornecedor } from 'src/app/shared/fornecedores.model';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-fornecedor',
  templateUrl: './home-fornecedor.component.html',
  styleUrls: ['./home-fornecedor.component.css']
})
export class HomeFornecedorComponent implements OnInit {

  constructor(private fornecedorService: FornecedorService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute) { }

  fornecedores: Fornecedor[] = [];



  ngOnInit() {
    this.listar();
  }

  listar() {
    this.fornecedorService.listar()
      .subscribe(
        (res) => {
          this.fornecedores = res;
          //console.log(this.fornecedores)
        }, (err) => {
          console.log(err)
          if (err.status == 403) {
            this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
            setTimeout(() => { this.router.navigate(['/login']) }, 2500);
          }

        });
  }
  deletar(id) {

    this.fornecedorService.deletar(id)
      .subscribe((res) => {
        this.notifierService.notify('error', 'Fornecedor deletado com sucesso!'); //erro warning success info
        this.listar();

      }, (err) => {
        console.log(err)
        if (err.status == 403) {
          this.notifierService.notify('error', 'Seu login expirou!! Entre novamente');
          setTimeout(() => { this.router.navigate(['/login']) }, 2500);
        }
      });
  }
  editar(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }


}
