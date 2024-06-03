import classnames from 'classnames';
import { Button } from '@wordpress/components';
import './_index.scss';

const ButtonImage = ( { onClick, imageUrl, alt, isPrimary, ...props } ) => {
	const buttonProps = {
		className: classnames( 'aktk-button-image' ),
		onClick,
		isPrimary,
		...props,
	};
	return (
		<Button { ...buttonProps }>
			<img src={ imageUrl } alt={ alt } />
		</Button>
	);
};
export default ButtonImage;
