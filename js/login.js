function validar() {
    var username = document.getElementById("nombreCompleto").value;
    var password = document.getElementById("contrasenaUsuario").value;
    let isadmin = false;

    const listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    //Se verifica si existe usuarios en memoria
    try {
        if (listaUsuarios) {
            listaUsuarios.forEach(function (usuario) {
                if (usuario.nombreUsuario == username) {
                    if (usuario.contrasena == password) {
                        alert('Sesión iniciada!');
                        usuario.sesionIniciada = true;
                        sessionStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

                        throw new Error('Salida del bucle');

                    } else {
                        alert('La contraseña es incorrecta');
                        throw new Error('Salida del bucle');
                    }
                } else {
                    if (username == 'Administrador' && password == '123.pass') {
                        isadmin = true;
                    } else {
                        alert('El usuario no esta registrado');
                        throw new Error('Salida del bucle');
                    }
                }
            });
            if (isadmin) {
                alert('Sesión iniciada como Administrador!');
                window.location.pathname = 'C:/Users/jorgs/Documents/Duoc/Full%20Stack%20ll/S3/Actividad%20Sumativa/admin/inicio.html';
                return false;
            }
        } else {
            if (username == 'Administrador' && password == '123.pass') {
                alert('Sesión iniciada como Administrador!');
                window.location.pathname = 'C:/Users/jorgs/Documents/Duoc/Full%20Stack%20ll/S3/Actividad%20Sumativa/admin/inicio.html';
                return false;
            } else {
                alert('El usuario no esta registrado');
            }



        }
    } catch (error) {
        if (error.message !== 'Salida del bucle') {
            throw error;
        } else {
            window.location.pathname = 'C:/Users/jorgs/Documents/Duoc/Full%20Stack%20ll/S3/Actividad%20Sumativa/inicio.html';
            return false;

        }
    }


}