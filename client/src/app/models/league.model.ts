  // Create Leagues Model Class
  export class League {
    // properties
    public Name: string = '';
    public Code: string = '';
    public Description: string = '';
    
    constructor(Name: string, Code: string, Description: string) {
      this.Name = Name;
      this.Code = Code;
      this.Description = Description;
    }
  }