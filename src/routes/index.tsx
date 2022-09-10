import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTERS_NAME } from '@/routes/routesname';
import { joinPaths } from '@/helpers/getPathString';

/* -------------------------------------------------------------------------- */
/*                                  PAGES                                 */
/* -------------------------------------------------------------------------- */
const HomePage = React.lazy(() => import('@/pages/Home'));
const UserPage = React.lazy(() => import('@/pages/User' as any));
const SettingsPage = React.lazy(() => import('@/pages/Settings' as any));
const ManageFrontOfficePage = React.lazy(() => import('@/pages/ManageFrontOffice' as any));
const CoursesPage = React.lazy(() => import('@/pages/Courses' as any));
const ClassroomPage = React.lazy(() => import('@/pages/Classroom' as any));
const TranslationPage = React.lazy(() => import('@/pages/Translation' as any));
const StatisticsPage = React.lazy(() => import('@/pages/Statistics' as any));
const UserAccountPage = React.lazy(() => import('@/pages/User/Accounts'));
const UserCommunitiesPage = React.lazy(() => import('@/pages/User/Communities'));
const SettingsGeographyPage = React.lazy(() => import('@/pages/Settings/Geography'));
const SettingsRolesPage = React.lazy(() => import('@/pages/Settings/Roles'));
const SettingsChannelsPage = React.lazy(() => import('@/pages/Settings/Channels'));
const SettingsThematicsPage = React.lazy(() => import('@/pages/Settings/Thematics'));
const ManageFrontOfficeArborescence = React.lazy(
	() => import('@/pages/ManageFrontOffice/Arborescence')
);
const ManageFrontOfficeContentLocation = React.lazy(
	() => import('@/pages/ManageFrontOffice/ContentLocation')
);
const LoginPage = React.lazy(() => import('@/pages/Login'));
const ActionPage = React.lazy(() => import('@/pages/User/Action'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'));

/* -------------------------------------------------------------------------- */
/*                                 ROUTES NAME                                */
/* -------------------------------------------------------------------------- */
const {
	login,
	users,
	settings,
	manageFrontOffice,
	courses,
	classroom,
	translation,
	statistics,
	accounts,
	communities,
	geography,
	roles,
	channels,
	thematics,
	arborescence,
	contentLocation,
	action,
} = ROUTERS_NAME;

const routes: RouteObject[] = [
	{
		path: '/',
		element: <HomePage />,
		children: [
			/* -------------------------------------------------------------------------- */
			/*                                    USERS                                    */
			/* -------------------------------------------------------------------------- */
			{ index: true, element: <Navigate to={joinPaths(users)} /> },
			{
				path: users,
				element: <UserPage />,
				children: [
					{ index: true, element: <Navigate to={joinPaths(users, accounts)} /> },
					{
						path: joinPaths(users, accounts),
						element: <UserAccountPage />,
					},
					{
						path: joinPaths(users, communities),
						element: <UserCommunitiesPage />,
					},
				],
			},
			/* -------------------------------------------------------------------------- */
			/*                                  SETTINGS                                  */
			/* -------------------------------------------------------------------------- */
			{
				path: settings,
				element: <SettingsPage />,
				children: [
					{ index: true, element: <Navigate to={joinPaths(settings, geography)} /> },
					{
						path: joinPaths(settings, geography),
						element: <SettingsGeographyPage />,
					},
					{
						path: joinPaths(settings, roles),
						element: <SettingsRolesPage />,
					},
					{
						path: joinPaths(settings, channels),
						element: <SettingsChannelsPage />,
					},
					{ path: joinPaths(settings, thematics), element: <SettingsThematicsPage /> },
				],
			},
			/* -------------------------------------------------------------------------- */
			/*                             MANAGE FRONT OFFICE                            */
			/* -------------------------------------------------------------------------- */
			{
				path: manageFrontOffice,
				element: <ManageFrontOfficePage />,
				children: [
					{ index: true, element: <Navigate to={joinPaths(manageFrontOffice, arborescence)} /> },
					{
						path: joinPaths(manageFrontOffice, arborescence),
						element: <ManageFrontOfficeArborescence />,
					},
					{
						path: joinPaths(manageFrontOffice, contentLocation),
						element: <ManageFrontOfficeContentLocation />,
					},
				],
			},
			/* -------------------------------------------------------------------------- */
			/*                                   COURSES                                  */
			/* -------------------------------------------------------------------------- */
			{
				path: courses,
				element: <CoursesPage />,
			},
			/* -------------------------------------------------------------------------- */
			/*                                  CLASSROOM                                 */
			/* -------------------------------------------------------------------------- */
			{ path: classroom, element: <ClassroomPage /> },
			/* -------------------------------------------------------------------------- */
			/*                                 TRANSLATION                                */
			/* -------------------------------------------------------------------------- */
			{ path: translation, element: <TranslationPage /> },
			/* -------------------------------------------------------------------------- */
			/*                                 STATISTICS                                 */
			/* -------------------------------------------------------------------------- */
			{ path: statistics, element: <StatisticsPage /> },
		],
	},
	/* -------------------------------------------------------------------------- */
	/*                                   ACTION                                   */
	/* -------------------------------------------------------------------------- */
	{ path: joinPaths(users, action), element: <ActionPage /> },
	/* -------------------------------------------------------------------------- */
	/*                                    LOGIN                                   */
	/* -------------------------------------------------------------------------- */
	{
		path: login,
		element: <LoginPage />,
	},
	/* -------------------------------------------------------------------------- */
	/*                                  NOT FOUND                                 */
	/* -------------------------------------------------------------------------- */
	{
		path: '*',
		element: <NotFoundPage />,
	},
];
export default routes;
