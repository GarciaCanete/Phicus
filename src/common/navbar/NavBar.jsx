import { Link } from 'react-router-dom';
import './navbar.css';

export const NavBar = () => {
	return (
		<nav className='navbar'>
			<Link to={'/find'}>Buscar</Link>
			<Link
				to={'/history'}
				state={{ city: '', city_state: '', country: '', lon: '', lat: '' }}
			>
				Historial
			</Link>
		</nav>
	);
};
