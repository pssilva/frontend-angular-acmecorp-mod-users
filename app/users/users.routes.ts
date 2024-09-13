import { Routes } from '@angular/router';

import {UsersTableListComponent} from './componentes/users-list-table/users-list-table.component'
import {UsersLoginComponent} from './componentes/login/login.component'
import {UsersResiterComponent} from './componentes/register/register.component'

export const USERS_ROUTES: Routes = [
  {
    path: 'users/list', component: UsersTableListComponent
  },
  {
    path: 'users/register', component: UsersResiterComponent
  },
  {
    path: 'users/login', component: UsersLoginComponent
  }
];
