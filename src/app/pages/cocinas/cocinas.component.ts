import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../commons/menu/menu.component';
import { CocinaService } from '../../services/cocina.service';
import { Cocina } from '../../models/cocina';

@Component({
  selector: 'app-cocinas',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './cocinas.component.html',
  styleUrls: ['./cocinas.component.css'],
})
export class CocinasComponent implements OnInit {

  private cocinaService = inject(CocinaService);

  cocinas: Cocina[] = [];

  // Formulario SIN ID (esto es lo que soluciona el error)
  nuevaCocina: Cocina = { nombre: '', ubicacion: '' };

  // Modo edición
  editMode = false;
  cocinaEditando: Cocina | null = null;

  ngOnInit(): void {
    this.cargarCocinas();
  }

  cargarCocinas(): void {
    this.cocinaService.getAll().subscribe((data: Cocina[]) => {
      this.cocinas = data;
    });
  }

  crearCocina(): void {
    if (this.editMode) {
      this.guardarEdicion();
      return;
    }

    // Crear cocina
    this.cocinaService.create(this.nuevaCocina).subscribe(() => {
      this.nuevaCocina = { nombre: '', ubicacion: '' }; // limpio sin ID
      this.cargarCocinas();
    });
  }

  iniciarEdicion(cocina: Cocina): void {
    this.editMode = true;
    this.cocinaEditando = { ...cocina };
    this.nuevaCocina = { nombre: cocina.nombre, ubicacion: cocina.ubicacion };
  }

  guardarEdicion(): void {
    if (!this.cocinaEditando) return;

    this.cocinaService.update(this.cocinaEditando.id!, this.nuevaCocina)
      .subscribe(() => {
        this.editMode = false;
        this.cocinaEditando = null;
        this.nuevaCocina = { nombre: '', ubicacion: '' }; // limpio sin ID
        this.cargarCocinas();
      });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.cocinaEditando = null;
    this.nuevaCocina = { nombre: '', ubicacion: '' };
  }

  eliminarCocina(id: number): void {
    this.cocinaService.delete(id).subscribe(() => {
      this.cargarCocinas();
    });
  }
}
