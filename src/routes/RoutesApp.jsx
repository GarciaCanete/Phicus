import { Navigate, Route, Routes } from 'react-router-dom';
import { FindCity, WeatherInfo } from '../_public';
import { NavBar } from '../common';

export const RoutesApp = () => {
	return (
		<section>
			<NavBar />
			<Routes>
				<Route path='/find' element={<FindCity />}></Route>
				<Route path='/history' element={<WeatherInfo />}></Route>
				<Route path='*' element={<Navigate to={'/find'} />} />
			</Routes>
		</section>
	);
};
