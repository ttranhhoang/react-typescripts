import { BASE_URL_API, http } from '@/services/httpServices';

/* -------------------------------- ENDPOINT -------------------------------- */
const listFilterOptions = () => `${BASE_URL_API}/Users/FilterOptions`;

export async function getListFilterOptions() {
	const result = await http.get(listFilterOptions());
	return result;
}

export const listUsers = () => `${BASE_URL_API}/Users`;
export async function getListUsers() {
	const result = await http.get(listUsers());
	return result;
}
