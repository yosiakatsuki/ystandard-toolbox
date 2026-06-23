import { TextControl } from '@wordpress/components';
import classnames from 'classnames';

/**
 * @param props
 * @deprecated
 */
const StretchTextControl = ( props ) => {
	const { className, style, value, onChange, placeholder } = props;
	const inputClassName = classnames(
		'ystdtb-stretch-text-control__input',
		className
	);
	const dummyClassName = classnames(
		'ystdtb-stretch-text-control__dummy',
		className
	);
	const dummyText = value ? value : placeholder;
	return (
		<div className="ystdtb-stretch-text-control">
			<div
				className={ dummyClassName }
				style={ style }
				aria-hidden={ true }
			>
				{ dummyText }
			</div>
			<TextControl
				className={ inputClassName }
				style={ style }
				value={ value }
				onChange={ onChange }
				placeholder={ placeholder }
			/>
		</div>
	);
};

export default StretchTextControl;
