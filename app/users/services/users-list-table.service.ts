import { Injectable } from '@angular/core';
import { Users } from '../model/users';

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { UsersResponseDTO } from '../model/usersResponseDTO';
import { AppConstants } from '../../shared/app-constantes';
import { UsersPage } from '../model/users-page';

@Injectable({
  providedIn: 'root'
})
export class UsersListTableService {
  token = sessionStorage.getItem("auth-token");

  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem("auth-token");
   }

  

  findAll(pageIndex: number, pageSize: number) {

    console.log("UsersListTableService::findAll() pageIndex | pageSize = ", pageIndex +" | "+pageSize);
    console.log("UsersListTableService::findAll() token = ", this.token );

    const params = new HttpParams()
      .set('page', pageIndex)
      .set('pageSize', pageSize);

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + this.token)
    .set("Content-Type", "application/json")
    .set("responseType", "json");

    return this.httpClient.get<UsersPage>( AppConstants.baseUrlUsers, {headers,params});

  }
  edit(userData: Users) {

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + this.token)
    .set("Content-Type", "application/json")
    .set("responseType", "json");

    console.log("UsersListTableService::edit() headers = ", headers);
    console.log("UsersListTableService::edit() userData = ", userData);

    return this.httpClient.put<UsersResponseDTO>(AppConstants.baseUrlUsers + "/" + userData._id, userData,  {headers});

  }

  delete(userData: Users) {
    
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + this.token)
    .set("Content-Type", "application/json")
    .set("responseType", "json");

    console.log("UsersListTableService::delete() headers = ", headers);
    console.log("UsersListTableService::delete() userData = ", userData);
    console.log("UsersListTableService::delete() token = ", this.token );

    return this.httpClient.delete(AppConstants.baseUrlUsers + "/" + userData._id,{headers});

  }
  
}
