import React from 'react';
import { Outlet } from 'react-router-dom';
const Home = () => {
	return (
		<div>
			<div className="flex items-center justify-around my-5 px-5">
				<svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
					/>
				</svg>
				<img src="/images/logo.png" alt="" className="h-20" />
				<svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
					/>
				</svg>
			</div>
			<Outlet />
		</div>
	);
};

export default Home;
