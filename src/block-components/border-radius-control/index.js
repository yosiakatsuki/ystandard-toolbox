import UnitControl from '@aktk/components/unit-control';
import { getComponentConfig } from '@aktk/helper/config';

const BorderRadiusControl = ( { label, value, onChange, units } ) => {
	const _units = units ?? getComponentConfig( 'borderRadiusUnits' );
	return (
		<UnitControl
			label={ label }
			value={ value }
			onChange={ onChange }
			units={ _units }
		/>
	);
};
export default BorderRadiusControl;
