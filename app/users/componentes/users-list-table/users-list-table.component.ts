import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppHeaderComponent } from '../../../components/app-header/app-header.component'
import { AppSidebarComponent } from '../../../components/app-sidebar/app-sidebar.component'
import { AppMainComponent } from '../../../components/app-main/app-main.component'
import { AppFooterComponent } from '../../../components/app-footer/app-footer.component'
import { TagHeadComponent } from '../../../shared/components/list-table/tag-head/tag-head.component'
import { Users } from '../../model/users';
import { UsersListTableService } from '../../services/users-list-table.service';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { UsersPage } from '../../model/users-page';
import { UsersResponseDTO } from '../../model/usersResponseDTO';

@Component({
  selector: 'list-table-users',
  standalone: true,
  imports: [AppHeaderComponent
    ,AppSidebarComponent,
    AppMainComponent,
    AppFooterComponent,
    TagHeadComponent,
    RouterOutlet,
    CommonModule,
    MatIconModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  templateUrl: './users-list-table.component.html',
  styleUrl: './users-list-table.component.scss'
})
export class UsersTableListComponent implements OnInit {
  
  title = "AcmeCorp | Listagem Usuários";
  user:UsersResponseDTO = {
    "id": "f9c1fbbe-69cf-459e-a302-44d8a10e9459",
    "name": "paulo xpto 11111 atualização pelo navegador uuuuuuuu 18:00",
    "email": "xpto11111@gmail.com",
    "pass_hash": "11111"
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  @Input() aUsers: Users[] = [];

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  @Input() usersPages: UsersPage[] | undefined = [];

  users$: Observable<UsersPage> | null=null;
  constructor(
    private usersListTableService: UsersListTableService,
    private router: Router,
    public dialog: MatDialog,
  ) {
   this.listagemUsuarios();
   }

  listagemUsuarios(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {

    console.log("UsersTableListComponent::listagemUsuarios");

      this.usersListTableService.findAll(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(error => {
          console.error(error);
          this.onError('Erro ao carregar cursos.');
          return of({ users: [], totalElements: 0, totalPages: 0 })
        })
      ).subscribe(data => {
          this.aUsers = data.users;
          console.log("UsersTableListComponent::subscribe() data = ", this.aUsers);
          console.log("UsersTableListComponent::subscribe() this.aUsers = ", this.aUsers);

        });

    console.log("UsersTableListComponent::listagemUsuarios() this.aUsers = ", this.aUsers);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    console.log("UsersTableListComponent::ngOnInit() this.user = ", this.aUsers);
   const uDTO =  sessionStorage.getItem("usersDTO")

   console.log("UsersTableListComponent::ngOnInit() uDTO = ", uDTO);
   //JSON.parse();
   //this.onEdit(this.user);
   //this.listagemUsuarios();
   //this.onDelete(this.user);

  }

  onEdit(user: Users) {
    console.log("UsersTableListComponent::onEdit() this.user = ", user);
    this.usersListTableService.edit(user).subscribe({
        next: userIn => {
            console.log("Resposta GET :: UserController::getListAll ", JSON.parse(JSON.stringify(userIn)) );
        },
        error: error => {
            console.info('There was an error!', error);
        }
      }); 
  }

  onDelete(user: Users) {
    console.log("UsersTableListComponent::onDelete() this.user = ", user);

    this.usersListTableService.delete(user).subscribe({
      next: userIn => {
          console.log("Resposta DELETE :: UserController::delete ", JSON.parse(JSON.stringify(userIn)) );
      },
      error: error => {
          console.info('There was an error!', error);
      }
    }); 
  }

  toAdd() {
    console.log("onAdd ");
    this.router.navigate([`users/register`]);
  }

}
