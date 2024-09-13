import { Routes } from '@angular/router';

import {Index2Component} from '../app/components/index2/index2.component'
//import {AppComponent} from '../app/app.component'

export const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'users/list' },
  {
    path: 'pages/index2', component: Index2Component
  },
  {
    path: 'index', redirectTo: 'users/list'
  }
];


