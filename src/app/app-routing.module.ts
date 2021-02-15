import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '@shared/notfound/notfound.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./journal/journal.module').then((m) => m.JournalModule),
  },
  {
    path: 'agency',
    loadChildren: () => import('./agency/agency.module').then((m) => m.AgencyModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then((m) => m.ListsModule),
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
