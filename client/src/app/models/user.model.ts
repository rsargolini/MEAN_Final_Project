  // Create User Model Class
  export class User {
    // properties
    public userId: number;
    public userName: string = '';
    public emailAddress: string = '';
    // Password for demo purposes only!
    public password: string = '';
    public is_admin: number;

    constructor(userId: number, userName: string, emailAddress: string, password: string, is_admin: number) {
      this.userId = userId;
      this.userName = userName;
      this.emailAddress = emailAddress;
      this.password = password;
      this.is_admin = is_admin;
    }
  }
