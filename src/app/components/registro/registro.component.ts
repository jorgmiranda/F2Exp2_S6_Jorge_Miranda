import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl  } from '@angular/forms'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  
  registrationForm!: FormGroup;
  listaUsuarios: any[] = JSON.parse(sessionStorage.getItem('usuarios') || '[]');

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void{
    this.registrationForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      fechaNacimientoUsuario: ['', [Validators.required, this.validarEdad.bind(this)]],
      contrasenaUsuario1: ['', [Validators.required, this.validarContrasenaFormato()]],
      contrasenaUsuario2:['', Validators.required],
      direccionDespacho: ''
    },{
      validators: this.validarContrasenasIguales
    })
  }

  registrarUsuario(): void {
    if(this.registrationForm.valid){
      // Se Obtienen los usuarios registrados o inicia un arreglo vacio
      //this.listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
      //Se crea el objeto usuario con los valores del formulario
      const nuevoUsuario = {
        nombreCompleto: this.registrationForm.get('nombreCompleto')!.value,
        nombreUsuario: this.registrationForm.get('nombreUsuario')!.value,
        correo: this.registrationForm.get('correoUsuario')!.value,
        direccionDespacho: this.registrationForm.get('direccionDespacho')!.value,
        contrasena: this.registrationForm.get('contrasenaUsuario1')!.value,
        fechaNacimiento: this.registrationForm.get('fechaNacimientoUsuario')!.value,
        sesionIniciada: false
    };

    //Agregar el usuario registrado al arreglo
    this.listaUsuarios.push(nuevoUsuario);

    sessionStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
    alert("Te has registrado con éxito.");

    console.log("Resultado: "+ this.registrationForm.get('nombreCompleto')!.value);

    this.registrationForm.reset();
    }else{
      alert('Favor de ingregar los campos obligatorios')
    }
   
  }

  validarEdad(control: { value: string }): { [key: string]: boolean } | null {
    if (control.value) {
      const fechaNacimiento = new Date(control.value);
      const edad = this.calcularEdad(fechaNacimiento);
      if (edad < 13) { // Ejemplo: verificar que la persona sea mayor de 13 años
        return { menorDeEdad: true };
      }
    }
    return null;
  }
  
  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      return edad - 1;
    }
    return edad;
  }

  //Validar que las contraseñas sean las mismas
  validarContrasenasIguales(formGroup: FormGroup): { [key: string]: any } | null {
    const contrasena1 = formGroup.get('contrasenaUsuario1')?.value;
    const contrasena2 = formGroup.get('contrasenaUsuario2')?.value;

    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }

  //Validar que tenga una mayuscula y un numero
  validarContrasenaFormato(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si no hay valor, no se aplica la validación
      }

      const regex = /^(?=.*[0-9])(?=.*[A-Z]).{6,18}$/;
      const isValid = regex.test(control.value);

      return isValid ? null : { contrasenaInvalida: true };
    };
  }

  limpiarFormulario(): void {
    this.registrationForm.reset();
   
  }


}
