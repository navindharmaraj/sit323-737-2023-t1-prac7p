class User {
    constructor(username, password, email) {
      this.username = username;
      this.password = password;
      this.email = email;
    }
  
    getUsername() {
      return this.username;
    }
  
    getPassword() {
      return this.password;
    }
  
    getEmail() {
      return this.email;
    }
  
    setUsername(username) {
      this.username = username;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    setEmail(email) {
      this.email = email;
    }
  }
  