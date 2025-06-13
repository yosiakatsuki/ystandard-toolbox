import { Button } from '@wordpress/components';
import classnames from 'classnames';
import './_edit.scss';

/**
 * @deprecated use aktk-block-components/components/buttons/horizon-buttons instead
 */
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
				const itemValue = item?.value ?? item.name;
				return (
					<Button
						key={ item.name }
						isSecondary={ ! primary || primary !== itemValue }
						isPrimary={
							undefined !== primary && primary === itemValue
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
