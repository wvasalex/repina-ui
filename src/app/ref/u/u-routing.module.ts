import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UComponent } from './u.component';
import { InfoComponent } from '../info/info.component';
import { AboutComponent } from '../about/about.component';
import { StatComponent } from '../stat/stat.component';
import { PayComponent } from '../pay/pay.component';

const routes: Routes = [
  {
    path: '',
    component: UComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'stat',
        component: StatComponent,
      },
      {
        path: 'pay',
        component: PayComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class URoutingModule {
}
