import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation,  HostListener, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{

  listaProductos: any[] = [];
  listaUsuarios: any[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  usuariologeado?: Usuario;
  sesionIniciada: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.listaProductos = JSON.parse(sessionStorage.getItem('listaProductos') || '[]');
      this.listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
      this.funcionalidadCarrito();
      this.verificarUsuario();

    }
  }
  /// Funcionalidad de eliminar items del carrito en esta pagina
  private funcionalidadCarrito(): void {
    const cartInfo = document.querySelector('.cart-product') as HTMLElement | null;
    const rowProduct = document.querySelector('.row-product') as HTMLElement | null;
    const productList = document.querySelector('.card-container') as HTMLElement | null;
    const valorTotal = document.querySelector('#total-pagar') as HTMLElement | null;
    const contarProductos = document.querySelector('#contador-productos') as HTMLElement | null;
    const cartEmpty = document.querySelector('.cart-empty') as HTMLElement | null;
    const cartTotal = document.querySelector('.cart-total') as HTMLElement | null;

    if (rowProduct  && valorTotal && contarProductos && cartEmpty && cartTotal) {
      rowProduct.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('icon-close')) {
          const producto = (e.target as HTMLElement).parentElement as HTMLElement;
          const titulo = (producto.querySelector('p') as HTMLElement).textContent || '';

          this.listaProductos = this.listaProductos.filter(
            producto => producto.titulo !== titulo
          );

          sessionStorage.setItem('listaProductos', JSON.stringify(this.listaProductos));
          this.showHtml(rowProduct, valorTotal, contarProductos, cartEmpty, cartTotal);
          console.log(this.listaProductos);
        }
      });
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

  private verificarUsuario(){
    this.listaUsuarios.forEach((usuario) => {
      if (usuario.sesionIniciada) {
        this.usuariologeado = usuario;
        
        this.sesionIniciada = true;

      }
    });
  
  }
}

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

