import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import {from} from 'rxjs';
//import { first} from 'rxjs/operators';

import { Users } from '../model/users';
import { AppConstants } from '../../shared/app-constantes';
import { UsersLoginRequestDTO } from '../model/usersLoginRequestDTO';
import { UsersPage } from '../model/users-page';
import { LoginResponseDTO } from '../model/loginResponseDTO';
//import { UsersResponseDTO } from '../model/usersResponseDTO';
//import { UsersPage } from '../model/users-page';

@Injectable({
  providedIn: 'root'
})
export class UsersLoginService {

  token = sessionStorage.getItem("auth-token");  
  

  constructor(
    private httpClient: HttpClient
  ) { 
    this.token = sessionStorage.getItem("auth-token");
  }

  login(user: UsersLoginRequestDTO){
    console.log("UsersLoginService::login::this.user", user);
    
    return this.httpClient.post<LoginResponseDTO>(AppConstants.baseLogin,user); 
  }

  list(page = 0, pageSize = 10) {
    return this.httpClient.post<UsersPage[]>( AppConstants.baseUrlUsers, { params: { page, pageSize } });
  }

  save(record: Partial<Users>) {
    console.log("UsersLoginService.save::record = ", record);
  }

  edit(user: Users) {

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + this.token)
    .set("Content-Type", "application/json")
    .set("responseType", "json");

    console.log("UsersLoginService::edit() headers = ", headers);
    console.log("UsersLoginService::edit() this.user = ", user);

    this.httpClient.post<UsersPage[]>(AppConstants.baseUrlUsers,  {headers})
      .subscribe({
          next: userIn => {
              console.log("Resposta GET :: UserController::edit ", JSON.parse(JSON.stringify(userIn)) );
          },
          error: error => {
              //this.errorMessage = error.message;
              console.info('There was an error!', error);
          }
        }); 

  }


}
