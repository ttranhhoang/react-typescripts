import { http } from './../httpServices';
import { BASE_URL_API } from '../httpServices';

const listUsers = () => `${BASE_URL_API}/Users`;

export async function getListUsers() {
	const result = await http.get(listUsers());
	return result;
}
