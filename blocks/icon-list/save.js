import classnames from 'classnames';
import {
	RichText,
	useBlockProps,
	getColorClassName,
} from '@wordpress/block-editor';
import { blockClassName } from './config';

export default function save( { attributes } ) {
	const {
		values,
		iconType,
		customIconClass,
		iconBold,
		iconColor,
		customIconColor,
	} = attributes;

	const iconColorClass = getColorClassName( 'icon-font-color', iconColor );

	const listClassName = classnames( blockClassName, `icon--${ iconType }`, {
		'is-bold': iconBold,
		[ iconColorClass ]: iconColorClass,
		[ customIconClass ]: customIconClass,
		'has-icon-font-color': iconColor || customIconColor,
	} );

	const listStyle = {
		'--icon-font-color': iconColorClass ? undefined : customIconColor,
	};

	return (
		<ul
			{ ...useBlockProps.save( {
				className: listClassName,
				style: listStyle,
			} ) }
		>
			<RichText.Content value={ values } multiline="li" />
		</ul>
	);
}
