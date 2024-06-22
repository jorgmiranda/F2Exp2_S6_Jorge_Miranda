import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../model/usuario';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router:Router) { }
  listaProductos: any[] = [];
  listaUsuarios: any[] = [];
  sesionIniciada: boolean = false;
  usuariologeado?: Usuario;


  // Se configura el carrtio de compras en el navbar, ya que el elemnto fue cargado en todas las paginas
  ngOnInit(): void {
    // Permite determinar que el codigo se ejecute en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarCarrito();
      this.listaProductos = JSON.parse(sessionStorage.getItem('listaProductos') || '[]');
      this.listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
      this.instanciarShowHMTL();
      this.verificarSesionUsuario();


    }
  }
  // Configuación que permite visualizar el carrio
  private inicializarCarrito(): void {
    //Configuración del btn Para mostrar el carrito de compras
    const btnCart = document.querySelector('.container-cart-icon') as HTMLElement | null;
    const containerCartProducts = document.querySelector('.container-cart-products') as HTMLElement | null;

    if (btnCart && containerCartProducts) { // Comprobación de null
      btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
      });
    }
  }

  //Configuración que permite visualizar los items en el carrito
  private instanciarShowHMTL() {
    const rowProduct = document.querySelector('.row-product') as HTMLElement | null;
    const valorTotal = document.querySelector('#total-pagar') as HTMLElement | null;
    const contarProductos = document.querySelector('#contador-productos') as HTMLElement | null;
    const cartEmpty = document.querySelector('.cart-empty') as HTMLElement | null;
    const cartTotal = document.querySelector('.cart-total') as HTMLElement | null;
    if (rowProduct && valorTotal && contarProductos && cartEmpty && cartTotal) {
      this.showHtml(rowProduct, valorTotal, contarProductos, cartEmpty, cartTotal);
    }


  }

  //Metodo utilizado para la generación de html en el carrito
  private showHtml(
    rowProduct: HTMLElement,
    valorTotal: HTMLElement,
    contarProductos: HTMLElement,
    cartEmpty: HTMLElement,
    cartTotal: HTMLElement
  ): void {
    if (!this.listaProductos.length) {
      cartEmpty.classList.remove('hidden');
      rowProduct.classList.add('hidden');
      cartTotal.classList.add('hidden');
    } else {
      cartEmpty.classList.add('hidden');
      rowProduct.classList.remove('hidden');
      cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalProductos = 0;

    this.listaProductos.forEach(producto => {
      const containerProduct = document.createElement('div');
      containerProduct.classList.add('cart-product');

      containerProduct.innerHTML = `
        <div class="info-cart-product">
          <span class="cantidad-producto-carrito">${producto.cantidad}</span>
          <p class="titulo-producto-carrito">${producto.titulo}</p>
          <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg width="40" height="40" viewBox="0 0 40 40" class="icon-close">
          <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" />
        </svg>
      `;

      rowProduct.append(containerProduct);

      total += producto.cantidad * parseInt(producto.precio.replace('.', '').replace('$', ''));
      totalProductos += producto.cantidad;
    });

    valorTotal.innerText = `$${numberWithCommas(total)}`;
    contarProductos.innerText = totalProductos.toString();

  }

  verificarSesionUsuario(): void {
    if (this.listaUsuarios) {
      this.listaUsuarios.forEach((usuario) => {
        if (usuario.sesionIniciada) {
          this.sesionIniciada = true;
          this.usuariologeado = usuario;
        }
      });
    }
  }

  cerrarSesion():void{
    if(this.usuariologeado){
      this.usuariologeado.sesionIniciada = false;
      sessionStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.sesionIniciada = false;
      this.usuariologeado = undefined;
      alert("Sesion Cerrada");
      this.router.navigate(['inicio']);
    }
  }
}
function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


