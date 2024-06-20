import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  listaProductos: any[] = JSON.parse(sessionStorage.getItem('listaProductos') || '[]');

  // Se configura el carrtio de compras en el navbar, ya que el elemnto fue cargado en todas las paginas
  ngOnInit(): void {
    // Permite determinar que el codigo se ejecute en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarCarrito();
      this.listaProductos = JSON.parse(sessionStorage.getItem('listaProductos') || '[]');
      this.instanciarShowHMTL();


    }
  }

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

  private instanciarShowHMTL(){
    const rowProduct = document.querySelector('.row-product') as HTMLElement | null;
    const valorTotal = document.querySelector('#total-pagar') as HTMLElement | null;
    const contarProductos = document.querySelector('#contador-productos') as HTMLElement | null;
    const cartEmpty = document.querySelector('.cart-empty') as HTMLElement | null;
    const cartTotal = document.querySelector('.cart-total') as HTMLElement | null;
    if(rowProduct  && valorTotal && contarProductos && cartEmpty && cartTotal){
      this.showHtml(rowProduct, valorTotal, contarProductos, cartEmpty, cartTotal);
    }
   

  }

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
  
}
function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


