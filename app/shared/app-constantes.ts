


export class AppConstants {

  public static readonly API_VERSION: string = "/v1";
  public static readonly API_CONTEXT: string = "/api";
  public static readonly AUTH_CONTEXT: string = "/auth" + this.API_CONTEXT;
  public static readonly USER_CONTEXT: string = "/users" + this.API_CONTEXT;

  public static readonly PORT_SERVER: string = "8080";

  public static get baseServer(): string {return "http://localhost:" + this.PORT_SERVER; }

  //auth/api/login
  public static get baseLogin(): string {return  this.AUTH_CONTEXT + "/login" }

  public static get baseRegister(): string {return  this.AUTH_CONTEXT + "/register" }

  public static get baseUrl(): string {return  this.baseServer + this.API_CONTEXT + this.API_VERSION }

  public static get baseUrlUsers(): string {return  this.USER_CONTEXT }


}