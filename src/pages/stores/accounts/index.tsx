import { IFilterByUserRequest } from '@/interfaces/users/users.interface';
import { ACCOUNTS_STATUS, BOOLEAN_OPTIONS, SEARCH_ALL_VALUE } from '@/ultils/constants';
import { makeAutoObservable } from 'mobx';

export class Accounts {
	filterOptions: IFilterByUserRequest = {
		accountStatuses: [ACCOUNTS_STATUS.All],
		backOfficeAdministrationAccessIds: SEARCH_ALL_VALUE,
		brandIds: SEARCH_ALL_VALUE,
		countryIds: SEARCH_ALL_VALUE,
		frontOfficeRoleIds: SEARCH_ALL_VALUE,
		hasAccessToFrontOffice: [BOOLEAN_OPTIONS.true],
		regionIds: SEARCH_ALL_VALUE,
		sentWelcomeEmail: [BOOLEAN_OPTIONS.all],
		workplaceIds: SEARCH_ALL_VALUE,
		communityIds: SEARCH_ALL_VALUE,
		textSearch: '',
	};

	constructor() {
		makeAutoObservable(this);
	}

	async setSearchData(data: IFilterByUserRequest) {
		return (this.filterOptions = data);
	}
}

export const accounts = new Accounts();
