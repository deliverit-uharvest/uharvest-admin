import { makeAutoObservable, runInAction } from "mobx";
import { baseApiUrl } from "../api/constants";
export default class UserStore {
  user: any = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
     this.token = localStorage.getItem("token");
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setUser = (user: any, token: string) => {
    this.user = user;
    this.token = token;
    localStorage.setItem("token", token);
  };

  logout = () => {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  };

  loading = true;
  loadUser = async () => {
    console.log("Running loadUser()");
    this.loading = true;
    const token = localStorage.getItem("token");
    if (!token) {
      this.loading = false;
      return;
    }
    console.log("token before");

    try {
      const resData = await fetch(`${baseApiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resJson = await resData.json();
      console.log("token after data", resJson);
      if (resJson.status == "success") {
        runInAction(() => {
          this.user = resJson.data.user;
          this.token = token;
        });
      } else {
        this.logout();
      }
    } catch (err) {
      this.logout();
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
