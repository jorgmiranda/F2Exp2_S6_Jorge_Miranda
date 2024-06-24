import { Component } from '@angular/core';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [NavbaradminComponent, FooterComponent],
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.scss'
})
export class InicioAdminComponent {

}
