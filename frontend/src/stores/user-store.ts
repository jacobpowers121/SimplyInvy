import { makeAutoObservable } from 'mobx';

interface IUser {
  name: string;
  email: string;
}

export class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: IUser) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }
}
