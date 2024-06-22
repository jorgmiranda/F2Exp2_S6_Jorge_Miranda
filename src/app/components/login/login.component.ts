import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,  ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login!: FormGroup;
  listaUsuarios: any[] = JSON.parse(sessionStorage.getItem('usuarios') || '[]');

  constructor (private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void{
    this.login = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required]
    });
  
  }

  iniciarSesion(){
    if(this.login.valid){
      const nombreUsuario = this.login.get('nombreUsuario')!.value;
      const contrasena = this.login.get('contrasenaUsuario')!.value;
      if(this.listaUsuarios){
        let usuarioLogeado = false;
        this.listaUsuarios.forEach(function (usuario){
          if(usuario.nombreUsuario == nombreUsuario){
            if(usuario.contrasena == contrasena){
              usuario.sesionIniciada = true;
              usuarioLogeado = true;
              
            }
          }
        });

        if(usuarioLogeado){
          alert('Sesión iniciada!');
          sessionStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
          this.router.navigate(['inicio']);
        }else{
          alert("El nombre de usuario o la contraseña es incorrecta");
        }
      }else{
        alert("El nombre de usuario o la contraseña es incorrecta");
      }

    }else{
      alert("Favor de completar los campos obligatorios");
    }
  }
}
