import classnames from 'classnames';
import { getIconSvg } from '@aktk/function/icons';

const SVGIcon = ( { name, className, ...props } ) => {
	if ( ! name ) {
		return '';
	}

	const wrapClasses = classnames( 'ys-icon', className, {
		'sns-icon': -1 !== name.indexOf( 'sns-' ),
	} );

	return (
		<span
			className={ wrapClasses }
			dangerouslySetInnerHTML={ { __html: getIconSvg( name ) } }
			{ ...props }
		/>
	);
};

export default SVGIcon;
