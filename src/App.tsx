import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import ColumnsPage from './pages/columns';

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} path="/" />
			<Route element={<ColumnsPage />} path="/column" />
		</Routes>
	);
}

export default App;
