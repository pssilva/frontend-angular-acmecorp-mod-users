import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { AppConstants } from '../../shared/app-constantes';
import { UsersRequestDTO } from '../model/usersRequestDTO';
import { UsersResponseDTO } from '../model/usersResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
   private httpClient: HttpClient
    ) { }

  token = sessionStorage.getItem("auth-token");

  create(record: UsersRequestDTO) {   

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token)
      .set("Content-Type", "application/json")
      .set("responseType", "json");

    return this.httpClient.put<UsersResponseDTO>(AppConstants.baseUrlUsers , record, {headers}).pipe(first());

  }

  resiter(record: UsersRequestDTO) {
    return this.httpClient.put<UsersResponseDTO>(AppConstants.baseRegister , record).pipe(first());
  }
  

}
