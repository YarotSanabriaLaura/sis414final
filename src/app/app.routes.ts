import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CocinasComponent } from './pages/cocinas/cocinas.component';
import { EstufasComponent } from './pages/estufas/estufas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cocinas', component: CocinasComponent },
  { path: 'estufas', component: EstufasComponent },
  { path: '**', redirectTo: '' }
];
