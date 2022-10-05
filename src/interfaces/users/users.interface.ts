export interface IGetRegionByIdResponse {
	regionId: string;
	regionName: string;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedByName: string;
	modifiedOn: string;
	isDeleted: false;
}
export interface IGetCountryByIdResponse {
	countryId: string;
	countryName: string;
	countryCode: string;
	regionId: string;
	languageId: string;
	utcId: string;
	entityId: string;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedByName: string;
	modifiedOn: string;
	isDeleted: boolean;
}
export interface IGetWorkplaceByIdResponse {
	workplaceId: string;
	workplaceName: string;
	countryId: string;
	isDefault: boolean;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedByName: string;
	modifiedOn: string;
	isDeleted: boolean;
	workplaceChannels: {
		workplaceId: string;
		channelId: string;
		brandId: string;
	}[];
}
export interface IGetCommunitiesResponse {
	communityId: string;
	communityName: string;
	accountCount: number;
	courseId: string;
	courseIdTitle: string;
	communityStatusId: string;
	communityStatusName: string;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedOn: string;
	isDeleted: boolean;
}
export interface IGetRoleByIdResponse {
	createdBy: string;
	createdOn: string;
	isDeleted: false;
	modifiedBy: string;
	modifiedByName: string;
	modifiedOn: string;
	roleId: string;
	roleName: string;
	roleTypeId: string;
	roleTypeName: string;
}
export interface IGetListFilterResponse {
	regions: IGetRegionByIdResponse[];
	countries: IGetCountryByIdResponse[];
	workplaces: IGetWorkplaceByIdResponse[];
	communities: IGetCommunitiesResponse[];
	roles: IGetRoleByIdResponse[];
}

export interface IGetListBrands {
	brandId: string;
	brandCode: string;
	brandName: string;
	entityId: string;
	isDeleted: boolean;
}

export interface IGetListCommunities {
	communityId: string;
	communityName: string;
	courseId: string;
	courseIdTitle: null;
	accountCount: number;
	communityStatusId: string;
	communityStatusName: string;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedOn: string;
	isDeleted: boolean;
}

/* ---------------------------------- USERS --------------------------------- */
export interface IGetListUsers {
	userId: string;
	fullName: string;
	email: string;
	sentWelcomeEmail: boolean;
	accountStatus: string;
	hasAccessToFrontOffice: boolean;
}

export interface ICommonOrder<TOrder> {}

export interface IGetDataResponse<TData = any> {
	data: TData;
	totalItems?: number;
	totalPages?: number;
	pageIndex?: number;
	pageSize?: number;
}
export interface IGetDataRequest<TOrder, TFilter> {
	pageIndex: number;
	pageSize: number;
	orderBy: ICommonOrder<TOrder>;
	filterBy: TFilter;
}
export interface IFilterByUserRequest {
	regionIds: string[];
	countryIds: string[];
	workplaceIds: string[];
	brandIds: string[];
	hasAccessToFrontOffice: string[];
	frontOfficeRoleIds: string[];
	backOfficeAdministrationAccessIds: string[];
	sentWelcomeEmail: string[];
	accountStatuses: string[];
	communityIds: string[];
	textSearch: string;
}
