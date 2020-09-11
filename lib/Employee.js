class Employee {
    constructor(name, id, email) {
      // if (!id) {
      //   throw new Error("Insert the id.");
      // }
      // if (!id) {
      //   throw new Error("Insert the title.");
      // }
      // if (!email) {
      //   throw new Error("Insert the email.");
      // }
      this.name = name;
      this.id = id;    
      this.email = email; 
     
    }
    
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
  }

  module.exports = Employee;
  