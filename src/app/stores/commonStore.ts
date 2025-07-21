import { makeAutoObservable, runInAction } from "mobx";

export default class CommonStore {

    constructor() {
        makeAutoObservable(this)
    }
}