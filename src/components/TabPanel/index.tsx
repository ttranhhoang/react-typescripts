import { IListNavigation } from '@/interfaces/ListNavigation';
import { NavLink } from 'react-router-dom';
interface ITabPanel {
	tabListMenu: IListNavigation[];
}
const TabPanel = (props: ITabPanel) => {
	const { tabListMenu } = props;
	return (
		<div className="flex w-full">
			<ul className="flex justify-between gap-16">
				{tabListMenu.map((tab) => (
					<li key={tab.label} className="font-bold text-lg tracking-wide">
						<NavLink
							to={tab.path}
							className={({ isActive }) => (isActive ? 'text-orange' : 'text-secondary')}
						>
							{tab.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TabPanel;
