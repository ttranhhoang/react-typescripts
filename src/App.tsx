import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import Spinner from './components/Spinner';
import { COLORS } from './ultils/color';

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
		<div className="app git test rebase">
			<QueryClientProvider client={queryClient}>
				<React.Suspense fallback={<Spinner color={COLORS.SECONDARY} height="70" width="70" />}>
					{router}
				</React.Suspense>
			</QueryClientProvider>
		</div>
	);
}

export default App;
