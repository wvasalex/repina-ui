import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { RefComponent } from './ref.component';

const routes: Routes = [
  {
    path: '',
    component: RefComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'u',
    loadChildren: () => import('./u/u.module').then((m) => m.UModule),
    canActivate: [SessionGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefRoutingModule {
}
