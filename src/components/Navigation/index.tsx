import { joinPaths } from '@/helpers/getPathString';
import { IListNavigation } from '@/interfaces/ListNavigation';
import { ROUTERS_NAME } from '@/routes/routesname';
import { NavLink } from 'react-router-dom';

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
		<nav className="w-full flex justify-center items-center">
			<ul className="flex justify-evenly w-5/6 border-b-2">
				{navList.map((navItem) => (
					<li key={navItem.label} className="font-bold text-lg tracking-wide">
						<NavLink
							to={`${joinPaths(navItem.path)}`}
							className={({ isActive }) =>
								isActive ? 'text-orange-400 border-b-2 border-b-orange-400' : ''
							}
						>
							{navItem.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
