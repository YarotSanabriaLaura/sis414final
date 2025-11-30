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

  // Formulario: cocina es un OBJETO cocina o null
  form: Estufa = {
    marca: '',
    modelo: '',
    tipo: '',
    potencia: 0,
    descripcion: '',
    cocina: null
  };

  editMode = false;
  estufaEditando: Estufa | null = null;

  ngOnInit(): void {
    this.loadCocinas();
    this.loadEstufas();
  }

  loadCocinas(): void {
    this.cocinaService.getAll().subscribe((data) => {
      this.cocinas = data;
    });
  }

  loadEstufas(): void {
    this.estufaService.getAll().subscribe((data) => {
      this.estufas = data;
    });
  }

  crear(): void {
  if (this.editMode) {
    this.guardarEdicion();
    return;
  }

  const body: any = {
    ...this.form,
    cocina: this.form.cocina ? { id: this.form.cocina.id } : null
  };

  this.estufaService.create(body).subscribe(() => {
    this.resetForm();
    this.loadEstufas();
  });
}


  iniciarEdicion(estufa: Estufa): void {
    this.editMode = true;
    this.estufaEditando = { ...estufa };

    this.form = {
      marca: estufa.marca,
      modelo: estufa.modelo,
      tipo: estufa.tipo,
      potencia: estufa.potencia,
      descripcion: estufa.descripcion,
      cocina: estufa.cocina ? { ...estufa.cocina } : null
    };
  }

 guardarEdicion(): void {
  if (!this.estufaEditando) return;

  const body: any = {
    ...this.form,
    cocina: this.form.cocina ? { id: this.form.cocina.id } : null
  };

  this.estufaService.update(this.estufaEditando.id!, body)
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
      marca: '',
      modelo: '',
      tipo: '',
      potencia: 0,
      descripcion: '',
      cocina: null
    };
  }
}
