import { UsersResponseDTO } from "./usersResponseDTO";

export interface LoginResponseDTO {
  usersDTO: UsersResponseDTO;
  token: string;
  profilesActive: string;
}
