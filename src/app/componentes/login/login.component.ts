import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/shared/usuario.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:boolean;

  constructor(private loginService: LoginService, private router: Router) { }

  formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    localStorage.clear();

  }
  login(){
    let usuario: Usuario;
    usuario = this.formulario.getRawValue();
    this.loginService.login(usuario).subscribe((res) =>{
      let token_decode = jwt_decode(res['token'])
      localStorage.setItem('nomeUsuario',token_decode['usuario']);
      localStorage.setItem('token',res['token']);
      localStorage.setItem('usuario',usuario.email);
      this.error = false;
      this.router.navigate(['/dashboard']).then(() => {window.location.reload();})

      
    }, (err) => {
      console.log(err);
      //console.log('validacao' + this.formulario.get('email').valid)
      this.error = true;
      if(err.status === 401){
        this.router.navigate(['/login'])
      }
    }
    );
  

  }



}
