import React from 'react';
import { useRoutes, useSearchParams } from 'react-router-dom';
import '@/styles/app.css';
import routes from '@/routes';

function App() {
	const router = useRoutes(routes);
	const [searchParams] = useSearchParams();
	console.log('searchParams', searchParams.get('type'));
	console.log('searchParams', searchParams.get('tableId'));
	return (
		<div className="app">
			<React.Suspense fallback={<>Loading...</>}>{router}</React.Suspense>
		</div>
	);
}

export default App;
