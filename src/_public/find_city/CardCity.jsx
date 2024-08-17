import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Button } from '../../common';

export const CardCity = ({ data }) => {
	const navigate = useNavigate();

	const viewWeatherCity = ({ city, city_state, country, lat, lon }) => {
		navigate('../history', { state: { city, city_state, country, lat, lon } });
	};

	return data?.map(item => (
		<Button
			key={uuid()}
			typeBtn='button'
			fn={viewWeatherCity}
			objPass={{
				city: item.name,
				city_state: item.state,
				country: item.country,
				lat: item.lat,
				lon: item.lon,
			}}
		>
			<article>
				<div>
					<p>
						<b>Ciudad:</b> {item.name}
					</p>
					<p>
						<b>País:</b> {item.country}
					</p>
					<p>
						<b>Estado:</b> {item.state}
					</p>
				</div>
				<div>
					<span>TOCAR</span>
				</div>
			</article>
		</Button>
	));
};
