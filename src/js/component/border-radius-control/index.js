import UnitControl from '@ystd/components/unit-control';
import { getComponentConfig } from '@ystd/helper/config';

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
