import { IGetListUsers } from '@/interfaces/users/users.interface';
import { action, makeAutoObservable, observable } from 'mobx';

export class UserStore {
	user: IGetListUsers[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	createUser(user: IGetListUsers[]) {
		return (this.user = user);
	}
}
export const userStore = new UserStore();
