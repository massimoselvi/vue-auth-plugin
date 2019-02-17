import { AuthUser, VueAuthOptions, VueAuthStore } from '../../interfaces';

export default class StoreCookie implements VueAuthStore {
  public enabled = true;
  private store: any;

  constructor(private Vue: any, private options: VueAuthOptions) {
    if (this.Vue.cookie) {
      this.store = this.Vue.cookie;
    } else {
      console.warn('[vue-auth-plugin]: Cookie store not enabled');
      this.enabled = false;
    }
  }

  public getRoles(): string[] {
    return this.getUser()[this.options.rolesVar];
  }

  public getToken(): string {
    return this.store.get(this.options.tokenDefaultName);
  }

  public getUser(): AuthUser {
    return JSON.parse(this.store.get(this.options.userDefaultName)) || {};
  }

  public setToken(token: string): void {
    if (token) {
      this.store.set(this.options.tokenDefaultName, token);
    } else {
      this.store.delete(this.options.tokenDefaultName);
    }
  }

  public setUser(user: AuthUser): void {
    if (user && Object.keys(user).length) {
      this.store.set(this.options.userDefaultName, JSON.stringify(user));
    } else {
      this.store.delete(this.options.userDefaultName);
    }
  }

}
