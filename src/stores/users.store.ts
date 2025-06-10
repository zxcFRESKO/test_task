import { makeAutoObservable } from "mobx";
import { createUserApi, getAllUsersApi, retrieveUserApi, updateUserApi } from "../api/userApi";
import { fromPromise, type IPromiseBasedObservable } from "mobx-utils";
import type { IUser } from "../types/types";

class UsersStore {
  users?: IPromiseBasedObservable<IUser[]>
  selectedUser?: IPromiseBasedObservable<IUser | null>

  constructor() {
    makeAutoObservable(this)
  }

  getAllUsers = () => {
    this.users = fromPromise(getAllUsersApi())
  }
  createUser = async (first_name: string, last_name: string, bio: string) => {
    const newUserPromise = fromPromise(createUserApi({ first_name, last_name, bio }));
    (await this.users)?.push(await newUserPromise);
    this.users = fromPromise(getAllUsersApi())
  };
  retrieveUser = (id: number) => {
    this.selectedUser = fromPromise(
      retrieveUserApi({ id }).then((user) => user ?? null)
    );
  }
  updateUser = async (userId: number, updatedFields: Partial<IUser>) => {
    await updateUserApi(userId, updatedFields);
    const updatedUser = await retrieveUserApi({ id: userId });
    this.selectedUser = fromPromise(Promise.resolve(updatedUser));
  
    if (this.users) {
      this.users = fromPromise(
        this.users?.then((users) =>
          users.map((user) => (user.id === userId ? updatedUser : user))
        )
      );
    }
  };
}


export type IUsersStore = typeof UsersStore.prototype;
export default new UsersStore()