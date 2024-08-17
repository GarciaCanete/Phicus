import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { findSchema } from './findSchema';
import { CardCity } from './CardCity';
import { Button, CONSTVARS, HttpGet, InputsText } from '../../common';
import './style.css';

const startValuesForm = {
	city_name: '',
};
const { geoApi, apiKey } = CONSTVARS;

export const FindCity = () => {
	const navigate = useNavigate();
	const [dataGeo, setDataGeo] = useState([]);

	const onSubmitClick = async values => {
		const city = values.city_name;
		const { data } = await HttpGet(`${geoApi}${city}&limit=10&appid=${apiKey}`);
		if (data?.length === 1) {
			navigate('../history', {
				state: {
					city: data[0].city,
					city_state: data[0].state,
					country: data[0].country,
					lat: data[0].lat,
					lon: data[0].lon,
				},
			});
		}
		setDataGeo(data);
	};

	return (
		<>
			<div className='form_container'>
				<Formik
					initialValues={startValuesForm}
					onSubmit={values => {
						onSubmitClick(values);
					}}
					validationSchema={findSchema}
				>
					{() => (
						<Form className='formEvent'>
							<h3>BUSCAR CIUDAD</h3>
							<div>
								<InputsText
									fontSize={22}
									name='city_name'
									textlabel='Ciudad'
									typeHtml='text'
								/>
								<div className='divbuttonsForm'>
									<Button classNameBtn='btnSuccess' typeBtn='submit'>
										Buscar
									</Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			<div className='container-card'>
				<CardCity data={dataGeo} />
			</div>
		</>
	);
};
