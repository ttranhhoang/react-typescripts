import { joinPaths } from '@/helpers/getPathString';
import { IListNavigation } from '@/interfaces/ListNavigation';
import { ROUTERS_NAME } from '@/routes/routesname';
import { TYPE_ICONS } from '@/ultils/icons';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

const { users, settings, manageFrontOffice, courses, classroom, translation, statistics } =
	ROUTERS_NAME;

const Navigation = () => {
	const navList: IListNavigation[] = [
		{
			label: 'Users',
			path: users,
		},
		{
			label: 'Settings',
			path: settings,
		},
		{ label: 'Manage Front Office', path: manageFrontOffice },
		{ label: 'Courses', path: courses },
		{ label: 'Classroom', path: classroom },
		{ label: 'Translation', path: translation },
		{ label: 'Statistics', path: statistics },
	];
	return (
		<div className="w-full flex gap-10 items-center ">
			<Icon type={TYPE_ICONS.CLOUD_DOWNLOAD} />
			<nav className="w-full flex mb-2">
				<ul className="flex justify-between w-full border-b  border-secondary">
					{navList.map((navItem) => (
						<li key={navItem.label} className="font-bold text-lg tracking-wide mb-2">
							<NavLink
								to={`${joinPaths(navItem.path)}`}
								className={({ isActive }) =>
									isActive ? 'text-orange border-b-4 pb-2 border-b-orange' : ''
								}
							>
								{navItem.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
