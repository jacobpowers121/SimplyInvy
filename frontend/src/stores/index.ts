import AuthStore from "@/stores/auth-store";
import UserStore from "./user-store";

const userStore = new UserStore();
const authStore = new AuthStore(userStore);

const stores = {
  userStore,
  authStore,
};

export default stores;
