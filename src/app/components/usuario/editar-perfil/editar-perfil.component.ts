import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {

  updateForm!: FormGroup;
  listaUsuarios: any[] = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
  usuariologeado?: Usuario;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    if (this.usuariologeado) {
      this.updateForm = this.fb.group({
        nombreCompleto: [this.usuariologeado.nombreCompleto, Validators.required],
        correoUsuario: [this.usuariologeado.correo, [Validators.required, Validators.email]],
        fechaNacimientoUsuario: [this.usuariologeado.fechaNacimiento, [Validators.required, this.validarEdad.bind(this)]],
        contrasenaUsuario1: [this.usuariologeado.contrasena, [Validators.required, this.validarContrasenaFormato()]],
        contrasenaUsuario2: [this.usuariologeado.contrasena, Validators.required],
        direccionDespacho: this.usuariologeado.direccionDespacho
      }, {
        validators: this.validarContrasenasIguales
      });
    }
  }


  actualizarUsuario(): void {
    if (this.updateForm.valid && this.usuariologeado) {
      const nombreUsuario = this.usuariologeado.nombreUsuario;
      const valoresFormulario = this.updateForm.value;
      this.usuariologeado.nombreCompleto = valoresFormulario.nombreCompleto;
      this.usuariologeado.correo = valoresFormulario.correoUsuario;
      this.usuariologeado.fechaNacimiento = valoresFormulario.fechaNacimientoUsuario;
      this.usuariologeado.contrasena = valoresFormulario.contrasenaUsuario1;
      this.usuariologeado.direccionDespacho = valoresFormulario.direccionDespacho;

      const index = this.listaUsuarios.findIndex(usuario => usuario.nombreUsuario === nombreUsuario);
      if (index !== -1) {
        this.listaUsuarios[index] = this.usuariologeado;
        sessionStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      }

      alert('Usuario actualizado correctamente.');


    } else {
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

  private obtenerUsuario() {
    this.listaUsuarios.forEach((usuario) => {
      if (usuario.sesionIniciada) {
        this.usuariologeado = usuario;
      }
    });

  }

}
