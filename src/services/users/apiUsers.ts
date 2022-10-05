import { http } from './../httpServices';
import { BASE_URL_API } from '../httpServices';

const apilistUsers = () => `${BASE_URL_API}/Users`;
const apifilterListUser = () => `${BASE_URL_API}/Users/Search`;

export async function getListUsers() {
	const result = await http.get(apilistUsers());
	return result;
}
export async function searchUser(body: any) {
	const result = await http.post(apifilterListUser(), body);
	return result;
}
