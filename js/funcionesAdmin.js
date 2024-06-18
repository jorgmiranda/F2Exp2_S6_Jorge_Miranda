document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los formularios de edición
    const editForms = document.querySelectorAll('.edit-form');

    // Iterar sobre cada formulario de edición
    editForms.forEach(function(form) {
        // Agregar un evento de envío de formulario a cada formulario
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Obtener los valores de los campos del formulario
            const nombre = form.querySelector('#edit-name').value;
            const precio = form.querySelector('#edit-price').value;
            const descripcion = form.querySelector('#edit-description').value;

            // Actualizar la información del producto en la tarjeta
            const card = form.closest('.card-content');
            card.querySelector('.card-title').textContent = nombre;
            card.querySelector('.precio').textContent = 'Precio: $' + numberWithCommas(precio);
            card.querySelector('.descripcion').textContent = descripcion;

            // Mostrar un mensaje de éxito
            alert('La información del producto ha sido actualizada correctamente.');

            // Limpiar los campos del formulario
            
        });
    });
});

function apagarSesionAdmin(){

    alert('Se ha cerrado la sesión');
    window.location.pathname = 'C:/Users/jorgs/Documents/Duoc/Full%20Stack%20ll/S3/Actividad%20Sumativa/inicio.html';
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
