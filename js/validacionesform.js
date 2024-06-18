document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    //Obtencion de valores del formulario
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const correo = document.getElementById('correoUsuario').value;
    const direccionDespacho = document.getElementById('direccionDespacho').value;
    const contrasena1 = document.getElementById('contrasenaUsuario1').value;
    const contrasena2 = document.getElementById('contrasenaUsuario2').value;
    const fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value;

    if (!contrasena1 || contrasena1 !== contrasena2) {
        alert('Las contraseñas no coinciden');
        isValid = false;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z]).{6,18}$/;
    if (!passwordPattern.test(contrasena1)) {
        alert('La contraseña debe contener al menos un número y una letra en mayúscula.');
        isValid = false;
    }

    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    if (edad < 13) {
        alert('Debes tener al menos 13 años para registrarte en este sitio.');
        isValid = false;
    }
    
    if (isValid) {
        // Obtiene usuarios registrados o inicia el arreglo vacio
        let usuariosRegistrados = JSON.parse(sessionStorage.getItem('usuarios')) || [];
        // Se crea el objeto usuario
        const nuevoUsuario = {
            nombreCompleto: nombreCompleto,
            nombreUsuario: nombreUsuario,
            correo: correo,
            direccionDespacho: direccionDespacho,
            contrasena: contrasena1,
            fechaNacimiento: fechaNacimiento,
            sesionIniciada: false
        };
        
        // Agregar el nuevo usuario al arreglo
        usuariosRegistrados.push(nuevoUsuario);

        sessionStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        
        alert("Te has registrado con éxito.");
        limpiarFormulario();

        //document.getElementById('registrationForm').submit();
    }
});

function limpiarFormulario() {
    document.getElementById("registrationForm").reset();
}

