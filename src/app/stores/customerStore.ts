/* ----------------Libraries------------------- */
import { makeAutoObservable, runInAction } from "mobx";

/* ----------------Api's----------------------- */
import agent from "../api/agent";

export default class CustomerStore {
  outlets: any[] = [];
  loadingByOrgId: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // getOutletByOrganisation = async (orgId: number) => {
  //   this.setLoadingByOrgId(true);
  //   try {
  //     const result = await agent.Customer.getOutletByOrganisation(orgId);
  //     runInAction(() => {
  //       this.outlets = result;
  //     });
  //     this.setLoadingByOrgId(false);
  //   } catch (error) {
  //     this.setLoadingByOrgId(false);
  //   }
  // };

  setLoadingByOrgId = (val: boolean) => {
    this.loadingByOrgId = val;
  };
}


