import { ErrorMessage, useField } from 'formik';
import PropTypes from 'prop-types';
import './inputs.css';

export const InputsText = props => {
	const [field] = useField(props);
	const { name = '', value } = field;

	const {
		clasNameInput = '',
		fontSize = 24,
		isRequired,
		textlabel,
		typeHtml = 'text',
		styleComponent,
		readOnly = false,
	} = props;

	const fontSizeCheck =
		Math.trunc(fontSize / 8) * 8 > 72
			? 72
			: Math.trunc(fontSize / 8) * 8 < 8
				? 8
				: fontSize;

	const inputClass = {};
	inputClass.fontSize = fontSizeCheck - 8; // Le restamos 8 para que sea acorde con el texto

	if (typeof styleComponent !== 'undefined') {
		const {
			border,
			backgroundColor,
			color,
			height,
			lineHeight,

			width,
		} = styleComponent;

		if (typeof border !== 'undefined') inputClass.border = border;

		if (typeof backgroundColor !== 'undefined')
			inputClass.backgroundColor = backgroundColor;

		if (typeof color !== 'undefined') inputClass.color = color;

		if (typeof height !== 'undefined') inputClass.height = height;

		if (typeof lineHeight !== 'undefined') inputClass.lineHeight = lineHeight;

		if (typeof width !== 'undefined') inputClass.width = width;
	}

	return (
		<div
			className={`container-input ${
				clasNameInput !== '' ? clasNameInput : null
			}`}
		>
			<input
				placeholder={textlabel}
				required={isRequired}
				style={inputClass}
				type={typeHtml}
				id={name}
				name={name}
				readOnly={readOnly}
				{...field}
			/>
			<label htmlFor={name}>{textlabel}</label>

			<ErrorMessage name={name} component='span' />
		</div>
	);
};

InputsText.propTypes = {
	classNameInputs: PropTypes.string,
	fontSize: PropTypes.number,
	name: PropTypes.string.isRequired,
	textlabel: PropTypes.string.isRequired,
};
