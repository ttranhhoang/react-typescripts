import { http } from './../../httpServices';
import { BASE_URL_API } from '@/services/httpServices';

/* -------------------------------- ENDPOINTS -------------------------------- */
const listBrands = () => `${BASE_URL_API}/Brands`;

export async function getListBrands() {
	const result = http.get(listBrands());
	return result;
}
