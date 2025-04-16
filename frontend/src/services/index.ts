import AuthService from "@/services/auth-service";
import UserService from "@/services/user-service";

export default {
  authService: new AuthService(),
  userService: new UserService(),
};
