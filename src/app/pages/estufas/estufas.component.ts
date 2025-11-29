import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../commons/menu/menu.component';
import { EstufaService } from '../../services/estufa.service';
import { CocinaService } from '../../services/cocina.service';
import { Estufa } from '../../models/estufa';
import { Cocina } from '../../models/cocina';

@Component({
  selector: 'app-estufas',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './estufas.component.html',
  styleUrls: ['./estufas.component.css'],
})
export class EstufasComponent implements OnInit {

  private estufaService = inject(EstufaService);
  private cocinaService = inject(CocinaService);

  estufas: Estufa[] = [];
  cocinas: Cocina[] = [];

  // Formulario
  form: Estufa = {
    id: 0,
    marca: '',
    modelo: '',
    tipo: '',
    potencia: 0,
    descripcion: '',
    cocina: null
  };

  // Modo edición
  editMode = false;
  estufaEditando: Estufa | null = null;

  ngOnInit(): void {
    this.loadCocinas();
    this.loadEstufas();
  }

  loadCocinas(): void {
    this.cocinaService.getAll().subscribe((data: Cocina[]) => {
      this.cocinas = data;
    });
  }

  loadEstufas(): void {
    this.estufaService.getAll().subscribe((data: Estufa[]) => {
      this.estufas = data;
    });
  }

  crear(): void {
    if (this.editMode) {
      this.guardarEdicion();
      return;
    }

    this.estufaService.create(this.form).subscribe(() => {
      this.resetForm();
      this.loadEstufas();
    });
  }

  iniciarEdicion(estufa: Estufa): void {
    this.editMode = true;
    this.estufaEditando = { ...estufa };

    this.form = {
      id: estufa.id!,
      marca: estufa.marca,
      modelo: estufa.modelo,
      tipo: estufa.tipo,
      potencia: estufa.potencia,
      descripcion: estufa.descripcion,
      cocina: estufa.cocina
    };
  }

  guardarEdicion(): void {
    if (!this.estufaEditando) return;

    this.estufaService.update(this.estufaEditando.id!, this.form)
      .subscribe(() => {
        this.editMode = false;
        this.estufaEditando = null;
        this.resetForm();
        this.loadEstufas();
      });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.estufaEditando = null;
    this.resetForm();
  }

  eliminar(estufa: Estufa): void {
    if (!estufa.id) return;

    this.estufaService.delete(estufa.id).subscribe(() => {
      this.loadEstufas();
    });
  }

  resetForm(): void {
    this.form = {
      id: 0,
      marca: '',
      modelo: '',
      tipo: '',
      potencia: 0,
      descripcion: '',
      cocina: null
    };
  }
}
