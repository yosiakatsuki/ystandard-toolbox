import { Button } from '@wordpress/components';

const HorizonButtons = ( { items, onChange, primary = undefined } ) => {
	const handleOnClick = ( item ) => {
		onChange( item );
	};
	return (
		<div className="ystdtb__horizon-buttons">
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
