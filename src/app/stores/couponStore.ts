import { makeAutoObservable, runInAction } from "mobx";

export default class CouponStore {

    constructor() {
        makeAutoObservable(this)
    }
}