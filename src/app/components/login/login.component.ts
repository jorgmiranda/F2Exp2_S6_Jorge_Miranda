import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms'; 

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

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void{
    this.login = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required]
    });
  
  }

  iniciarSesion(){
    if(this.login.valid){
      alert("Sesión iniciada");
    }
  }
}
