import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import {
	CONSTVARS,
	HttpGet,
	SaveInLocalStorage,
	GetInLocalStorage,
	Button,
} from '../../common';

import './weather.css';
const { weatherApi, apiKey } = CONSTVARS;

const LocalStorage = (name, props) => {
	const values = GetInLocalStorage(name);
	const savedata = [];
	const { city, city_state, country, lat, lon } = props;

	if (typeof values === 'undefined' || values === null) {
		savedata.push({ city, city_state, country, lat, lon });
		SaveInLocalStorage('weather', savedata);
		return savedata;
	}

	if (
		values?.filter(item => item.lat === lat && item.lon === lon).length === 0
	) {
		values.push({ city, city_state, country, lat, lon });
	}

	if (values.length === 6 || values.length > 6) {
		values.shift();
	}

	SaveInLocalStorage('weather', values);

	return values;
};

export const WeatherInfo = () => {
	const [info, setInfo] = useState({
		city: '',
		city_state: '',
		country: '',
		lon: '',
		lat: '',
	});
	const [currentDay, setCurrentDay] = useState(false);
	const [daily, setDaily] = useState(false);
	const [history, setHistory] = useState(false);
	const location = useLocation();
	const { city, city_state, country, lon, lat } = location.state;

	const callApi = async ({ lat, lon }) => {
		const { data } = await HttpGet(
			`${weatherApi}lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely,hourly,alerts&units=metric&lang=es`,
		);
		return data;
	};

	const chargeInfoStates = ({
		current,
		nextDays,
		city,
		city_state,
		country,
		lon,
		lat,
	}) => {
		setCurrentDay(current);
		setDaily(nextDays);
		setInfo({
			city,
			city_state,
			country,
			lon,
			lat,
		});
	};

	const onClickButton = async items => {
		const itemsInfo = await callApi({ lat: items.lat, lon: items.lon });
		const current = itemsInfo.current;
		const nextDays = itemsInfo.daily;
		chargeInfoStates({
			current,
			nextDays,
			city: items.city,
			city_state: items.city_state,
			country: items.country,
			lon: items.lon,
			lat: items.lat,
		});
	};

	const getDataApiWithSearch = async () => {
		const itemsInfo = await callApi({ lat: lat, lon: lon });
		const current = itemsInfo.current;
		const nextDays = itemsInfo.daily;

		chargeInfoStates({
			current,
			nextDays,
			city,
			city_state,
			country,
			lon,
			lat,
		});

		const btninfo = LocalStorage('weather', {
			city,
			city_state,
			country,
			lon,
			lat,
		});
		setHistory(btninfo);
	};

	const getWeatherCity = async () => {
		if (city !== '') {
			setInfo({
				city,
				city_state,
				country,
				lon,
				lat,
			});
			getDataApiWithSearch();
		} else {
			const values = GetInLocalStorage('weather');
			if (values === null) {
				setInfo({
					city: 'No existe ninguna búsqueda previa',
					city_state: '',
					country: '',
					lon: '',
					lat: '',
				});
			} else {
				setHistory(values);
				onClickButton({
					city: values[0].city,
					city_state: values[0].city_state,
					country: values[0].country,
					lat: values[0].lat,
					lon: values[0].lon,
				});
			}
		}
	};

	useEffect(() => {
		getWeatherCity();
	}, []);

	return (
		<>
			<div className='container_btnhistory'>
				{history ? (
					history.map(item => (
						<Button
							classNameBtn='btnhistory'
							key={uuid()}
							fontSize={20}
							typeBtn='button'
							fn={onClickButton}
							objPass={{
								city: item.city,
								city_state: item.state,
								country: item.country,
								lat: item.lat,
								lon: item.lon,
							}}
						>
							{item.city}, {item.country}
						</Button>
					))
				) : (
					<></>
				)}
			</div>
			<div className='container_weather'>
				<h1>
					{info.city} {info.country}
				</h1>
				{currentDay && daily ? (
					<article className='weather_info'>
						<h3>Actual</h3>
						<div className='container_infop'>
							<img
								src={`https://openweathermap.org/img/wn/${currentDay.weather[0]?.icon}@2x.png`}
								alt={currentDay.weather[0]?.description}
							/>
							<div>
								<p>
									<b>Temp Actual: </b>
									{currentDay.temp} °C
								</p>
								<p>Min: {daily[0]?.temp.min} °C</p>
								<p>Max: {daily[0]?.temp.max} °C</p>
							</div>
						</div>
						<div>
							<p>
								<b>Presión atm: </b> {currentDay.pressure} hPa
							</p>
							<p>
								<b>Húmedad: </b>
								{currentDay.humidity} %
							</p>
							<p>
								<b>Visibilidad:</b>
								{currentDay.visibility} m
							</p>
							<p>
								<b>Viento: </b>
								{currentDay.wind_speed} m/s
								<b> dir: </b>
								{currentDay.wind_deg === 0
									? 'N'
									: currentDay.wind_deg > 0 && currentDay.wind_deg < 90
										? 'NE'
										: currentDay.wind_deg === 90
											? 'E'
											: currentDay.wind_deg > 90 && currentDay.wind_deg < 180
												? 'SE'
												: currentDay.wind_deg === 180
													? 'S'
													: currentDay.wind_deg > 180 &&
														  currentDay.wind_deg < 270
														? 'SO'
														: currentDay.wind_deg === 270
															? 'O'
															: 'NO'}
							</p>
						</div>
					</article>
				) : (
					<></>
				)}
				{daily ? (
					daily?.map(item => {
						const d = new Date(item.dt * 1000);

						return (
							<article className='weather_info' key={uuid()}>
								<h3>
									{d.getDate() +
										'/' +
										(d.getMonth() + 1) +
										'/' +
										d.getFullYear()}
								</h3>
								<div className='container_infop'>
									<img
										src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
										alt={item.weather[0]?.description}
									/>
									<div>
										<p>
											<b>Temp del día: </b>
											{item.temp.day} °C
										</p>
										<p>Min: {item.temp.min} °C</p>
										<p>Max: {item.temp.max} °C</p>
									</div>
								</div>
								<div>
									<p>
										<b>Presión atm: </b> {item.pressure} hPa
									</p>
									<p>
										<b>Húmedad: </b>
										{item.humidity} %
									</p>
									<p>
										<b>Viento: </b>
										{item.wind_speed} m/s
										<b> dir: </b>
										{item.wind_deg === 0
											? 'N'
											: item.wind_deg > 0 && item.wind_deg < 90
												? 'NE'
												: item.wind_deg === 90
													? 'E'
													: item.wind_deg > 90 && item.wind_deg < 180
														? 'SE'
														: item.wind_deg === 180
															? 'S'
															: item.wind_deg > 180 && item.wind_deg < 270
																? 'SO'
																: item.wind_deg === 270
																	? 'O'
																	: 'NO'}
									</p>
								</div>
							</article>
						);
					})
				) : (
					<></>
				)}
			</div>
		</>
	);
};
