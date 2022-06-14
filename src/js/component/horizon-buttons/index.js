import { Button } from '@wordpress/components';
import classnames from 'classnames';

const HorizonButtons = ( {
	items,
	onChange,
	primary = undefined,
	isFullWidth,
} ) => {
	const classNames = classnames( 'ystdtb__horizon-buttons', {
		'is-full-width': isFullWidth,
	} );
	const handleOnClick = ( item ) => {
		onChange( item );
	};
	return (
		<div className={ classNames }>
			{ items.map( ( item ) => {
				return (
					<Button
						key={ item.name }
						isSecondary={ ! primary || primary !== item.name }
						isPrimary={
							undefined !== primary && primary === item.name
						}
						onClick={ () => {
							handleOnClick( item );
						} }
					>
						<span>{ item.label }</span>
					</Button>
				);
			} ) }
		</div>
	);
};
export default HorizonButtons;
