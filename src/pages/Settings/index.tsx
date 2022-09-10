import TabPanel from '@/components/TabPanel';
import { joinPaths } from '@/helpers/getPathString';
import withNavigation from '@/helpers/withNavigation';
import { IListNavigation } from '@/interfaces/ListNavigation';
import { ROUTERS_NAME } from '@/routes/routesname';
import { Outlet } from 'react-router-dom';

const { settings, geography, roles, channels, thematics } = ROUTERS_NAME;
const Settings = () => {
	const listTabMenuSettings: IListNavigation[] = [
		{
			label: 'Geography',
			path: joinPaths(settings, geography),
		},
		{ label: 'Roles', path: joinPaths(settings, roles) },
		{ label: 'Channels', path: joinPaths(settings, channels) },
		{ label: 'Thematics', path: joinPaths(settings, thematics) },
	];
	return (
		<div>
			<TabPanel tabListMenu={listTabMenuSettings} />
			<Outlet />
		</div>
	);
};

export default withNavigation(Settings);
