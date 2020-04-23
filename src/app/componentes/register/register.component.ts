import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService, private router:Router, private notifierService: NotifierService) { }

  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  });

  errors = [];
  erroNome:string;
  erroEmail:string;
  erroSenha:string;

  ngOnInit() {
  }

  cadastrar(){
    let usuario:Usuario = this.formulario.getRawValue();

    this.loginService.cadastrar(usuario).subscribe((res) => {
      
      this.notifierService.notify("success", "Usuário cadastrado com sucesso!!");
      setTimeout(()=>{this.router.navigate(['/login'])},2000)
      
    },(err) => {
      this.erroNome = '';
      this.erroEmail = '';
      this.erroSenha = '';
      this.errors = err['error'];
      this.errors.forEach((e) => {
        if(e['campo'] == 'nome'){
          this.erroNome = e['campo'] +' '+ e['erro'];
        }
        if(e['campo'] == 'email'){
          this.erroEmail = e['campo'] +' '+ e['erro'];
        }
        if(e['campo'] == 'senha'){
          this.erroSenha = e['campo'] +' '+ e['erro'];
        }
      }
      );

    }
    );
    

  }

}
