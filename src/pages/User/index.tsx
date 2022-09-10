import TabPanel from '@/components/TabPanel';
import { joinPaths } from '@/helpers/getPathString';
import withNavigation from '@/helpers/withNavigation';
import { IListNavigation } from '@/interfaces/ListNavigation';
import { ROUTERS_NAME } from '@/routes/routesname';
import { Outlet } from 'react-router-dom';

const Users = () => {
	const { users, accounts, communities } = ROUTERS_NAME;
	const listTabMenuUser: IListNavigation[] = [
		{
			label: 'Accounts',
			path: joinPaths(users, accounts),
		},
		{
			label: 'Communities',
			path: joinPaths(users, communities),
		},
	];
	return (
		<div>
			<TabPanel tabListMenu={listTabMenuUser} />
			<Outlet />
		</div>
	);
};

export default withNavigation(Users);
