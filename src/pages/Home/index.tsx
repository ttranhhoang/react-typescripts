import Icon from '@/components/Icon';
import { ICON } from '@/ultils/icons';
import { Outlet } from 'react-router-dom';
const Home = () => {
	return (
		<div>
			<div className="flex items-center justify-around my-5 px-5">
				<Icon type={ICON.USER} />
				<img src="/images/logo.png" alt="" className="h-20" />
				<Icon type={ICON.LOGOUT} />
			</div>
			<Outlet />
		</div>
	);
};

export default Home;
