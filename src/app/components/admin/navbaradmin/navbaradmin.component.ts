import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbaradmin',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbaradmin.component.html',
  styleUrl: './navbaradmin.component.scss'
})
export class NavbaradminComponent {

  constructor(private router:Router) { }


  apagarSesionAdmin(){
      alert("Se ha cerrado la sesion");
      this.router.navigate(['inicio']);
  }

}
