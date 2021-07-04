import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'ref',
    loadChildren: () => import('./ref/ref.module').then((m) => m.RefModule),
  },
  {
    path: '404',
    loadChildren: () => import('./notfound/notfound.module').then((m) => m.NotfoundModule),
  },
  {
    path: 'sitemap',
    loadChildren: () => import('./sitemap/sitemap.module').then((m) => m.SitemapModule),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
