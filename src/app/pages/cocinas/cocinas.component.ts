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

  // Formulario
  nuevaCocina: Cocina = { id: 0, nombre: '', ubicacion: '' };

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

    this.cocinaService.create(this.nuevaCocina).subscribe(() => {
      this.nuevaCocina = { id: 0, nombre: '', ubicacion: '' };
      this.cargarCocinas();
    });
  }

  iniciarEdicion(cocina: Cocina): void {
    this.editMode = true;
    this.cocinaEditando = { ...cocina }; 
    this.nuevaCocina = { ...cocina };
  }

  guardarEdicion(): void {
    if (!this.cocinaEditando) return;

    this.cocinaService.update(this.cocinaEditando.id!, this.nuevaCocina)
      .subscribe(() => {
        this.editMode = false;
        this.cocinaEditando = null;
        this.nuevaCocina = { id: 0, nombre: '', ubicacion: '' };
        this.cargarCocinas();
      });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.cocinaEditando = null;
    this.nuevaCocina = { id: 0, nombre: '', ubicacion: '' };
  }

  eliminarCocina(id: number): void {
    this.cocinaService.delete(id).subscribe(() => {
      this.cargarCocinas();
    });
  }
}
