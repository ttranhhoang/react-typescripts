import { IGetListUsers } from '@/interfaces/users/users.interface';
import { action, makeAutoObservable, observable } from 'mobx';

class Store {
	user: IGetListUsers[] = [];

  @observable userCount = 12;
	constructor() {
		makeAutoObservable(this.user);
	}

	createUser(user: IGetListUsers[]) {
		return (this.user = user);
	}
}
export const store = new Store();

