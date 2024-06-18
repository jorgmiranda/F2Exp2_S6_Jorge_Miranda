document.getElementById('recuperarCorreo').addEventListener('submit', function(event) {
    var correo = document.getElementById("correoValidacion").value;

    const listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    let contrasnaEncontrada = '';
    if(listaUsuarios){
        listaUsuarios.forEach(function (usuario) {
            if (usuario.correo == correo) {
                contrasnaEncontrada = usuario.contrasena;
            }
        });
        if(contrasnaEncontrada != ''){
            alert('Su Contraseña es: '+ contrasnaEncontrada);
        }else{
            alert('El correo ingresado no existe');
        }
    }else{
        alert('El correo ingresado no existe');
    }

});