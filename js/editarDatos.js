// Se obtiene la lista de usuarios en el sesion storage
let listaUsuariosEditar = JSON.parse(sessionStorage.getItem('usuarios'));
let nombreusuario = '';
// Se verifica que el usuario ese logeado
if(listaUsuariosEditar){
    let usuarioActual = null;
    listaUsuariosEditar.forEach(function(usuario){
        if(usuario.sesionIniciada){
            usuarioActual = usuario;
        }
    });

    if(usuarioActual){
        //Se guarda el nombre de usuario en memoria
        nombreusuario = usuarioActual.nombreUsuario;
        //Se poblan los campos del formulario
        var nombreCompleto = document.getElementById("nombreCompleto");
        nombreCompleto.value = usuarioActual.nombreCompleto;

        var correoUsuario = document.getElementById("correoUsuario");
        correoUsuario.value = usuarioActual.correo;

        var fechaNacimientoUsuario = document.getElementById("fechaNacimientoUsuario");
        fechaNacimientoUsuario.value = usuarioActual.fechaNacimiento;

        var contrasenaUsuario1 = document.getElementById("contrasenaUsuario1");
        contrasenaUsuario1.value = usuarioActual.contrasena;

        var contrasenaUsuario2 = document.getElementById("contrasenaUsuario2");
        contrasenaUsuario2.value = usuarioActual.contrasena;

        var direccionDespacho = document.getElementById("direccionDespacho");
        direccionDespacho.value = usuarioActual.direccionDespacho;

    }else{
        console.log(' oh no');
    }
}

/*============================= Actualizar Datos Usuario =========================*/ 
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    //Obtencion de valores del formulario
    const nombreCompleto = document.getElementById('nombreCompleto').value;
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

        //Busca si el usuario existe
        let usuarioExistente = listaUsuariosEditar.find(usuario => usuario.nombreUsuario === nombreusuario);

        if (usuarioExistente) {
            // Actualizar el usuario existente
            usuarioExistente.nombreCompleto = nombreCompleto;
            usuarioExistente.correo = correo;
            usuarioExistente.direccionDespacho = direccionDespacho;
            usuarioExistente.contrasena = contrasena1;
            usuarioExistente.fechaNacimiento = fechaNacimiento;
            usuarioExistente.sesionIniciada = true;
        } 
        
        sessionStorage.setItem('usuarios', JSON.stringify(listaUsuariosEditar));

        
        alert("Usuario registrado/actualizado con éxito.");
        location.reload();
    }
});
