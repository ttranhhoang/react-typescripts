import Button from '@/components/Button';
import Collapsible from '@/components/Collapsible';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { ICommonGetDataResponse } from '@/interfaces/common/common.interface';
import {
	IFilterByUserRequest,
	IGetDataRequest,
	IGetDataResponse,
	IGetListBrands,
	IGetListFilterResponse,
	IGetListUsers,
} from '@/interfaces/users/users.interface';
import { getListFilterOptions } from '@/services/users/accounts/apiAccounts';
import { getListUsers, searchUser } from '@/services/users/apiUsers';
import { getListBrands } from '@/services/users/brands/apiBrands';
import {
	EMPTY_GUID,
	IBooleanOptions,
	IColumnsDefinitionType,
	ITableIConTools,
	ITABLE_ID_USER,
	KEY_TOOLS_TABLE,
	PAGE_SIZE,
	SEARCH_ALL_VALUE,
} from '@/ultils/constants';
import { useMutation, useQuery } from '@/ultils/hook';
import { ICON } from '@/ultils/icons';
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
	const [pageIndex, setPageIndex] = useState<number>(1);
	const [pageSize, setPageSize] = useState();

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
	// useQuery<ICommonGetDataResponse<IGetListUsers[]>>(
	// 	[QUERY_KEYS_USERS.GET_LIST_USERS],
	// 	() => getListUsers(),
	// 	{
	// 		onSuccess: (res) => {
	// 			setListUsers(
	// 				res.data.data.map((e) => ({
	// 					...e,
	// 					tools: toolsIcon.map((e) => e),
	// 				}))
	// 			);
	// 		},
	// 		onError: (err) => {
	// 			console.log('err', err.data.errorMessage);
	// 		},
	// 	}
	// );
	console.log('listUsers', listUsers);
	const filterListUsers = useMutation<
		IGetDataResponse<IGetListUsers[]>,
		IGetDataRequest<IGetListUsers, IFilterByUserRequest>
	>(searchUser, {
		onSuccess: (res) => {
			console.log('res data', res.data.data);
			setListUsers(res.data.data.map((e) => e));
		},
		onError: (err) => {
			console.log('err', err.data.errorMessage);
		},
	});
	const [resetFilter, setResetFilter] = useState<boolean>(false);

	const columns: IColumnsDefinitionType<IGetListUsers>[] = [
		{
			key: 'fullName',
			header: 'Name',
		},
		{
			key: 'email',
			header: 'Email',
		},
		{
			key: KEY_TOOLS_TABLE.TOOLS,
			header: 'Tools',
			groupLabelTools: ['EDIT', 'DELETE'],
		},
	];

	const toolsIcon: ITableIConTools[] = [
		{
			key: 1,
			icon: (data: IGetListUsers, tableId: ITABLE_ID_USER) => (
				<Icon type={ICON.PENCIL} onClick={() => {}} />
			),
		},
		{
			key: 2,
			icon: (data: IGetListUsers) => <Icon type={ICON.PENCIL} onClick={() => {}} />,
		},
	];
	const handleSearchFilterMutate = (filterBy: IFilterByUserRequest) => {
		filterListUsers.mutate({
			filterBy,
			orderBy,
			pageIndex,
			pageSize: PAGE_SIZE,
		});
	};
	return listFilteredOptions.isFetching ? (
		<p>Loading ....</p>
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
