export interface ICommonGetDataResponse<TData = any> {
	data: TData;
}

// this is interface error when backend respone
export interface IErrorResponse {
	errorCode: number;
	errorDetail: string;
	errorMessage: string;
	timestamp: number;
}
