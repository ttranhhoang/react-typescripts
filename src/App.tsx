import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/app.css';

function App() {
	const router = useRoutes(routes);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});
	return (
		<div className="app">
			<QueryClientProvider client={queryClient}>
				<React.Suspense fallback={<>Loading...</>}>{router}</React.Suspense>
			</QueryClientProvider>
		</div>
	);
}

export default App;
