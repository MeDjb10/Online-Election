import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,RouterOutlet],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
