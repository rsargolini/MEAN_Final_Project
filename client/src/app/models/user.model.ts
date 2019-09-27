  // Create User Model Class
  export class User {
    // properties
    public userId: number;
    public userName: string = '';
    public emailAddress: string = '';
    // Password for demo purposes only!
    public password: string = '';
    
    constructor(userId: number, userName: string, emailAddress: string, password: string) {
      this.userId = userId;
      this.userName = userName;
      this.emailAddress = emailAddress;
      this.password = password;
    }
  }