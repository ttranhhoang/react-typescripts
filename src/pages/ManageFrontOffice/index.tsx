import TabPanel from '@/components/TabPanel';
import { joinPaths } from '@/helpers/getPathString';
import withNavigation from '@/helpers/withNavigation';
import { IListNavigation } from '@/interfaces/ListNavigation';
import { ROUTERS_NAME } from '@/routes/routesname';
import { Outlet } from 'react-router-dom';

const { manageFrontOffice, arborescence, contentLocation } = ROUTERS_NAME;
const ManageFrontOffice = () => {
	const listTabMenuManageFrontOffice: IListNavigation[] = [
		{
			label: 'Manage Arborescence',
			path: joinPaths(manageFrontOffice, arborescence),
		},
		{
			label: 'Content Location',
			path: joinPaths(manageFrontOffice, contentLocation),
		},
	];
	return (
		<div>
			<TabPanel tabListMenu={listTabMenuManageFrontOffice} />
			<Outlet />
		</div>
	);
};

export default withNavigation(ManageFrontOffice);
