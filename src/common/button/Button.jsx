import PropTypes from 'prop-types';
import './button.css';

const fnAssignDefault = () => {};

export const Button = ({
	children,
	classNameBtn = '',
	fn = fnAssignDefault,
	fontSize = 24,
	isDisable = false,
	objPass = {},
	styleComponent,
	typeBtn = 'button',
}) => {
	const fontSizeCheck =
		Math.trunc(fontSize / 8) * 8 > 72
			? 72
			: Math.trunc(fontSize / 8) * 8 < 8
				? 8
				: fontSize;

	const buttonClass = {};
	buttonClass.fontSize = fontSizeCheck - 8; // Le restamos 8 para que sea acorde con el texto;

	if (typeof styleComponent !== 'undefined') {
		const { border, backgroundColor, color, height, lineHeight, width } =
			styleComponent;

		if (typeof border !== 'undefined') buttonClass.border = border;

		if (typeof backgroundColor !== 'undefined')
			buttonClass.backgroundColor = backgroundColor;

		if (typeof color !== 'undefined') buttonClass.color = color;

		if (typeof height !== 'undefined') buttonClass.height = height;

		if (typeof lineHeight !== 'undefined') buttonClass.lineHeight = lineHeight;

		if (typeof width !== 'undefined') buttonClass.width = width;
	}

	if (typeBtn !== 'button' && typeBtn !== 'reset' && typeBtn !== 'submit') {
		return <></>;
	}

	const onClickButton = ob => {
		fn(ob);
	};

	return (
		<button
			className={`${classNameBtn !== '' ? classNameBtn : null} ${
				isDisable ? 'btnDisabled' : null
			}`}
			onClick={typeBtn === 'button' ? () => onClickButton(objPass) : undefined}
			disabled={isDisable}
			style={buttonClass}
			type={typeBtn}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	classNameBtn: PropTypes.string,
	fn: PropTypes.func,
	fontSize: PropTypes.number,
	isDisable: PropTypes.bool,
	objPass: PropTypes.object,
	styleComponent: PropTypes.object,
	typeBtn: PropTypes.string,
};
