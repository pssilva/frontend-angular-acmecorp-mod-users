import { Users } from "./users";

export interface UsersPage {
  users: Users[];
  totalElements: number;
  totalPages: number;
}
