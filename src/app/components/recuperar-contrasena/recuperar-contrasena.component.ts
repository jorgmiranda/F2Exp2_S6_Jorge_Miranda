import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms'; 

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.scss'
})
export class RecuperarContrasenaComponent {
  recuperarCorreo!: FormGroup;
  listaUsuarios: any[] = [];

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void{
    this.recuperarCorreo = this.fb.group({
      correoValidacion: ['', [Validators.required, Validators.email]]
    });
    this.listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
  }

  recuperarContrasena(){
    if(this.recuperarCorreo.valid){
      const correo = this.recuperarCorreo.get('correoValidacion')!.value;
      let contrasenaEncontrada = '';
      if(this.listaUsuarios){
        this.listaUsuarios.forEach(function (usuario) {
          if (usuario.correo == correo) {
            contrasenaEncontrada = usuario.contrasena;
          }
      });
      if(contrasenaEncontrada != ''){
          alert('Su Contraseña es: '+ contrasenaEncontrada);
      }else{
          alert('El correo ingresado no existe');
      }

      }else{
        alert('El correo ingresado no existe');
      }
    }
  }

}
