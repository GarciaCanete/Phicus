import * as Yup from 'yup';

export const findSchema = Yup.object().shape({
	city_name: Yup.string()
		.required('El nombre de la ciudad es requerido')
		.min(5, 'El nombre de la ciudad debe tener un mínimo de 5 letras')
		.max(50, 'El nombre de la ciudad debe tener un máximo de 50 letras'),
});
