/*Configuración de btn para mostrar las compras*/ 
const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/*============================= Funcionalidades carrito =========================*/ 
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de productos
const productList = document.querySelector('.card-container');

// Variable de arreglos de productos
let listaProductos = JSON.parse(sessionStorage.getItem('listaProductos')) || [];

const valorTotal = document.querySelector('#total-pagar');
const contarProductos = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//formateo de numeros
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

productList,addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const producto = e.target.parentElement;
        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio').textContent.replace('Precio: ','')
        };

        const exists = listaProductos.some(producto => producto.titulo === infoProducto.titulo);
        if(exists){
            const productos = listaProductos.map(producto => {
                if(producto.titulo === infoProducto.titulo){
                    producto.cantidad++;
                    return producto
                }else{
                    return producto
                }
            })
            listaProductos = [...productos]
        }else{
            listaProductos = [...listaProductos, infoProducto]
        }
        sessionStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        
        showHtml()
    }
    
});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        listaProductos = listaProductos.filter(
            producto => producto.titulo !== titulo
        );

        sessionStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        showHtml()
        console.log(listaProductos)
    }
});

//Funcion para mostrar html
const showHtml = () =>{

    if(!listaProductos.length){
        cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
        
    }else{
        cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
    }

    //limpiar html
    rowProduct.innerHTML = '';

    let total = 0;
    let totalProductos = 0;

    listaProductos.forEach(producto => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="titulo-producto-carrito">${producto.titulo}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg width="40" height="40" viewbox="0 0 40 40" class="icon-close">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" />
        </svg>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1).replace('.',''))
        totalProductos = totalProductos + producto.cantidad;
    });
    
    valorTotal.innerText = `$${numberWithCommas(total)}`;
    contarProductos.innerText = totalProductos;
}

/*============================= Verificar sesión =========================*/ 

// Elementos que solo puede ver un usuario logeado
const editarPerfil = document.querySelector('.editarPerfil');
const cerrarSesion = document.querySelector('.cerrarSesion');
const cerrarSesionSep = document.querySelector('.cerrarSesion-sep');
const mensajeInicio = document.querySelector('.mensaje');
const menuUsuario = document.querySelector('.menu-usuario');
//Elementos que solo puede ver un usuario no logeado
const inicioSesion = document.querySelector('.incioSesion');
const registro = document.querySelector('.registro');
const recuerparContra = document.querySelector('.recuperarContra');
// Listado de usuarios llenado en el registro
const listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios'));
let sesionIniciada = false;
let usuariologeado = false;

if(listaUsuarios){
    listaUsuarios.forEach(function(usuario){
        if(usuario.sesionIniciada){
            sesionIniciada = true;
            usuariologeado = usuario;
        }
    });

    if(sesionIniciada){
        inicioSesion.classList.add('hidden');
        registro.classList.add('hidden');
        recuerparContra.classList.add('hidden');
        if(mensajeInicio){
            mensajeInicio.textContent = 'Bienviendo '+ usuariologeado.nombreCompleto;
        }
        menuUsuario.textContent = 'Usuario: ' + usuariologeado.nombreUsuario;

        menuUsuario.classList.remove('hidden');
        editarPerfil.classList.remove('hidden');
        cerrarSesion.classList.remove('hidden');
        cerrarSesionSep.classList.remove('hidden');
    }else{
        inicioSesion.classList.remove('hidden');
        registro.classList.remove('hidden');
        recuerparContra.classList.remove('hidden');
        if(mensajeInicio){
            mensajeInicio.textContent = 'Contenido principal de la página.....';
        }

        menuUsuario.classList.add('hidden');
        editarPerfil.classList.add('hidden');
        cerrarSesion.classList.add('hidden');
        cerrarSesionSep.classList.add('hidden');
    }
}else{
    editarPerfil.classList.add('hidden');
    cerrarSesion.classList.add('hidden');
    cerrarSesionSep.classList.add('hidden');
}


/*============================= Cerrar Sesión =========================*/ 
function apagarSesion(){
    if(listaUsuarios){
        listaUsuarios.forEach(function(usuario){
            if(usuario.sesionIniciada){
                usuario.sesionIniciada = false;
                sessionStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
            }
        });
        alert('Se ha cerrado la sesión');
        window.location.pathname = 'C:/Users/jorgs/Documents/Duoc/Full%20Stack%20ll/S3/Actividad%20Sumativa/inicio.html';
    }
}

/*============================= Cargar el carrito =========================*/ 
showHtml();