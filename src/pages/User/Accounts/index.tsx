import Button from '@/components/Button';
import Collapsible from '@/components/Collapsible';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Table from '@/components/Table';
import { ICommonGetDataResponse } from '@/interfaces/common/common.interface';
import {
	IGetListBrands,
	IGetListFilterResponse,
	IGetListUsers,
} from '@/interfaces/users/users.interface';
import { getListFilterOptions } from '@/services/users/accounts/apiAccounts';
import { getListUsers } from '@/services/users/apiUsers';
import { getListBrands } from '@/services/users/brands/apiBrands';
import { COLORS } from '@/ultils/color';
import {
	EMPTY_GUID,
	IBooleanOptions,
	IColumnsDefinitionType,
	SEARCH_ALL_VALUE,
} from '@/ultils/constants';
import { useQuery } from '@/ultils/hook';
import { QUERY_KEYS_ACCOUNTS, QUERY_KEYS_USERS } from '@/ultils/queryKey';
import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AccountsTab = () => {
	const { control } = useForm();
	const [listFilterOptions, setListFilterOptions] = useState<IGetListFilterResponse>({
		regions: [],
		communities: [],
		countries: [],
		roles: [],
		workplaces: [],
	});

	const [regionSelected, setRegionSelected] = useState<string[]>(SEARCH_ALL_VALUE);
	const [countriesSelected, setCountriesSelected] = useState<string[]>(SEARCH_ALL_VALUE);
	const [workplaceSelected, setWorkplaceSelected] = useState<string[]>(SEARCH_ALL_VALUE);

	/* --------------------------- LIST FILTER OPTIONS -------------------------- */
	const listFilteredOptions = useQuery<ICommonGetDataResponse<IGetListFilterResponse>>(
		[QUERY_KEYS_ACCOUNTS.GET_LIST_FILTER_OPTIONS],
		() => getListFilterOptions(),
		{
			onSuccess: (res) => {
				setListFilterOptions(res.data.data);
			},
			onError: (err) => {
				console.log('err', err.status);
			},
		}
	);
	/* ------------------------------ LIST REGIONS ------------------------------ */
	const listRegions = useMemo(() => {
		return listFilterOptions.regions.map((rg) => ({
			label: rg.regionName,
			value: rg.regionId,
		}));
	}, [listFilterOptions.regions]);

	/* ------------------------------ LIST COUNTRIES ------------------------------ */

	const listCountries = useMemo(
		() =>
			listFilterOptions.countries
				.filter(
					(filterCoutry) =>
						regionSelected.includes(EMPTY_GUID) || regionSelected.includes(filterCoutry.regionId)
				)
				.map((country) => ({
					label: country.countryName,
					value: country.countryId,
				})),
		[listFilterOptions.countries, regionSelected]
	);
	console.log('list filter options', listFilterOptions);

	/* ----------------------------- LIST WORKPLACE ----------------------------- */
	const listWorkplaces = useMemo(
		() =>
			listFilterOptions.workplaces
				.filter(
					(wp) =>
						(countriesSelected.includes(EMPTY_GUID) &&
							listCountries.map((e) => e.value).includes(wp.countryId)) ||
						countriesSelected.includes(wp.countryId)
				)
				.map((workplace) => ({
					label: workplace.workplaceName,
					value: workplace.workplaceId,
				})),
		[listFilterOptions.workplaces, countriesSelected, listCountries]
	);

	/* ------------------------------- LIST BRANDS ------------------------------ */
	const [listBrands, setListBrands] = useState<IGetListBrands[]>([]);
	useQuery<ICommonGetDataResponse<IGetListBrands[]>>(
		[QUERY_KEYS_ACCOUNTS.GET_LIST_BRANDS],
		() => getListBrands(),
		{
			onSuccess: (res) => {
				setListBrands(res.data.data);
			},
			onError: (err) => {
				console.log('err', err.data.errorMessage);
				toast.error(err.data.errorMessage);
			},
		}
	);

	/* ---------------------------- LIST COMMUNITIES ---------------------------- */
	const listCommunities = useMemo(
		() =>
			listFilterOptions.communities.map((com) => ({
				label: com.communityName,
				value: com.communityId,
			})),
		[listFilterOptions.communities]
	);
	/* -------------------------------- LIST ROLE ------------------------------- */
	const listRoles = useMemo(
		() =>
			listFilterOptions.roles.map((role) => ({
				label: role.roleName,
				value: role.roleId,
			})),
		[listFilterOptions.roles]
	);
	/* ------------------------------- LIST USERS ------------------------------- */
	const [listUsers, setListUsers] = useState<IGetListUsers[]>([]);
	useQuery<ICommonGetDataResponse<IGetListUsers[]>>(
		[QUERY_KEYS_USERS.GET_LIST_USERS],
		() => getListUsers(),
		{
			onSuccess: (res) => {
				setListUsers(res.data.data);
			},
			onError: (err) => {
				console.log('err', err.data.errorMessage);
			},
		}
	);
	const [resetFilter, setResetFilter] = useState<boolean>(false);

	const columns: IColumnsDefinitionType<IGetListUsers, keyof IGetListUsers>[] = [
		{
			key: 'fullName',
			header: 'Name',
			width: 150,
		},
		{
			key: 'email',
			header: 'Email',
		},
		{
			key: 'fullName',
			header: 'Color',
		},
	];
	return listFilteredOptions.isFetching ? (
		<Spinner color={COLORS.SECONDARY} height="70" width="70" />
	) : (
		<div className="flex gap-10 mt-5">
			<div className="flex flex-col gap-1">
				<Collapsible
					label="Region"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					defaultCollapsed
					options={listRegions}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : regionSelected}
					onSelectOptions={(e) => {
						setRegionSelected(e.map((regionSelected) => regionSelected.value));
					}}
				/>
				<Collapsible
					label="Country/Market"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={listCountries}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : countriesSelected}
					onSelectOptions={(e) => {
						setCountriesSelected(e.map((coutriesSelected) => coutriesSelected.value));
					}}
				/>
				<Collapsible
					label="Workplace"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={listWorkplaces}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : workplaceSelected}
					onSelectOptions={(e) =>
						setWorkplaceSelected(e.map((workplaceSelected) => workplaceSelected.value))
					}
				/>
				<Collapsible
					label="Brands"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={listBrands.map((e) => ({
						label: e.brandName,
						value: e.brandId,
					}))}
					isReset={resetFilter}
					onSelectOptions={(e) =>
						e.map((e) => ({
							value: e.value,
							label: e.label,
						}))
					}
				/>
				<Collapsible
					label="Communities"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={listCommunities}
					isReset={resetFilter}
					onSelectOptions={(e) =>
						e.map((e) => ({
							value: e.value,
							label: e.label,
						}))
					}
				/>
				<Input control={control} isSearchFormCollpase placeholder="Search..." typeColor="dgray" />
				<Button label="Search" onClick={() => console.log('clicked')}></Button>
				<Button label="Reset Filter"></Button>
			</div>
			<div className="flex flex-col gap-1">
				<Collapsible
					label="Has Access To FO"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={IBooleanOptions.map((e) => ({
						value: e.value,
						label: e.label,
					}))}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : regionSelected}
					onSelectOptions={(e) => {
						setRegionSelected(e.map((regionSelected) => regionSelected.value));
					}}
				/>
				<Collapsible
					label="Role"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={listRoles}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : regionSelected}
					onSelectOptions={(e) => {
						setRegionSelected(e.map((regionSelected) => regionSelected.value));
					}}
				/>
				<Collapsible
					label="Welcome Email"
					name="Search"
					placeholder="Search"
					isSearchForm
					isSearchFormCollpase
					options={IBooleanOptions.map((e) => ({
						value: e.value,
						label: e.label,
					}))}
					isReset={resetFilter}
					defaultValues={resetFilter ? SEARCH_ALL_VALUE : regionSelected}
					onSelectOptions={(e) => {
						setRegionSelected(e.map((regionSelected) => regionSelected.value));
					}}
				/>
			</div>
			<Table title="User" data={listUsers} columns={columns} />
		</div>
	);
};
export default AccountsTab;
