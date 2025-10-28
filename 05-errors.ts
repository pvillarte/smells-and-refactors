// TODO: Refactor to improve error handling

class AuthService {
  private users = [
    { id: 1, username: "admin", password: "1234" },
    { id: 2, username: "user", password: "pass" },
  ];

  login(username: string, password: string): any {
    try {
      const user = this.users.find((u) => u.username == username);
      if (!user) {
        return null; // User not found
      }
      if (user.password != password) {
        return null; // Wrong password
      }
      return user;
    } catch (e) {
      return null;
    }
  }

  parseUserData(data: string): any {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.name || !parsed.email) {
        console.log("Error");
        return null;
      }
      return parsed;
    } catch (e) {
      console.log("Error");
      return null;
    }
  }

  updatePassword(userId: number, newPass: string): boolean {
    try {
      if (newPass.length < 3) {
        return false;
      }
      const user = this.users.find((u) => u.id == userId);
      if (user) {
        user.password = newPass;
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  processRequest(request: string): string {
    try {
      const data = JSON.parse(request);
      try {
        const user = this.login(data.username, data.password);
        if (user == null) {
          return "failed";
        }
        try {
          const profile = this.parseUserData(data.profile);
          if (profile == null) {
            return "failed";
          }
          return "success";
        } catch (e) {
          return "failed";
        }
      } catch (e) {
        return "failed";
      }
    } catch (e) {
      return "failed";
    }
  }
}

// Main function
function mainExercise05() {
  const auth = new AuthService();

  const result1 = auth.login("admin", "wrong");
  const result2 = auth.login("nonexistent", "pass");

  if (result1 == null) {
    console.log("Login failed");
  }
  if (result2 == null) {
    console.log("Login failed");
  }

  // Parse errors
  const data = auth.parseUserData("invalid json");
  if (data == null) {
    console.log("Parse failed");
  }

  // Process request
  const status = auth.processRequest('{"username":"admin"}');
  console.log("Status: " + status);
}

mainExercise05();
