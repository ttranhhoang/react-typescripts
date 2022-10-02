import { BASE_URL_API, http } from './../../httpServices';
const listCommunities = () => `${BASE_URL_API}/Communities`;

export async function getListCommunities() {
	const result = http.get(listCommunities());
	return result;
}
